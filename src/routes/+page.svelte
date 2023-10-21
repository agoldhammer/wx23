<script lang="ts">
  // export let data;
  // console.log("page", data);
  import App from "$lib/App.svelte";
  import Metar from "$lib/Metar.svelte";
  export let data;
  console.log(data);
  const body = JSON.parse(data.body);
  console.log(body.metars);
  let metars = body.metars;
  const local_wx_data = body.local_wx_data;
  console.log(local_wx_data);
</script>

<svelte:head>
  <title>Cosmic Weather App</title>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="site.webmanifest" />
</svelte:head>

<!-- <App /> -->
<!-- <Metar > -->
<div id="locdata" class="locwxctr">
  <div class="wx">
    <h3>Cambridge, MA</h3>
    <span>Temp: {local_wx_data.main.temp}</span>
    <span>Feels like: {local_wx_data.main.feels_like}</span>
    <span
      >Temp range: {local_wx_data.main.temp_min}-{local_wx_data.main
        .temp_max}</span
    >
    <span>Pressure: {local_wx_data.main.pressure}</span>
    <span>Humidity: {local_wx_data.main.humidity}</span>
    <span>Wind: {local_wx_data.wind.deg}° @ {local_wx_data.wind.speed} mph</span
    >
    {#if local_wx_data.wind.gust}
      <span>Gust: {local_wx_data.wind.gust}</span>
    {/if}
    <span>Visibility: {local_wx_data.visibility}</span>
    <span>Weather: {local_wx_data.weather[0].description}</span>
  </div>
  <div class="metar">
    <h3>METARS</h3>
    {#each metars as metar}
      <Metar {metar} />
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
