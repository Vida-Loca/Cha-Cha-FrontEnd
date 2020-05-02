export const primaryInfoFormRules = [
    {
        name: "startDate",
        config: {
            type: 'date',
            placeholder: "start date",
            classes: "input-blue text-input-extra"
        },
        validation: {
            required: true
        }
    },
    {
        name: "startTime",
        config: {
            type: 'time',
            placeholder: "start time",
            classes: "input-blue text-input-extra"
        },
        validation: {
            required: true,
            time: true
        }
    },
    {
        name: "name",
        config: {
            type: 'text',
            placeholder: "event name",
            classes: "input-blue"
        },
        validation: {
            required: true,
            minLength: 5,
            maxLength: 25,
        }
    }

];

export const adressFormRules = [
    {
        name: "country",
        config: {
            placeholder: "coutnry",
            classes: "input-blue"
        },
        validation: {
            required: true,
            string: true
        }
    },
    {
        name: "city",
        config: {
            placeholder: "city",
            classes: "input-blue"
        },
        validation: {
            required: true,
            string: true,
        }
    },
    {
        name: "street",
        config: {
            placeholder: "street",
            classes: "input-blue"
        },
        validation: {
            required: true,
        }
    },
    {
        name: "postcode",
        config: {
            placeholder: "post code",
            classes: "input-blue"
        },
        validation: {
            required: true,
            postcode: true
        }
    },
    {
        name: "number",
        config: {
            type: "number",
            placeholder: "house",
            classes: "input-blue",
            disabled: true
        },
        validation: {
            required: true
        }
    }
];