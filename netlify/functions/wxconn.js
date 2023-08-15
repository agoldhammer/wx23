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
  // let {name, country, lat, lon} = geodata;
  // console.log ('wxconn', geodata);
  let retval = JSON.stringify ({geodata: geodata});
  // console.log ('retval', retval);
  return {
    statusCode: 200,
    body: retval,
  };
};
