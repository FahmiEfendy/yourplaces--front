import React, { useEffect, useState } from "react";

import UserList from "../components/UserList";
import useHttpRequest from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const [userList, setUserList] = useState([]);
  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );
        setUserList(responseData.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRequest();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <ErrorModal error={error} onClear={clearErrorHandler} />
      <UserList items={userList} />
    </React.Fragment>
  );
};

export default Users;
