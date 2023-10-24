// import { error } from "@sveltejs/kit";
import { appid } from "$env/static/private";
// import type { City } from "$lib/Cities";
import { group_to_city_list } from "$lib/Cities";

export async function load({ params }) {
  let group = params.group;
  /* ! Fetch forecasts and current weather for each citystate in group */
  // console.log("server", group);
  const city_list = group_to_city_list(group);
  const geodata_raw = city_list.map((item) =>
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${item.city}%2C${item.country}&limit=1&appid=${appid}`
    ).then((resp) => resp.json().then((item) => item[0]))
  );
  const geodata = await Promise.all(geodata_raw);
  const coords = geodata.map((item) => [item.lat, item.lon]);
  //   console.log(coords);
  /* ! for each pair of city coords, fetch weather data */
  //
  const wxdata_raw: any[] = coords.map((coord) =>
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coord[0]}&lon=${coord[1]}&appid=${appid}&units=imperial`
    ).then((resp) => resp.json())
  );

  const wxdata_group = await Promise.all(wxdata_raw);

  /* ! need current weather for each city */
  let current_wxs_promises = coords.map((coord) =>
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coord[0]}&lon=${coord[1]}&appid=${appid}&units=imperial`,
      { method: "GET" }
    ).then((resp) => resp.json())
  );
  const current_wxs = await Promise.all(current_wxs_promises);
  // console.log("currents", current_wxs);

  for (let i = 0; i < city_list.length; i++) {
    wxdata_group[i].citystate = city_list[i];
    wxdata_group[i].current = current_wxs[i];
  }

  // console.log("svr augmented", wxdata_group);

  return {
    statusCode: 200,
    body: JSON.stringify({ wxdata_group: wxdata_group }),
  };
}
