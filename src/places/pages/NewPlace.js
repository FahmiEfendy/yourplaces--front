import { useCallback, useReducer } from "react";

import "./NewPlace.css";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let isFormValid = true;
      for (const inputId in state.inputs) {
        if (inputId === state.inputs) {
          isFormValid = isFormValid && action.isValid;
        } else {
          isFormValid = isFormValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: isFormValid,
      };
    default:
      return state;
  }
};

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isFormValid: false,
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // TODO: Send data to back-end later
  };

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
  }, []);

  return (
    <form className="place-form" onSubmit={formSubmitHandler}>
      <Input
        id="title"
        type="text"
        label="Title"
        errorText="Please enter a valid title!"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Input
        id="description"
        type="textarea"
        label="Description"
        errorText="Please enter a valid description (at least 5 characters)!"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
      />
      <Input
        id="address"
        type="text"
        label="Address"
        errorText="Please enter a valid adress!"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Add Place
      </Button>
    </form>
  );
};

export default NewPlace;
