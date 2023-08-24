<script lang="ts">
  import { onMount } from "svelte";

  export let icao: string;
  const parms = new URLSearchParams(icao);
  $: metar_decoded = "";

  onMount(async () => {
    let metar = await fetch(`/.netlify/functions/metar?icao=${icao}`, {
      headers: { "Content-Type": "application/json" },
    });
    const metarx: any[] = await metar.json();
    if (metarx.length === 0) {
      metar_decoded = `${icao} Metar N/A`;
    } else {
      //   console.log("metarx", icao, metarx[0].rawOb);
      metar_decoded = metarx[0].rawOb;
    }
  });
</script>

<div class="metard">
  <p>{metar_decoded}</p>
</div>

<style>
  .metard p {
    background-color: black;
  }
</style>
