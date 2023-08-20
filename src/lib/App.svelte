<script lang="ts">
  import Header from "./Header.svelte";
  import Wx from "./Wx.svelte";
  import { onMount } from "svelte";
  import type { City } from "./Cities";
  import { city_groups, group_to_city_list } from "./Cities";

  let selected_city_group = "Capitals";
  // let wxdata: any;
  let groupdata: any[] = [];
  let showgraph: boolean = false;

  $: selected_cities = group_to_city_list(selected_city_group);

  onMount(async () => {
    // fetchGroupData(selected_cities);
    // selected_city_group = "Capitals";
    // console.log("onmount", selected_city_group, selected_cities);
    fetchGroupData(selected_cities);
    // console.log("onmount2", groupdata);
    showgraph = true;
  });

  //  this should replace getCityData for group fetch
  async function fetchCityData(city: City) {
    const parms = new URLSearchParams(city).toString();
    const response = fetch(`/.netlify/functions/wxconn?${parms}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  }

  function setGroupData(wxvals: any) {
    // console.log("setgroupdata: wxvals", wxvals);
    groupdata = wxvals;
    showgraph = true;
  }

  async function fetchGroupData(city_list: City[]) {
    // console.log("fgd sel cities", city_list);
    const responses = city_list.map(fetchCityData);
    showgraph = false;
    Promise.all(responses)
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((wxvals) => {
        // console.log("fgd", wxvals);
        setGroupData(wxvals);
      });
    // .then((values) => console.log("fetchgroupdata", values));
  }

  async function resetGroupData(selected_cities: City[]) {
    // console.log("rgd sel cities", selected_cities);
    fetchGroupData(selected_cities);
  }

  function onGroupChange(node: any, selected_cities: any) {
    // console.log("ongroupchange", selected_cities);
    return {
      update(selected_cities: any) {
        resetGroupData(selected_cities);
      },
    };
  }
</script>

<div use:onGroupChange={selected_cities} class="wrapper">
  <Header bind:selected_city_group {city_groups} />
  <div class="graphs">
    {#if showgraph}
      {#key groupdata}
        {#each groupdata as wxdata}
          <Wx {wxdata} />
          <hr class="rule" />
        {/each}
      {/key}
    {/if}
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
    width: 100svw;
    /* background-color: rgb(220, 225, 230); */
    background-color: white;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 8fr;
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
