<script lang="ts">
  const city_groups = ["Capitals", "US", "France"];
  type City = { city: string; country: string };
  const paris: City = { city: "Paris", country: "FR" };
  const group_to_cities = new Map([["Capitals", paris]]);

  function process(event: any): void {
    console.log("click", event.target.id);
    let city = group_to_cities.get(event.target.id) as City;
    console.log(city);
    getCityData(city);
  }

  async function getCityData(city: City) {
    const parms = new URLSearchParams(city).toString();
    console.log("parms", parms);
    const response = await fetch(`/.netlify/functions/wxconn?${parms}`, {
      headers: { "Content-Type": "application/json" },
    });
    const wxdata = await response.json();
    console.dir(wxdata);
  }
</script>

<div class="wxheader">
  {#each city_groups as city_group}
    <button id={city_group} on:click={process}>{city_group}</button>
  {/each}
</div>

<style>
  .wxheader {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    border: 2px solid red;
  }

  button:first-of-type {
    margin-left: 8px;
  }
</style>
