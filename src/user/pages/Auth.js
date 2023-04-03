import "./Auth.css";
import useForm from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

const Auth = () => {
  const [formState, inputChangeHandler] = useForm(
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

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // TODO: Send data to back-end later
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={formSubmitHandler}>
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
          LOGIN
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
