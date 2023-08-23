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
  let local_promise: Promise<any>;

  $: selected_cities = group_to_city_list(selected_city_group);

  onMount(async () => {
    groupdata = [];
    showgraph = false;
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
        <p>waiting ....</p>
      {:then local_wx_data}
        <Local {local_wx_data} />
      {:catch error}
        <p>{error.message}</p>
      {/await}
    {:else if groupdata.length !== 0}
      {#key groupdata}
        {#each groupdata as wxdata}
          <Wx {wxdata} />
          <hr class="rule" />
        {/each}
      {/key}
    {:else}
      <div>
        <div class="loader">Loading ...</div>
      </div>
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
    height: 100svh;
    min-width: 1200px;
    /* background-color: rgb(220, 225, 230); */
    background-color: white;
    grid-template-columns: 1fr;
    grid-template-rows: 60px 1fr;
    gap: 0.3em;
    grid-template-areas:
      "hdr"
      "wxcontent";
  }

  .wxheader {
    width: 95%;
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
  }

  .graphs {
    border: red;
    grid-area: "wxcontent";
    overflow-y: auto;
  }

  .rule {
    width: 80%;
    height: 2px;
    color: gray;
  }

  .loader {
    color: black;
    font-size: 20px;
    text-indent: -9999em;
    overflow: hidden;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin: 20px auto;
    position: relative;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;
    animation: load6 1.7s infinite ease, round 1.7s infinite ease;
  }
  @-webkit-keyframes load6 {
    0% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
        0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    5%,
    95% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
        0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    10%,
    59% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em,
        -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em,
        -0.297em -0.775em 0 -0.477em;
    }
    20% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
        -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
        -0.749em -0.34em 0 -0.477em;
    }
    38% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
        -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
        -0.82em -0.09em 0 -0.477em;
    }
    100% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
        0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
  }
  @keyframes load6 {
    0% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
        0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    5%,
    95% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
        0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    10%,
    59% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em,
        -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em,
        -0.297em -0.775em 0 -0.477em;
    }
    20% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
        -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
        -0.749em -0.34em 0 -0.477em;
    }
    38% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
        -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
        -0.82em -0.09em 0 -0.477em;
    }
    100% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
        0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
  }
  @-webkit-keyframes round {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes round {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
