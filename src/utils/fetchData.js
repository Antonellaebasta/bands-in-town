/**
 * Function to fetch data from an endpoint
 * @param endpoint
 * @returns {Promise<any>}
 */
export const fetchData = async (endpoint) => {
  const url = `https://rest.bandsintown.com/artists/${endpoint}`;
  const response = await fetch(url);
  return await response.json();
};