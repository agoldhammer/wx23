export type City = { city: string; country: string };

// French cities
const paris: City = { city: "Paris", country: "FR" };
const marseille: City = {city: "Marseille", country: "FR"};
const lyon: City = {city: "Lyon", country: "FR"};
const bordeaux: City = {city: "Bordeaux", country: "FR"};
const lille: City = {city: "Lille", country: "FR"};
const strasbourg: City = {city: "Strasbourg", country: "FR"};

// US cities
const wash: City = {city: "Washington", country: "US"};
const newyork: City = { city: "New York", country: "US" };
const bost: City = {city: "Boston", country: "US"};

// GB cities
const london: City = {city: "London", country: "GB"};
const birmingham: City = {city: "Birmingham", country: "GB"};
const manchester: City = {city: "Manchester", country: "GB"};

// German cities
const berlin: City = {city: "Berlin", country: "DE"};
const duss: City = {city: "Düsseldorf", country: "DE"};
const koln: City = {city: "Köln", country: "DE"};
const bonn: City = {city: "Bonn", country: "DE"};
const frank: City = {city: "Frankfurt", country: "DE"};
const hamb: City = {city: "Hamburg", country: "DE"};

// Italian cities
const rome: City = {city: "Rome", country: "IT"};
const milan: City = {city: "Milan", country: "IT"};
const naples: City = {city: "Naples", country: "IT"};
const flo: City = {city: "Florence", country: "IT"};
const pal: City = {city: "Palermo", country: "IT"};
const siena: City = {city: "Siena", country: "IT"};
const venice: City = {city: "Venice", country: "IT"};

// Swiss cities
const geneva: City = {city: "Geneva", country: "CH"};
const zurich: City = {city: "Zurich", country: "CH"};
const bern: City = {city: "Bern", country: "CH"};

// Austrian cities
const vienna: City = {city: "Vienna", country: "AT"};
const inns: City = {city: "Innsbruck", country: "AT"};
const salz: City = {city: "Salzburg", country: "AT"};

// Spanish cities
const madrid: City = {city: "Madrid", country: "ES"};
const barcel: City = {city: "Barcelona", country: "ES"};

// Portugal
const lisbon: City = {city: "Lisbon", country: "PT"};

// Polish cities
const warsaw: City = {city: "Warsaw", country: "PL"};
const danzig: City = {city: "Danzig", country: "PL"};
const krakow: City = {city: "Krakow", country: "PL"};

// Dutch cities
const amst: City = {city: "Amsterdam", country: "NL"};
const rott: City = {city: "Rotterdam", country: "NL"};

// Irish cities
const dublin: City = {city: "Dublin", country: "IE"};
const cork: City = {city: "Cork", country: "IE"};

// Belgium
const bruss: City = {city: "Brussels", country: "BE"};

export const city_groups: string[] = ["Capitals", "US", "Austria", "Belgium", "England", "France",
    "Germany", "Ireland", "Italy", "Netherlands", "Poland", "Portugal", "Spain"];

const group_to_cities = new Map([
    ["Capitals", [wash, paris, berlin, rome, bern, vienna, madrid, amst, warsaw]],
    ["US", [newyork, wash, bost]],
    ["France", [paris, marseille, lyon, bordeaux,
        lille, strasbourg]],
    ["Germany", [berlin, duss, koln, bonn, frank, hamb]],
    ["Italy", [rome, milan, naples, flo, pal, siena, venice]],
    ["Switzerland", [geneva, zurich, bern]],
    ["Spain", [madrid, barcel]],
    ["Austria", [vienna, inns, salz]],
    ["Portugal", [lisbon]],
    ["Poland", [warsaw, danzig, krakow]],
    ["Netherlands", [amst, rott]],
    ["England", [london, manchester, birmingham]],
    ["Ireland", [dublin, cork]],
    ["Belgium", [bruss]]

]);

// const group_to_cities = new Map([["Capitals", [barcel, dublin]]]);

export function group_to_city_list(city_group: string): City[] {
    if (city_group === "None") {
      city_group = "Capitals";
    }
    // console.log("group to city list", city_group)
    const city_list = group_to_cities.get(city_group);
    // console.log("g2cl get", city_list);
    if (city_list === undefined) {
        throw new Error("bad city_group param");
    }
    return city_list;
  }

