import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [dataApi, setDataApi] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const json = await response.json();
        const results = json.results.map((res) => {
          delete res.residents;
          return res;
        });
        setDataApi(results);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [url]);

  return {
    dataApi,
    loading,
    setDataApi,
  };
};

export default useFetch;
