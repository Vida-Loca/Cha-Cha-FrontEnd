import React from "react";
import Form from "../../../../components/Form/Form";
import TextInput from "../../../../components/Inputs/TextInput/TextInput";
import Button from "../../../../components/button/Button";

const createForm = (formData, buttonName) => {
  return (
    <Form>
      {formData.map(obj => {
        return (
          <TextInput
            placeholder={obj.placeholder}
            name={obj.name}
            key={obj.name}
          />
        );
      })}
      <Button classes="btn-blueGradient btn-md">{buttonName}</Button>
    </Form>
  );
};

export const editAddress = () => {
  const forms = [
    { name: "city", placeholder: "City" },
    { name: "street", placeholder: "Street" },
    { name: "houseNumber", placeholder: "House Number" },
    { name: "apartmentNumber", placeholder: "Apartment Number" }
  ];
  return createForm(forms, "update");
};

export const editPhoneNumber = () => {
  const forms = [{ name: "phoneNumber", placeholder: "Phone Number" }];
  return createForm(forms, "update");
};

export const editDateAndTime = () => {
  const forms = [
    { name: "date", placeholder: "Date" },
    { name: "time", placeholder: "Time" }
  ];
  return createForm(forms, "update");
};

export const editAttitionalInformation = () => {
  const forms = [
    { name: "additionalInformation", placeholder: "Additional Information" }
  ];
  return createForm(forms, "update");
};
