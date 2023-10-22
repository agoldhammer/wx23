<script lang="ts">
  type WxNums = number[];
  import Wx from "$lib/Wx.svelte";
  export let data;
  // console.log("data", data);
  $: wx = JSON.parse(data.body);
  $: wxdata_group = wx.wxdata_group;
  // console.log("wx!!!!", wxdata_group);

  function massage_wxdata(unmassaged_data: any) {
    // console.log("massage", unmassaged_data);
    // convert raw city data into desired format
    const city = unmassaged_data.citystate.city;
    const country = unmassaged_data.citystate.country;
    const current = unmassaged_data.current;
    let times: WxNums = [];
    let temps: WxNums = [];
    // let mintemps: WxNums = [];
    // let maxtemps: WxNums = [];
    let pressures: WxNums = [];
    // let humidities: WxNums = [];
    // let winds: WxNums = [];
    // let clouds: WxNums = [];
    // let visibilities: WxNums = [];
    let times_text: string[] = [];

    const wxdata_massaged = unmassaged_data.list.forEach((x: any) => {
      //   console.log("x", x);
      times.push(x.dt);
      temps.push(x.main.temp);
      // mintemps.push(x.main.temp_min);
      // maxtemps.push(x.main.temp_max);
      pressures.push(x.main.pressure);
      // humidities.push(x.main.humidity);
      // winds.push(x.wind);
      // clouds.push(x.clouds);
      // visibilities.push(x.visibility);
      times_text.push(x.dt_txt);
    });

    const wxret = {
      city: city,
      country: country,
      current: current,
      times: times,
      temps: temps,
      pressures: pressures,
      // humidities: humidities,
      // mintemps: mintemps,
      // maxtemps: maxtemps,
      // winds: winds,
      // clouds: clouds,
      // visibilities: visibilities,
      times_text: times_text,
    };
    // console.log("wxret", wxret);
    return wxret;
  }

  $: massaged_wxdata_group = wxdata_group.map((x: any) => massage_wxdata(x));

  // console.log("massaging", massaged_wxdata_group);
  //   console.log("wxdata_group", wxdata_group);
</script>

<div class="grp_wx">
  {#each massaged_wxdata_group as wxdata}
    <Wx {wxdata} />
  {/each}
</div>
