import React, { useEffect } from "react";
const useStickyState = (defaultValue, key) => {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.sessionStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });
  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

export default useStickyState;