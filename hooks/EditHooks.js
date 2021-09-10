import {useState} from 'react';

const useEditForm = (callback) => {
  const [inputs, setInputs] = useState({
    email: '',
  });

  const handleInputChange = (name, text) => {
    //console.log(name, text);
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };
  return {
    handleInputChange,
    inputs,
  };
};

export default useEditForm;
