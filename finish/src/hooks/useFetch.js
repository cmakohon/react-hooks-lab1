import { useState } from "react";

export function useFetch(asyncFunc, initialState) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialState);

  const fetchData = async (...args) => {
    setLoading(true);
    const response = await asyncFunc(...args);
    const data = await response.json();
    setData(data.result);
    setLoading(false);
  }

  return [data, loading, fetchData];
}