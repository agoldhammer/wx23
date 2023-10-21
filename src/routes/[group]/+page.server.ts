// import { error } from "@sveltejs/kit";
import { appid } from "$env/static/private";
// import type { City } from "$lib/Cities";
import { group_to_city_list } from "$lib/Cities";

export async function load({ params }) {
  let group = params.group;
  const city_list = group_to_city_list(group);
  const geodata_raw = city_list.map((item) =>
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${item.city}%2C${item.country}&limit=1&appid=${appid}`
    ).then((resp) => resp.json().then((item) => item[0]))
  );
  const geodata = await Promise.all(geodata_raw);
  const coords = geodata.map((item) => [item.lat, item.lon]);
  //   console.log(coords);
  // for each pair of city coords, fetch weather data
  //
  const wxdata_raw: any[] = coords.map((coord) =>
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coord[0]}&lon=${coord[1]}&appid=${appid}&units=imperial`
    ).then((resp) => resp.json())
  );

  const wxdata_group = await Promise.all(wxdata_raw);

  return {
    statusCode: 200,
    body: JSON.stringify({ wxdata_group: wxdata_group }),
  };
}
