import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./PlaceForm.css";
import useForm from "../../shared/hooks/form-hook";
import useHttpRequest from "../../shared/hooks/http-hook";
import Input from "../../shared/components/FormElements/Input";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

const NewPlace = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();
  const [formState, inputChangeHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/places/",
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        })
      );

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <form className="place-form" onSubmit={formSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          type="text"
          label="Title"
          errorText="Please enter a valid title!"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputChangeHandler}
        />
        <Input
          id="description"
          type="textarea"
          label="Description"
          errorText="Please enter a valid description (at least 5 characters)!"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputChangeHandler}
        />
        <Input
          id="address"
          type="text"
          label="Address"
          errorText="Please enter a valid adress!"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputChangeHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
      <ErrorModal error={error} onClear={clearErrorHandler} />
    </React.Fragment>
  );
};

export default NewPlace;
