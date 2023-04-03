import { useParams } from "react-router-dom";

import "./PlaceForm.css";
import useForm from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Borobudur",
    description:
      "Borobudur is a 9th-century Mahayana Buddhist temple in Magelang Regency, not far from the city of Magelang and the town of Muntilan, in Central Java, Indonesia",
    imageUrl:
      "https://img.okezone.com/content/2022/02/04/337/2542154/mengenal-raja-yang-meratakan-puncak-bukit-demi-membangun-candi-borobudur-thVuwzm6PE.jpg",
    address:
      "Jl. Badrawati, Kw. Borobudur Temple, Borobudur, Kec. Borobudur, Magelang Regency, Central Java",
    coordinates: {
      lat: -7.6060136,
      lng: 110.1984,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "National Monument",
    description:
      "The National Monument is a 132 m (433 ft) obelisk in the centre of Merdeka Square, Central Jakarta, symbolizing the fight for Indonesia",
    imageUrl:
      "https://duitologi.com/media/5ZNKKORS9CTWC6NL1O3U74AXK7QT191G00NJNSNXQUKFVRJVSGPSUD9MNZD9RC4N.jpg.1250x660_q85.jpg",
    address:
      "RT.5/RW.2, Gambir, Gambir District, Central Jakarta City, Special Capital Region of Jakarta 10110",
    coordinates: {
      lat: -6.1753871,
      lng: 106.8249588,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const { placeId } = useParams();

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
    },
    true
  );

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // TODO: Send data to back-end later
  };

  const selectedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  return selectedPlace ? (
    <form className="place-form" onSubmit={formSubmitHandler}>
      <Input
        id="title"
        type="text"
        label="Title"
        errorText="Please enter a valid title!"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputChangeHandler}
        value={formState.inputs.title.value}
        valid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        type="textarea"
        label="Description"
        errorText="Please enter a valid description (at least 5 characters)!"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        rows={3}
        onInput={inputChangeHandler}
        value={formState.inputs.description.value}
        valid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  ) : (
    <div className="center">
      <h2>No Place Found!</h2>
    </div>
  );
};

export default UpdatePlace;
