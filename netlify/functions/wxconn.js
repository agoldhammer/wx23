const appid = process.env.appid;

exports.handler = async event => {
  let city = event.queryStringParameters.city;
  let country = event.queryStringParameters.country;
  // console.log ('citycoun', city, country);

  function checkStatus (response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error (response.statusText);
      error.response = response;
      throw error;
    }
  }

  const geoapi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}%2C${country}&limit=1&appid=${appid}`;
  let response = await fetch (geoapi, {method: 'GET'});
  response = checkStatus (response);
  if (!response.ok) {
    throw new Error (response.statusText);
  }

  let geodata_list = await response.json ();
  // console.log ('geodata_list', city, country, geodata_list);
  if (geodata_list.length === 0) {
    throw new Error (`Geodata error ${city}, ${country}`);
  }
  let geodata = geodata_list[0];
  let {lat, lon} = geodata;

  // TODO: revise error handling
  const wxapi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}&units=imperial`;
  // console.log ('wxapi', wxapi);
  let wxresponse = await fetch (wxapi, {method: 'GET'});
  wxresponse = checkStatus (wxresponse);
  if (!wxresponse.ok) {
    throw new Error (wxresponse.statusText);
  }
  const wxval = await wxresponse.json ();

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

  const wxret = {
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
