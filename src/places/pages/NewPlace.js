import "./NewPlace.css";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        type="text"
        label="Title"
        errorText="Please enter a valid title"
        validators={[VALIDATOR_REQUIRE]}
      />
    </form>
  );
};

export default NewPlace;
