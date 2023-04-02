import "./PlaceList.css";
import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card";

const PlaceList = (props) => {
  return props.items.length === 0 ? (
    <div className="place-list center">
      <Card>
        <h2>No Places Found! Maybe Create One?</h2>
        <button>Share Place</button>
      </Card>
    </div>
  ) : (
    <ul className="place-list">
      {props.items.map((place) => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            imageUrl={place.imageUrl}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creatorId}
            coordinate={place.coordinate}
          />
        );
      })}
    </ul>
  );
};

export default PlaceList;
