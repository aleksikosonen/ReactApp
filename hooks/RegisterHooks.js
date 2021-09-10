// RegisterHooks.js:
import {useState} from 'react';
import {useUser} from './ApiHooks';
import {validator} from '../utils/validator';

const constraints = {
  username: {
    presence: true,
    length: {
      minimum: 3,
      message: '^Must be at least 3 characters',
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: '^Must be at least 6 characters',
    },
  },
  confirmPassword: {
    equality: {
      message: '^Passwords dont match',
      attribute: 'password',
    }
  },
  email: {
    presence: true,
    email: {
      message: "^Doesn't look like a valid email",
    },
  },
  full_name: {
    length: {
      minimum: 1,
      message: '^Not a full name',
    },
    //format: {
      //pattern: "^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$",
    //  minimum: 1,
    //  message: '^Not a full name',
  },
};
const useSignUpForm = (callback) => {
  const {checkUsernameAvailable} = useUser();
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (name, text) => {
    console.log(name, text);
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const handleOnEndEditing = (name, text) => {
    let error;
    if (name === 'confirmPassword') {
      error = validator(name, {password: inputs.password, confirmPassword: text}, constraints);
    } else {
      error = validator(name, text, constraints);
    }
    setErrors((errors) => {
      return {
        ...errors,
        [name]: error,
      };
    });
  };

  const checkUsername = async (username) => {
    if (username.length < 3) {
      return;
    }
    try {
      const availability = await checkUsernameAvailable(username);
      if (!availability) {
        setErrors((errors) => {
          return {...errors, username: 'Username already in use'};
        });
      }
      return availability;
    } catch (e) {
      console.log('checkUsername error', e.message());
    }
  };

  return {
    handleInputChange,
    inputs,
    errors,
    checkUsername,
    handleOnEndEditing,
  };
};

export default useSignUpForm;
