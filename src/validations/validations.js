//Case names come from the state in Auth.js
//We check isValid to make sure some other validation doesn't overwrite it.
const validate = (value, rules, connectedValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case "isEmail":
        isValid = isValid && emailValidator(value);
        break;
      case "minLength":
        isValid = isValid && passwordValidator(value, rules[rule]);
        break;
      case "isEqualTo":
        isValid =
          isValid && confirmPasswordValidator(value, connectedValue[rule]);
        break;
      default:
        isValid = true;
    }
  }
  return isValid;
};

const emailValidator = value => {
  const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(String(value).toLowerCase());
};

const passwordValidator = (value, minLength) => {
  return value.length >= minLength;
};

const confirmPasswordValidator = (valueOne, valueTwo) => {
  return valueOne === valueTwo;
};

export default validate;
