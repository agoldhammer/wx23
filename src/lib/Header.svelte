<script lang="ts">
  import { city_groups } from "./Cities";
  let selected_city_group; // this is passed to parent App
  // export let city_groups: string[]; // def received from parent App

  function process(event: any): void {
    selected_city_group = event.target.id;
  }
</script>

<!-- <div class="wxheader"> -->
{#each city_groups as city_group}
  <button id={city_group} on:click={process}>{city_group}</button>
{/each}

<!-- </div> -->

<style>
  button {
    font-size: x-large;
    margin-top: 4px;
    margin-bottom: 4px;
    border-radius: 10px;
  }
  @media (hover: hover) {
    button:hover {
      background-color: lightgoldenrodyellow;
    }
  }
  button:first-of-type {
    margin-left: 8px;
  }

  button:last-of-type {
    margin-right: 8px;
  }
</style>
