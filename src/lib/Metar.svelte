<script lang="ts">
  import { onMount } from "svelte";

  export let icao: string;
  const parms = new URLSearchParams(icao);
  $: metar_decoded = "";

  onMount(async () => {
    let metar = await fetch(`/.netlify/functions/metar?icao=${icao}`, {
      headers: { "Content-Type": "application/json" },
    });
    const metarx: any = await metar.json();
    // console.log(metarx);
    if (metarx.length === 0) {
      metar_decoded = `${icao} Metar N/A`;
    } else {
      //   console.log("metarx", icao, metarx[0].rawOb);
      metar_decoded = metarx;
    }
  });
</script>

<div class="metard">
  {metar_decoded}
</div>

<style>
  .metard {
    background-color: rgb(0, 0, 0, 0.5);
    margin-bottom: 15px;
    font-size: 0.9em;
  }
</style>
