export const ssr = false;
let response: any;
let geodata: any;

export const load = async function ({ fetch }) {
  try {
    response = await fetch('/.netlify/functions/wxconn',
      { headers: { "Content-Type": "application/json" } })
    geodata = await response.json()
  } catch (e) {
    console.log("load error:", e);
  }
  // console.log("page.ts", geodata)
  return geodata;
}


