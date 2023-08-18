const appid = process.env.appid;

exports.handler = async event => {
  let city = event.queryStringParameters.city;
  let country = event.queryStringParameters.country;
  // console.log ('citycoun', city, country);

  let response = await fetch (
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}%2C${country}&limit=1&appid=${appid}`,
    {
      method: 'GET',
    }
  );

  let geodata_list = await response.json ();
  let geodata = geodata_list[0];
  let {lat, lon} = geodata;

  let wxapi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}&units=imperial`;
  // console.log ('wxapi', wxapi);
  let wxresponse = await fetch (wxapi, {method: 'GET'});
  wxval = await wxresponse.json ();

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

  let wxdata = wxval.list;
  wxdata.forEach (x => {
    times.push (x.dt);
    temps.push (x.main.temp);
    mintemps.push (x.main.temp_min);
    maxtemps.push (x.main.temp_max);
    pressures.push (x.main.pressure);
    humidities.push (x.main.humidity);
    winds.push (x.wind);
    clouds.push (x.clouds);
    visibilities.push (x.visibility);
    times_text.push (x.dt_txt);
  });

  wxret = {
    city: city,
    country: country,
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

  return {
    statusCode: 200,
    body: JSON.stringify (wxret),
  };
};
