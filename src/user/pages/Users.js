import React, { useEffect, useState } from "react";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const [error, setError] = useState(null);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const clearErrorHandler = () => {
    setError(null);
  };

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:5000/api/users", {
          method: "GET",
        });

        const responseData = await response.json();

        if (!response.ok) throw new Error(responseData.message);

        setUserList(responseData.data);
        setIsLoading(false);
      } catch (err) {
        setError(
          err.message ||
            "Something went wrong when get all users, please try again."
        );
        setIsLoading(false);
      }
    };

    sendRequest();
  }, []);

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <ErrorModal error={error} onCancel={clearErrorHandler} />
      <UserList items={userList} />
    </React.Fragment>
  );
};

export default Users;
