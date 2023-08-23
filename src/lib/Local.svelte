<script lang="ts">
  export let local_wx_data: any;
</script>

<!-- <div class="opener"> -->
<div id="locdata" class="locwxctr">
  <div class="imgctr">
    <img id="logo" src="/images/mit.jpg" alt="MIT 77 Mass. Ave." />
  </div>
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
  <div class="metar">metar</div>
</div>

<!-- </div> -->

<style>
  #logo {
    height: 200px;
    width: 200px;
  }

  .locwxctr {
    display: grid;
    height: 1200px;
    grid-template-columns: 180px repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
      "img wx metar"
      "img wx metar"
      "img wx metar";
    column-gap: 3em;
    background-color: darkslategray;
    color: white;
    text-align: left;
    margin: 10px;
    padding: 20px;
  }

  .imgctr {
    /* background-color: yellow; */
    grid-area: img;
    display: flex;
    align-self: start;
  }

  .wx {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .metar {
    padding: 20px;
  }
</style>
