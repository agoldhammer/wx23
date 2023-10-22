<script lang="ts">
  import { city_groups } from "./Cities";
  import { goto } from "$app/navigation";
  // let selected_city_group;

  function process(event: any): void {
    let selected_city_group = event.target.id;
    const path = `/${selected_city_group}`;
    // console.log("process", path);
    goto(path, {
      invalidateAll: true,
      replaceState: true,
    });
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
