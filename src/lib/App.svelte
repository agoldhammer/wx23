<script lang="ts">
  import Header from "./Header.svelte";
  import Wx from "./Wx.svelte";
  import Local from "./Local.svelte";
  import Spinner from "./Spinner.svelte";
  import { onMount } from "svelte";
  // @ts-ignore
  import type { City } from "./Cities";
  // @ts-ignore
  import { city_groups, group_to_city_list } from "./Cities";

  let selected_city_group = "";
  let groupdata: any[] = [];
  let showgraph: boolean = false;
  let local_promise: Promise<any>;
  let time: Date;

  $: selected_cities = group_to_city_list(selected_city_group);

  onMount(async () => {
    groupdata = [];
    showgraph = false;
    time = new Date();
    const response = await fetch("/.netlify/functions/local", {
      headers: { "Content-Type": "application/json" },
    });
    local_promise = response.json();
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
  <div class="wxheader">
    <Header bind:selected_city_group {city_groups} />
  </div>
  <div class="graphs">
    {#if !showgraph}
      {#await local_promise}
        <Spinner />
        <!-- <p>waiting ....</p> -->
      {:then local_wx_data}
        <Local {local_wx_data} />
      {:catch error}
        <p>{error.message}</p>
      {/await}
    {:else if groupdata.length !== 0}
      <!-- {#key groupdata} -->
      {#each groupdata as wxdata}
        <div class="wx-inner">
          <Wx {wxdata} />
          <hr class="rule" />
        </div>
      {/each}
      <!-- {/key} -->
    {:else}
      <Spinner />
    {/if}
  </div>
  <div class="footer">
    {#if !showgraph}
      <span>{time}</span>
    {:else}
      <span>
        {time.toISOString()}
      </span>
    {/if}
  </div>
</div>

<style>
  .wrapper {
    margin-right: 0px;
    margin-left: 0px;
    display: grid;
    height: 98svh;
    width: 96svw;
    padding: 2px;
    border: 2px solid blue;
    border-radius: 10px;
    background-color: white;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 18fr 1fr;
    gap: 0.3em;
    overflow-y: hidden;
    grid-template-areas:
      "hdr"
      "wxcontent"
      "footer";
  }

  .wxheader {
    width: 95%;
    background-color: linen;
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-basis: auto;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    justify-content: space-evenly;
    border: 2px solid gray;
    border-radius: 10px;
    grid-area: hdr;
  }

  .graphs {
    margin-left: 1em;
    border: red;
    grid-area: wxcontent;
    overflow-y: auto;
  }

  .rule {
    width: 90%;
    height: 2px;
    color: gray;
  }

  .footer {
    /* width: 98%; */
    /* margin-left: 1em; */
    display: flex;
    align-items: center;
    color: white;
    font-size: xx-small;
    background-image: linear-gradient(to right, sienna, goldenrod);
    grid-area: footer;
  }

  .footer span {
    margin: 6px;
    padding: 5px;
  }
</style>
