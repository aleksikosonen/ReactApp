import {useState} from 'react';
import {validator} from '../utils/validator';

const constraints = {
  title: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 3,
      message: 'min length is 3 characters',
    },
  },
  description: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 5,
      message: 'min length is 5 characters',
    },
  },
};

const useUploadForm = (callback) => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });
  const [uploadErrors, setUploadErrors] = useState({});

  const handleInputChange = (name, text) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
    const error = validator(name, text, constraints);
    setUploadErrors((uploadErrors) => {
      return {
        ...uploadErrors,
        [name]: error,
      };
    });
    console.log('upload errors', uploadErrors.description);
  };

  const refresh = () => {
    console.log(inputs.title)
    setInputs({
      title: '',
      description: '',
    });
    console.log(inputs.title)
    setUploadErrors({});
  };

  return {
    handleInputChange,
    inputs,
    setInputs,
    uploadErrors,
    refresh,
  };
};

export default useUploadForm;
