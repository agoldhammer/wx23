exports.handler = async event => {
  const icaos = ['KBOS', 'KBED', 'KOWD', 'KORH', 'KMHT'];
  const encoded_icaos = encodeURIComponent (icaos.join ());
  const url = `https://aviationweather.gov/api/data/metar/?ids=${encoded_icaos}`;
  const response = await fetch (url);
  const text = await response.text ();
  // must slice off last item in split, which will be blank b/c of trailing newline
  const metars = text.split ('\n').slice (0, -1);
  return {
    statusCode: 200,
    body: JSON.stringify (metars),
  };
};
