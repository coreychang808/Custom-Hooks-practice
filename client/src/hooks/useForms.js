import { useState } from 'react';

function useForm(defaults = {}) {
  const [values, setValues] = useState(defaults);

   function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

   function handleSubmit (e, something) {
    e.preventDefault();
    e.target.reset();
  }

  return [values, handleChange, handleSubmit];
}

export default useForm;