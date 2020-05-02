const addressForm = [
    {
      name: "country",
      config: {
        placeholder: "country",
        type: "text"
      },
      validation: {
        required: true,
      }
    },
    {
      name: "city",
      config: {
        placeholder: "city",
        type: "text"
      },
      validation: {
        required: true,
      }
    },
    {
      name: "street",
      config: {
        placeholder: "street",
        type: "text"
      },
      validation: {
        required: true,
        maxLength: 20
      }
    },
    {
      name: "number",
      config: {
        placeholder: "house number",
        type: "number"
      },
      validation: {
        required: true,
        number: true,
        maxLength: 10
      }
    },
    {
      name: "postcode",
      config: {
        placeholder: "post code",
        type: "text"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    }
  ];


  const letlongRules = [
    {
      name: "lat",
      config: {
        placeholder: "latitude",
        type: "number"
      },
      validation: {
        required: false,
      }
    },
    {
      name: "long",
      config: {
        placeholder: "longitude",
        type: "number"
      },
      validation: {
        required: false,
      }
    }
  ];

  const locationInfoForm = [
    {
      name: "dateofevent",
      config: {
        placeholder: "date of event",
        type: "date"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    },
    {
      name: "time",
      config: {
        placeholder: "time",
        type: "time"
      },
      validation: {
        required: true,
        maxLength: 10
      }
    }
  ];




  export {locationInfoForm, addressForm, letlongRules};