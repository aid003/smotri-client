export const customFetch = async (url, options) => {
  if (!url) {
    throw new Error("Missed url");
  }

  if (!options) {
    try {
      const request = await fetch(url);
      const data = await request.json();

      const value = {
        data: data,
        status: request.status,
      };
      return value;
    } catch (error) {
      throw new Error(`fetch error ${error}`);
    }
  }

  const request = await fetch(url, options);
  const data = await request.json();
  const value = {
    data: data,
    status: request.status,
  };
  return value;
};
