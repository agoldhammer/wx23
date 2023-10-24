export type City = { city: string; country: string };

// French cities
const paris: City = { city: "Paris", country: "FR" };
const marseille: City = { city: "Marseille", country: "FR" };
const lyon: City = { city: "Lyon", country: "FR" };
const bordeaux: City = { city: "Bordeaux", country: "FR" };
const lille: City = { city: "Lille", country: "FR" };
const strasbourg: City = { city: "Strasbourg", country: "FR" };

// US cities
const wash: City = { city: "Washington", country: "US" };
const newyork: City = { city: "New York", country: "US" };
const bost: City = { city: "Boston", country: "US" };
const la: City = { city: "Los Angeles", country: "US" };
const miami: City = { city: "Miami", country: "US" };
const chi: City = { city: "Chicago", country: "US" };
const dallas: City = { city: "Dallas", country: "US" };

// GB cities
const london: City = { city: "London", country: "GB" };
const birmingham: City = { city: "Birmingham", country: "GB" };
const manchester: City = { city: "Manchester", country: "GB" };
const edin: City = { city: "Edinburgh", country: "GB" };

// German cities
const berlin: City = { city: "Berlin", country: "DE" };
const duss: City = { city: "Düsseldorf", country: "DE" };
const koln: City = { city: "Köln", country: "DE" };
const bonn: City = { city: "Bonn", country: "DE" };
const frank: City = { city: "Frankfurt", country: "DE" };
const hamb: City = { city: "Hamburg", country: "DE" };

// Italian cities
const rome: City = { city: "Rome", country: "IT" };
const milan: City = { city: "Milan", country: "IT" };
const naples: City = { city: "Naples", country: "IT" };
const flo: City = { city: "Florence", country: "IT" };
const pal: City = { city: "Palermo", country: "IT" };
const siena: City = { city: "Siena", country: "IT" };
const venice: City = { city: "Venice", country: "IT" };

// Swiss cities
const geneva: City = { city: "Geneva", country: "CH" };
const zurich: City = { city: "Zurich", country: "CH" };
const bern: City = { city: "Bern", country: "CH" };

// Austrian cities
const vienna: City = { city: "Vienna", country: "AT" };
const inns: City = { city: "Innsbruck", country: "AT" };
const salz: City = { city: "Salzburg", country: "AT" };

// Spanish cities
const madrid: City = { city: "Madrid", country: "ES" };
const barcel: City = { city: "Barcelona", country: "ES" };

// Portugal
const lisbon: City = { city: "Lisbon", country: "PT" };

// Polish cities
const warsaw: City = { city: "Warsaw", country: "PL" };
const danzig: City = { city: "Danzig", country: "PL" };
const krakow: City = { city: "Krakow", country: "PL" };

// Dutch cities
const amst: City = { city: "Amsterdam", country: "NL" };
const rott: City = { city: "Rotterdam", country: "NL" };

// Irish cities
const dublin: City = { city: "Dublin", country: "IE" };
const cork: City = { city: "Cork", country: "IE" };

// Belgium
const bruss: City = { city: "Brussels", country: "BE" };

// Asian cities
const beij: City = { city: "Beijing", country: "CN" };
const tokyo: City = { city: "Tokyo", country: "JP" };
const hanoi: City = { city: "Hanoi", country: "VN" };
const singa: City = { city: "Singapore", country: "SG" };
const mumbai: City = { city: "Mumbai", country: "IN" };
const sydney: City = { city: "Sydney", country: "AU" };

export const city_groups: string[] = [
  "Capitals",
  "US",
  "Austria",
  "Benelux",
  "France",
  "Germany",
  "Iberia",
  "Italy",
  "Poland",
  "UK-IE",
  "Asia",
];

const group_to_cities = new Map([
  ["Capitals", [wash, paris, berlin, rome, bern, vienna, madrid, amst, warsaw]],
  ["US", [newyork, wash, bost, la, miami, chi, dallas]],
  ["France", [paris, marseille, lyon, bordeaux, lille, strasbourg]],
  ["Germany", [berlin, duss, koln, bonn, frank, hamb]],
  ["Italy", [rome, milan, naples, flo, pal, siena, venice]],
  ["Iberia", [madrid, barcel, lisbon]],
  ["UK-IE", [london, manchester, birmingham, edin, dublin, cork]],
  ["Benelux", [bruss, amst]],
  ["Austria", [vienna, inns, salz]],
  ["Switzerland", [geneva, zurich, bern]],
  ["Poland", [warsaw, danzig, krakow]],
  ["Asia", [beij, mumbai, tokyo, sydney, hanoi, singa]],
]);

export function group_to_city_list(city_group: string): City[] {
  const city_list = group_to_cities.get(city_group);

  return city_list ?? [{ city: "n/a", country: "n/a" }];
}
