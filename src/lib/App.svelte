<script lang="ts">
  import Header from "./Header.svelte";
  import Wx from "./Wx.svelte";
  import { onMount } from "svelte";

  let selected_city_group = "None";
  let wxdata: any;
  let showgraph: boolean = false;

  const city_groups: string[] = ["Capitals", "US", "France"];
  type City = { city: string; country: string };
  const paris: City = { city: "Paris", country: "FR" };
  const newyork: City = { city: "New York", country: "US" };
  const group_to_cities = new Map([
    ["Capitals", [paris]],
    ["US", [newyork]],
    ["France", [paris]],
  ]);

  function group_to_city_list(city_group: string): City[] {
    console.log("g2clist called with:", city_group, selected_cities);
    if (city_group === "None") {
      city_group = "Capitals";
    }
    const city_list = group_to_cities.get(city_group);
    return city_list || [paris];
  }
  $: selected_cities = group_to_city_list(selected_city_group);

  async function selChange(selected_cities: City[]) {
    let first_city = city_list_to_first_city(selected_cities);
    let data = await getCityData(first_city);
    console.log("onmount", first_city, data);
    console.log("showgraph", showgraph);
    return data;
  }

  onMount(async () => {
    wxdata = await selChange(selected_cities);
    showgraph = true;
  });

  function city_list_to_first_city(city_list: City[]): any {
    console.log("WX first", city_list);
    if (city_list.length) {
      return city_list[0];
    } else {
      return { city: "None", country: "None" };
    }
  }

  async function getCityData(city: City) {
    const parms = new URLSearchParams(city).toString();
    console.log("parms", parms);
    const response = await fetch(`/.netlify/functions/wxconn?${parms}`, {
      headers: { "Content-Type": "application/json" },
    });
    let data = await response.json();
    return data;
  }

  async function resetCityData() {
    console.log("resetting city data", selected_city);
    wxdata = await getCityData(selected_city);
  }

  $: selected_city = city_list_to_first_city(selected_cities);

  function onCityChange(node: any, selected_city: any) {
    return {
      update(selected_city: any) {
        resetCityData();
      },
    };
  }
</script>

<div use:onCityChange={selected_city} class="wrapper">
  <Header bind:selected_city_group {city_groups} />
  <div class="graphs">
    {#if showgraph}
      {#key wxdata}
        <Wx {wxdata} />
      {/key}
    {/if}
    <hr class="rule" />
  </div>
</div>

<style>
  .wrapper {
    display: grid;
    margin: 0 auto;
    padding: 2px;
    border: 2px solid blue;
    border-radius: 10px;
    height: 98svh;
    background-color: rgb(220, 225, 230);
    grid-template-columns: 1fr;
    /* grid-template-rows: 1fr 8fr; */
    gap: 0.3em;
    grid-template-areas:
      "hdr"
      "wxcontent";
  }

  .graphs {
    grid-area: "wxcontent";
    overflow-y: scroll;
  }

  .rule {
    width: 50%;
    height: 2px;
    color: gray;
  }
</style>
