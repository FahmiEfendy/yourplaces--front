import React from "react";
import { useContext, useState } from "react";

import "./Auth.css";
import useForm from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

const Auth = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const auth = useContext(AuthContext);

  const [formState, inputChangeHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const toggleLoginModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, name: { value: "", isValid: false } },
        false
      );
    }

    setIsLoginMode((prevState) => !prevState);
  };

  const clearErrorHandler = () => {
    setError(null);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        setIsLoading(true);

        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();

        if (!response.ok) throw new Error(responseData.message);

        setIsLoading(false);
        auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(
          err.message ||
            "Something went wrong when logging in, please try again."
        );
      }
    } else {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // JSON.stringify: convert string to JSON
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();

        // response.ok = 200-ish status code
        // !response.ok = 400-ish & 500-ish code
        if (!response.ok) throw new Error(responseData.message);

        setIsLoading(false);
        auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(
          err.message || "Something went wrong when signin up, plase try again."
        );
      }
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearErrorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{`${isLoginMode ? "Login" : "SignUp"} Mode`}</h2>
        <hr />
        <form onSubmit={formSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              type="text"
              label="Name"
              errorText="Please enter a valid name!"
              validators={[VALIDATOR_REQUIRE]}
              onInput={inputChangeHandler}
            ></Input>
          )}
          <Input
            id="email"
            type="email"
            label="Email"
            errorText="Please enter a valid email!"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            onInput={inputChangeHandler}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            errorText="Please enter a valid password!"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            onInput={inputChangeHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {`${isLoginMode ? "LOGIN" : "SIGN UP"}`}
          </Button>
        </form>
        <Button inverse onClick={toggleLoginModeHandler}>
          {`SWITCH TO ${isLoginMode ? "SIGN UP" : "LOGIN"}`}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
