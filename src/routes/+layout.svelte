<script lang="ts">
  import Header from "$lib/Header.svelte";
  //   // @ts-ignore
  //   import type { City } from "./Cities";
  //   // @ts-ignore
  //   import { city_groups, group_to_city_list } from "./Cities";
</script>

<!-- <Header /> -->
<div class="wxheader">
  <Header />
</div>
<!-- The if is needed to suppress spurious warning -->
{#if true}
  <slot />
{/if}

<style>
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
</style>
