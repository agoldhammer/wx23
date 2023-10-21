<script lang="ts">
  import Wx from "$lib/Wx.svelte";
  export let data;
  const wx = JSON.parse(data.body);
  const wxdata_group: any[] = wx.wxdata_group;
  console.log("page", wxdata_group);

  function massage_wxdata(unmassaged_data: any) {
    // console.log("massage", unmassaged_data);
    // convert raw city data into desired format
    const city = unmassaged_data.city.name;
    const country = unmassaged_data.city.country;
    let times = [];
    let temps = [];
    let mintemps = [];
    let maxtemps = [];
    let pressures = [];
    let humidities = [];
    let winds = [];
    let clouds = [];
    let visibilities = [];
    let times_text = [];

    const wxdata_massaged = unmassaged_data.list.forEach((x: any) => {
      //   console.log("x", x);
      times.push(x.dt);
      temps.push(x.main.temp);
      mintemps.push(x.main.temp_min);
      maxtemps.push(x.main.temp_max);
      pressures.push(x.main.pressure);
      humidities.push(x.main.humidity);
      winds.push(x.wind);
      clouds.push(x.clouds);
      visibilities.push(x.visibility);
      times_text.push(x.dt_txt);
    });

    const wxret = {
      city: city,
      country: country,
      //   country: country,
      times: times,
      temps: temps,
      pressures: pressures,
      humidities: humidities,
      mintemps: mintemps,
      maxtemps: maxtemps,
      winds: winds,
      clouds: clouds,
      visibilities: visibilities,
      times_text: times_text,
    };
    // console.log("wxret", wxret);
    return wxret;
  }

  const massaged_wxdata_group = wxdata_group.map((x) => massage_wxdata(x));

  //   console.log("massaging", massaged_wxdata_group);
  //   console.log("wxdata_group", wxdata_group);
</script>

<div class="grp_wx">
  {#each massaged_wxdata_group as wxdata}
    <Wx {wxdata} />
  {/each}
</div>
