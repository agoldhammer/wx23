<script lang="ts">
  import Header from "./Header.svelte";
  import Wx from "./Wx.svelte";
</script>

<div class="wrapper">
  <Header />
  <Wx />
</div>

<style>
  .wrapper {
    display: grid;
    margin: 0 auto;
    padding: 2px;
    border: 2px solid blue;
    border-radius: 10px;
    height: 98svh;
    background-color: lightslategray;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 8fr;
    gap: 0.3em;
    grid-template-areas:
      "hdr"
      "wxcontent";
  }
</style>
