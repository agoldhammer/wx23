<script lang="ts">
  export let selected_city_group; // this is passed to parent App
  export let city_groups: string[]; // def received from parent App

  function process(event: any): void {
    selected_city_group = event.target.id;
    // let city = group_to_cities.get(event.target.id) as City;
    // console.log(city);
    // getCityData(city);
  }
</script>

<div class="wxheader">
  {#each city_groups as city_group}
    <button id={city_group} on:click={process}>{city_group}</button>
  {/each}
</div>

<style>
  .wxheader {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    border: 2px solid red;
  }

  button:first-of-type {
    margin-left: 8px;
  }
</style>
