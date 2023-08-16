<script lang="ts">
  let city_groups = ["Capitals", "US", "France"];
</script>

<div class="wxheader">
  {#each city_groups as city_group}
    <button>{city_group}</button>
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
