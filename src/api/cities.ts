// In ../api/cities.ts

export const fetchCityData = async (
  limit: number,
  offset: number,
  searchQuery?: string
): Promise<any[]> => {
  try {
    let apiUrl = `https://documentation-resources.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/exports/json?limit=${limit}&offset=${offset}&order_by=population DESC`;

    if (searchQuery) {
      apiUrl += `&where=search(*, "${encodeURIComponent(searchQuery)}")`;
    }

    const response = await fetch(apiUrl);
    const data: any[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cities data:", error);
    throw error;
  }
};
