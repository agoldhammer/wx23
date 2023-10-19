<script lang="ts">
  import { onMount } from "svelte";

  export let metar: string;
</script>

<div class="metard">
  {metar}
</div>

<style>
  .metard {
    background-color: rgb(0, 0, 0, 0.5);
    margin-bottom: 15px;
    font-size: 0.9em;
  }
</style>
