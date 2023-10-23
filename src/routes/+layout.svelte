<script lang="ts">
  import Header from "$lib/Header.svelte";
  //   // @ts-ignore
  //   import type { City } from "./Cities";
  //   // @ts-ignore
  //   import { city_groups, group_to_city_list } from "./Cities";
  let time: Date = new Date();
</script>

<!-- <Header /> -->
<div class="wrapper">
  <div class="wxheader">
    <Header />
  </div>
  <!-- The if is needed to suppress spurious warning -->
  <div id="graphctr" class="graphs">
    {#if true}
      <slot />
    {/if}
  </div>
  <div class="footer">
    <span>{time}</span>
    <span>Ver. 0.1 beta</span>
  </div>
</div>

<style>
  .wrapper {
    margin-right: 0px;
    margin-left: 0px;
    display: grid;
    height: 98svh;
    width: 98dvw;
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
    width: 96%;
    background-color: linen;
    margin: 2px 16px 2px;
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
    width: 98%;
    margin-left: 1em;
    /* margin-right: 2px; */
    border: red;
    grid-area: wxcontent;
    overflow-y: auto;
  }

  .footer {
    width: 96%;
    margin-left: 1em;
    margin-right: 1em;
    gap: 2em;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    border: 1px solid black;
    border-radius: 10px;
    font-size: small;
    background-image: linear-gradient(to right, sienna, goldenrod);
    grid-area: footer;
  }
</style>
