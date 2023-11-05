import { error } from "@sveltejs/kit";
import { appid } from "$env/static/private";

export async function load({ params }) {
  // metars part
  const icaos = ["KBOS", "KBED", "KOWD", "KORH", "KMHT"];
  const encoded_icaos = encodeURIComponent(icaos.join());
  const url = `https://aviationweather.gov/api/data/metar/?ids=${encoded_icaos}`;
  const response = await fetch(url);
  const text = await response.text();
  // must slice off last item in split, which will be blank b/c of trailing newline
  const metars = text.split("\n").slice(0, -1);

  // local weather part
  let city = "Cambridge";
  let country = "US";
  //   let city = event.queryStringParameters.city;
  //   let country = event.queryStringParameters.country;
  // console.log ('local', city, country);
  try {
    let geoapi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}%2C${country}&limit=1&appid=${appid}`;
    let response2 = await fetch(geoapi, { method: "GET" });

    let geodata_list = await response2.json();
    let geodata = geodata_list[0];
    let { lat, lon } = geodata;
    // console.log ('local1', lat, lon);

    let wxapi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=imperial`;

    let local_wx = await fetch(wxapi, { method: "GET" });
    let retval = await local_wx.json();
    // console.log ('local2', retval);
    let body = { metars: metars, local_wx_data: retval };
    //   console.log("body in server", body);
    return {
      statusCode: 200,
      body: JSON.stringify(body),
    };
  } catch (err: any) {
    console.error("Error fetching home page", err);
    throw error(404, `While fetching data for home location: ${err.cause}`);
  }
}
