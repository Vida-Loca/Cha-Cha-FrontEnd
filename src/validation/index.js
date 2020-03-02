const checkValidation = (value, rules) => {
  let isValid = true;
  //   required
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  // min length
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  // max length
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  // is string
  if (rules.string) {
    isValid = /^([a-zA-Z]*)$/.test(value) && isValid;
  }
  // is number
  if (rules.number) {
    isValid = /^(\d*)$/.test(value) && isValid;
  }
  // post code format
  if (rules.postcode) {
    isValid = /^(\d{2}-\d{3})$/.test(value) && isValid;
  }
  return isValid;
};

export default checkValidation;
