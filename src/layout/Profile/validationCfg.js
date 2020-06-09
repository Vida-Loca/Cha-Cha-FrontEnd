export const editableProfileRules = [
  {
    name: "name",
    config: {
      placeholder: "name",
    },
    validation: {
      required: true,
      string: true,
    },
  },
  {
    name: "surname",
    config: {
      placeholder: "surname",
    },
    validation: {
      required: true,
      maxLength: 10,
    },
  },
];
export const profileRules = [
  {
    name: "email",
    config: {
      placeholder: "e-mail",
    },
  },
  {
    name: "datejoined",
    config: {
      placeholder: "date joined",
    },
  },
];
