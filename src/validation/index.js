const checkValidation = (value, rules) => {
  let isValid = true;
  let errors = [];
  //   required
  if (rules.required) {
    const rule = value.trim() !== "";
    isValid = rule && isValid;
    if (!rule) {
      errors.push("can't be blank");
    }
  }
  // min length
  if (rules.minLength) {
    const rule = value.length >= rules.minLength;
    isValid = rule && isValid;
    if (!rule) {
      errors.push(`must not be shorter than ${rules.minLength}`);
    }
  }
  // max length
  if (rules.maxLength) {
    const rule = value.length <= rules.maxLength;
    isValid = rule && isValid;
    if (!rule) {
      errors.push(`must not be longer than ${rules.maxLength}`);
    }
  }
  // is string
  if (rules.string) {
    const rule = /^([a-zA-Z ]*)$/.test(value);
    isValid = rule && isValid;
    if (!rule) {
      errors.push("some characters are not allowed");
    }
  }
  // no spaces
  if (rules.string) {
    const rule = /^([^ ]*)$/.test(value);
    isValid = rule && isValid;
    if (!rule) {
      errors.push("spaces are not allowd");
    }
  }
  // is number
  if (rules.number) {
    const rule = /^(\d*)$/.test(value);
    isValid = rule && isValid;
    if (!rule) {
      errors.push("must be a number");
    }
  }
  // post code format
  if (rules.postcode) {
    const rule = /^(\d{2}-\d{3})$/.test(value);
    isValid = rule && isValid;
    if (!rule) {
      errors.push("bad format - 00-000");
    }
  }
  errors = isValid ? [] : errors;
  return [isValid, errors];
};

export default checkValidation;
