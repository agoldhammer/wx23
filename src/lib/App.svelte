<script lang="ts">
  import Header from "./Header.svelte";
  import Wx from "./Wx.svelte";
  import Local from "./Local.svelte";
  import { hasContext, onMount } from "svelte";
  // @ts-ignore
  import type { City } from "./Cities";
  // @ts-ignore
  import { city_groups, group_to_city_list } from "./Cities";

  let selected_city_group = "Capitals";
  // let wxdata: any;
  let groupdata: any[] = [];
  let showgraph: boolean = false;

  $: selected_cities = group_to_city_list(selected_city_group);

  onMount(async () => {
    groupdata = [];
    showgraph = false;
  });

  async function fetchCityData(city: City) {
    const parms = new URLSearchParams(city).toString();
    const response = fetch(`/.netlify/functions/wxconn?${parms}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  }

  function setGroupData(wxvals: any) {
    groupdata = wxvals;
    showgraph = true;
  }

  async function fetchGroupData(city_list: City[]) {
    showgraph = true;
    groupdata = [];
    const responses = city_list.map(fetchCityData);
    Promise.all(responses)
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((wxvals) => {
        setGroupData(wxvals);
      });
  }

  async function resetGroupData(selected_cities: City[]) {
    fetchGroupData(selected_cities);
  }

  function onGroupChange(node: any, selected_cities: any) {
    return {
      update(selected_cities: any) {
        resetGroupData(selected_cities);
      },
    };
  }
</script>

<div use:onGroupChange={selected_cities} class="wrapper">
  <Header bind:selected_city_group {city_groups} />
  {#if !showgraph}
    <Local />
  {:else if groupdata.length !== 0}
    <div class="graphs">
      {#key groupdata}
        {#each groupdata as wxdata}
          <Wx {wxdata} />
          <hr class="rule" />
        {/each}
      {/key}
    </div>
  {:else}
    <div>
      <h1>Loading ...</h1>
    </div>
  {/if}
</div>

<style>
  .wrapper {
    display: grid;
    margin: 0 auto;
    padding: 2px;
    border: 2px solid blue;
    border-radius: 10px;
    height: 98lvh;
    min-width: 1200px;
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
    width: 80%;
    height: 2px;
    color: gray;
  }
</style>
