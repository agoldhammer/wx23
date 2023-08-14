
import { appid } from '$env/static/private'
let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Berlin%2CDE&limit=1&appid=${appid}`, { 
  method: "GET",
});

let geodata_list = await response.json();
let geodata = geodata_list[0]
let {name, country, lat, lon} = geodata;



// console.dir("geodata", geodata);
console.log("load", name, country, lat, lon)

export function load() {
    return geodata;
}
