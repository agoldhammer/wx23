<script lang="ts">
  import Header from "./Header.svelte";
  import Wx from "./Wx.svelte";
  import { onMount } from "svelte";
  let parms = new URLSearchParams({
    city: "Paris",
    country: "FR",
  }).toString();
  let response;
  let wxdata;

  onMount(async () => {
    response = await fetch(`/.netlify/functions/wxconn?${parms}`, {
      headers: { "Content-Type": "application/json" },
    });
    wxdata = await response.json();
    console.dir(wxdata);
  });
</script>

<div class="wrapper">
  <Header />
  <Wx />
</div>

<style>
  .wrapper {
    display: grid;
    margin: 0 auto;
    padding: 2px;
    border: 2px solid blue;
    border-radius: 10px;
    height: 98svh;
    background-color: lightslategray;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 8fr;
    gap: 0.3em;
    grid-template-areas:
      "hdr"
      "wxcontent";
  }
</style>
