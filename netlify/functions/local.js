
exports.handler = async event => {
  const appid = process.env.appid;
  // let city = 'Cambridge';
  // let country = 'US';
  let city = event.queryStringParameters.city;
  let country = event.queryStringParameters.country;
  // console.log ('local', city, country);

  let geoapi = `http://api.openweathermap.org/geo/1.0/direct?q=${city}%2C${country}&limit=1&appid=${appid}`;
  let response = await fetch (geoapi, {method: 'GET'});

  let geodata_list = await response.json ();
  let geodata = geodata_list[0];
  let {lat, lon} = geodata;
  // console.log ('local1', lat, lon);

  let wxapi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=imperial`;

  let local_wx = await fetch (wxapi, {method: 'GET'});
  let retval = await local_wx.json ();
  // console.log ('local2', retval);
  return {
    statusCode: 200,
    body: JSON.stringify (retval),
  };
};
