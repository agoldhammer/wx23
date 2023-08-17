<script lang="ts">
  import Header from "./Header.svelte";
  import Wx from "./Wx.svelte";
  import { onMount } from "svelte";

  let selected_city_group = "None";
  let wxdata: any;

  const city_groups: string[] = ["Capitals", "US", "France"];
  type City = { city: string; country: string };
  const paris: City = { city: "Paris", country: "FR" };
  const newyork: City = { city: "New York", country: "US" };
  const group_to_cities = new Map([
    ["Capitals", [paris]],
    ["US", [newyork]],
    ["France", [paris]],
  ]);

  function group_to_city_list(city_group: string): any {
    if (city_group === "None") {
      city_group = "Capitals";
    }
    const city_list = group_to_cities.get(city_group);
    return city_list;
  }
  $: selected_cities = group_to_city_list(selected_city_group);

  onMount(async () => {
    let first_city = city_list_to_first_city(selected_cities);
    wxdata = await getCityData(first_city);
    console.log("onmount", wxdata);
  });

  // import { Chart as ChartJS } from "chart.js";
  import { Line } from "svelte-chartjs";
  import "chart.js/auto";

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

  $: selected_city = city_list_to_first_city(selected_cities);
</script>

<div class="wrapper">
  <Header bind:selected_city_group {city_groups} />
  <Wx {wxdata} />
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
