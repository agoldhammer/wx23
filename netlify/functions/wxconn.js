const appid = process.env.appid;

exports.handler = async event => {
  let city = event.queryStringParameters.city;
  let country = event.queryStringParameters.country;
  console.log ('citycoun', city, country);

  let response = await fetch (
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}%2C${country}&limit=1&appid=${appid}`,
    {
      method: 'GET',
    }
  );

  let geodata_list = await response.json ();
  let geodata = geodata_list[0];
  let {name, coun, lat, lon} = geodata;
  let retval = JSON.stringify ({geodata: geodata});

  let wxapi = 
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}`
  console.log("wxapi", wxapi);
  let wxresponse = await fetch (
    wxapi, {method: "GET"}
  )
  wxval = await wxresponse.json ();
  console.log ('wxval', wxval);
  // console.log ('retval', retval);
  return {
    statusCode: 200,
    body: retval,
  };
};
