<script lang="ts">
  import Metar from "./Metar.svelte";
  export let local_wx_data: any;
  const icaos = ["KBOS", "KBED", "KOWD", "KORH", "KMHT"];
</script>

<!-- <div class="opener"> -->
<div id="locdata" class="locwxctr">
  {#if local_wx_data}
    <div class="wx">
      <h3>Cambridge, MA</h3>
      <span>Temp: {local_wx_data.main.temp}</span>
      <span>Feels like: {local_wx_data.main.feels_like}</span>
      <span>Min temp: {local_wx_data.main.temp_min}</span>
      <span>Max temp: {local_wx_data.main.temp_max}</span>
      <span>Pressure: {local_wx_data.main.pressure}</span>
      <span>Wind: {local_wx_data.wind.speed} Dir: {local_wx_data.wind.deg}</span
      >
      {#if local_wx_data.wind.gust}
        <span>Gust: {local_wx_data.wind.gust}</span>
      {/if}
      <span>Visibility: {local_wx_data.visibility}</span>
      <span>Weather: {local_wx_data.weather[0].description}</span>
    </div>
  {/if}
  <div class="metar">
    <h3>METARS</h3>
    {#each icaos as icao}
      <Metar {icao} />
    {/each}
  </div>
</div>

<!-- </div> -->

<style>
  .locwxctr {
    display: grid;
    height: 100%;
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
    margin-right: 20px;
    padding: 20px;
  }

  .wx {
    grid-area: wx;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .metar {
    grid-area: metar;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
</style>
