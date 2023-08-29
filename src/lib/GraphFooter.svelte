<script lang="ts">
  import { onMount } from "svelte";

  export let city: string;
  export let country: string;
  let citydata: any = null;

  onMount(async () => {
    const parms = new URLSearchParams({
      city: city,
      country: country,
    }).toString();
    const response = await fetch(`/.netlify/functions/local?${parms}`, {
      headers: { "Content-Type": "application/json" },
    });
    citydata = await response.json();
  });
</script>

<div class="graph-footer">
  {#key citydata}
    {#if citydata}
      <span
        >Wx in {city}, {country}: {citydata.weather[0].description} Temp: {citydata
          .main.temp}</span
      >
      <span>Press: {citydata.main.pressure}</span>
      <span>Hum: {citydata.main.humidity}</span>
      <span>Wind: {citydata.wind.deg}@{citydata.wind.speed}</span>
    {/if}
  {/key}
</div>

<style>
  .graph-footer {
    margin-top: 2px;
    color: white;
    min-width: 800px;
    margin-left: 8px;
    margin-right: 8px;
    padding-left: 4px;
    background-image: linear-gradient(to right, sienna, goldenrod);
    border: 1px solid black;
    border-radius: 10px;
    font-size: small;
  }
</style>
