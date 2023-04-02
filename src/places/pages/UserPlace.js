import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const UserPlace = () => {
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

  const { userId } = useParams();

  const FILTERED_DUMMY_PLACES = DUMMY_PLACES.filter(
    (place) => place.creator === userId
  );

  return <PlaceList items={FILTERED_DUMMY_PLACES} />;
};

export default UserPlace;
