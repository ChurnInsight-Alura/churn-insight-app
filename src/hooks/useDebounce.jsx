import { useEffect, useState } from "react";

export function useDebounce(value, time=300) {
  const [debounceValue, setDebounceValue] = useState();
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), time);
    return () => {
      clearTimeout(timer);
    };
  }, [value,time]);
  return debounceValue;
}
