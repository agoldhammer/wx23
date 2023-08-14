<script lang="ts">
  export let data;
  console.log('page', data);
</script>

<p>{data.geodata.name}</p>
<p>{data.geodata.country}</p>
<p>{data.geodata.lat}, {data.geodata.lon}</p>
