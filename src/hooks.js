import { useState } from 'react';

export const useInput = init => {
  // custom hook
  const [value, setValue] = useState(init);
  const onChange = e => {
    setValue(e.target.value ? e.target.value : '');
  };
  const reset = () => {
    setValue(init);
  };
  // return the value with the onChange function instead of setValue function
  return [value, onChange, reset];
};
