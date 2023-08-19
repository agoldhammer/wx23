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

// GB cities
const london: City = {city: "London", country: "GB"};
const birmingham: City = {city: "Birmingham", country: "GB"};
const manchester: City = {city: "Manchester", country: "GB"};



export const city_groups: string[] = ["Capitals", "US", "Austria", "France",
    "England", "Germany", "Ireland", "Italy", "Netherlands", "Poland", "Portugal", "Spain"];

export const group_to_cities = new Map([
    ["Capitals", [wash, paris]],
    ["US", [newyork, wash]],
    ["France", [paris, marseille, lyon, bordeaux,
        lille, strasbourg]],
]);

