// see https://beta.aviationweather.gov/data/api/#/Data/dataMetars

exports.handler = async event => {
  let icao = event.queryStringParameters.icao;
  const URL = `https://beta.aviationweather.gov/cgi-bin/data/metar.php?ids=${icao}&format=json&taf=true`;
  let response = await fetch (URL, {method: 'GET'});

  let metar = await response.json ();

  console.log ('metar', metar);
  return {
    statusCode: 200,
    body: JSON.stringify (metar),
  };
};
