import React, { useContext, useEffect, useState } from "react";

import UserList from "../components/UserList";
import useHttpRequest from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const auth = useContext(AuthContext);

  const [userList, setUserList] = useState([]);
  const { isLoading, error, sendRequest, clearErrorHandler } = useHttpRequest();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );
        setUserList(responseData.data);

        // Remove logged user from ALL USERS
        setUserList((prevUserList) =>
          prevUserList.filter((user) => user.id !== auth.userId)
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchRequest();
  }, [auth.userId, sendRequest]);

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
