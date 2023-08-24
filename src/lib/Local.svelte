<script lang="ts">
  import Metar from "./Metar.svelte";
  export let local_wx_data: any;
  const icaos = ["KBOS", "KBED", "KOWD", "KORH", "KMHT"];
</script>

<!-- <div class="opener"> -->
<div id="locdata" class="locwxctr">
  {#if local_wx_data}
    <div class="wx">
      <p>Cambridge, MA</p>
      <p>Temp: {local_wx_data.main.temp}</p>
      <p>Feels like: {local_wx_data.main.feels_like}</p>
      <p>Min temp: {local_wx_data.main.temp_min}</p>
      <p>Max temp: {local_wx_data.main.temp_max}</p>
      <p>Pressure: {local_wx_data.main.pressure}</p>
      <p>Wind: {local_wx_data.wind.speed} Dir: {local_wx_data.wind.deg}</p>
      {#if local_wx_data.wind.gust}
        <p>Gust: {local_wx_data.wind.gust}</p>
      {/if}
      <p>Visibility: {local_wx_data.visibility}</p>
      <p>Weather: {local_wx_data.weather[0].description}</p>
    </div>
  {/if}
  <div class="metar">
    {#each icaos as icao}
      <Metar {icao} />
    {/each}
  </div>
</div>

<!-- </div> -->

<style>
  .locwxctr {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
      "wx metar"
      "wx metar"
      "wx metar";
    column-gap: 3em;
    background-image: linear-gradient(to right, sienna, goldenrod);
    border: 4px solid darkgray;
    border-radius: 10px;
    color: white;
    /* text-align: left; */
    margin: 0px;
    padding: 20px;
  }

  .wx {
    grid-area: wx;
    padding: 5px;
    display: flex;
    align-self: stretch;
    flex-direction: column;
  }

  .metar {
    grid-area: metar;
    display: flex;
    flex-direction: column;
    margin: 4px;
    align-self: stretch;
    padding: 20px;
  }
</style>
