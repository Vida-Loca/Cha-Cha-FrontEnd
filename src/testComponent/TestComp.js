import React, { useState, useContext } from "react";
import TextInput from "../components/Inputs/TextInput/TextInput";
import Button from "../components/button/Button";
import { FormContext } from "../context/FormContext";
import Modal from "../components/Modal/Modal";

const TestComp = () => {
  const [testState, setTest] = useState({ kek: "" });

  const handleRegsterChange = event => {
    setTest({ ...testState, kek: event.target.value });
    console.log(testState);
  };

  const something = () => {
    return (
      <TextInput
        onChange={handleRegsterChange}
        placeholder="name"
        name="name"
      />
    );
  };

  const [changedForm, setChangedForm] = useContext(FormContext);

  const insideHome = () => {
    setChangedForm({ ...changedForm, show: true });
  };
  const hideModal = () => {
    setChangedForm({ ...changedForm, show: false });
  };

  return (
    <div>
      <Modal show={changedForm.show} modalClose={hideModal}>
        {something}
      </Modal>

      <Button clicked={insideHome} classes="btn-md btn-blueGradient">
        + Create Event
      </Button>
    </div>
  );
};

export default TestComp;
