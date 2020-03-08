const checkValidation = (value, rules) => {
  let isValid = true;
  let errors = [];
  //   required
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
    errors.push("can't be blank");
  }
  // min length
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    errors.push(`must not be shorter than ${rules.minLength}`);
  }
  // max length
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    errors.push(`must not be longer than ${rules.maxLength}`);
  }
  // is string
  if (rules.string) {
    isValid = /^([a-zA-Z]*)$/.test(value) && isValid;
    errors.push("some characters are not allowed");
  }
  // is number
  if (rules.number) {
    isValid = /^(\d*)$/.test(value) && isValid;
    errors.push("must be a number");
  }
  // post code format
  if (rules.postcode) {
    isValid = /^(\d{2}-\d{3})$/.test(value) && isValid;
    errors.push("bad format - 00-000");
  }
  errors = isValid ? [] : errors;
  return [isValid, errors];
};

export default checkValidation;
