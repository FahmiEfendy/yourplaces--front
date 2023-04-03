import "./PlaceForm.css";
import useForm from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

const NewPlace = () => {
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

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // TODO: Send data to back-end later
  };

  return (
    <form className="place-form" onSubmit={formSubmitHandler}>
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
  );
};

export default NewPlace;
