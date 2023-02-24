const GET = async (baseURL, APIkey) => {
  const res = await fetch(baseURL + "&appid=" + APIkey + "&units=metric");
  const data = res.json();
  return data;
};

export { GET };
