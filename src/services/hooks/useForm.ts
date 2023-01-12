import React from 'react';

export const useForm = (inputValues: any) => {
  const [ form, setForm ] = React.useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setForm({...form, [name]: value});
  };
  return {form, handleChange, setForm};
}