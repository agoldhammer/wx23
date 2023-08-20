<script lang="ts">
  export let selected_city_group; // this is passed to parent App
  export let city_groups: string[]; // def received from parent App

  function process(event: any): void {
    selected_city_group = event.target.id;
  }
</script>

<div class="wxheader">
  {#each city_groups as city_group}
    <button id={city_group} on:click={process}>{city_group}</button>
  {/each}
</div>

<style>
  .wxheader {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    /* justify-content: space-between; */
    border: 2px solid gray;
  }

  button {
    margin-top: 4px;
    margin-bottom: 4px;
  }
  button:first-of-type {
    margin-left: 8px;
  }

  button:last-of-type {
    margin-right: 8px;
  }
</style>
