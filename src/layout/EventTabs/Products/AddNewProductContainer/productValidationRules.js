const validationRules = [
    {
      name: "name",
      config: {
        type: "text",
        placeholder: "name",
        classes: "input-blue"
      },
      validation: {
        required: true
      }
    },
    {
      name: "price",
      config: {
        type: "number",
        placeholder: "price",
        classes: "input-blue"
      },
      validation: {
        required: true,
        maxLength: 10,
        min: 0.01
      }
    },
    {
      name: "quantity",
      config: {
        type: "number",
        placeholder: "quantity",
        classes: "input-blue"
      },
      validation: {
        required: true,
        maxLength: 10,
        min: 1
      }
    },
    {
      name: "productCategory",
      config: {
        type: "text",
        placeholder: "product category",
        classes: "input-blue",
        disabled: true
      },
      validation: {
        required: true
      }
    }
  ];

  export {validationRules};