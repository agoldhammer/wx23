<script lang="ts">
  import { onMount } from "svelte";

  export let citydata: any = null;
  const name = citydata.name;
  const weather = citydata.weather[0].description;
  const temp = citydata.main.temp;

  // onMount(async () => {
  //   const parms = new URLSearchParams({
  //     city: city,
  //     country: country,
  //   }).toString();
  //   const response = await fetch(`/.netlify/functions/local?${parms}`, {
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   citydata = await response.json();
  // });
</script>

<div class="graph-footer">
  <span>Wx in {citydata.name}: {weather} Temp: {temp}</span>
  <span>Press: {citydata.main.pressure}</span>
  <span>Hum: {citydata.main.humidity}</span>
  <span>Wind: {citydata.wind.deg}@{citydata.wind.speed}</span>
</div>

<style>
  .graph-footer {
    margin-top: 2px;
    color: white;
    width: inherit;
    /* margin-left: 8px; */
    /* margin-right: 8px; */
    padding-left: 8px;
    padding-top: 2px;
    padding-bottom: 2px;
    background-image: linear-gradient(to right, sienna, goldenrod);
    border: 1px solid black;
    border-radius: 10px;
    font-size: small;
  }
</style>
