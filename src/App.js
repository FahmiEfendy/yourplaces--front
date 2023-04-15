import { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Auth from "./user/pages/Auth";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlace from "./places/pages/UserPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import { AuthContext } from "./shared/context/auth-context";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

let logoutTimer;

function App() {
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [tokenExpirationDateState, setTokenExpirationDateState] = useState();

  const login = useCallback((id, token, expirationDate) => {
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 2000);

    setUserId(id);
    setUserToken(token);
    setTokenExpirationDateState(tokenExpirationDate);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        id,
        token,
        expirationDate: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setUserToken(null);
    setTokenExpirationDateState(null);

    localStorage.removeItem("userData");
  }, []);

  // Logout when token expired
  useEffect(() => {
    if (userToken && tokenExpirationDateState) {
      // Convert to milisecond
      const remainingTime =
        tokenExpirationDateState.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, tokenExpirationDateState, userToken]);

  // GET LocalStorage value to re-login when page refresh
  useEffect(() => {
    // Return if localStorage is empty
    if (!localStorage.getItem("userData")) return;

    const { id, token, expirationDate } = JSON.parse(
      localStorage.getItem("userData")
    );

    // Check if id and token exist and expirationDate > currentDate, if no then return
    if (!id || !token || !new Date(expirationDate) > new Date()) return;

    login(id, token, new Date(expirationDate));
  }, [login]);

  return (
    <AuthContext.Provider
      value={{ isLogin: !!userToken, userId, userToken, login, logout }}
    >
      <Router>
        <MainNavigation></MainNavigation>
        <main>
          {userToken ? (
            <Routes>
              <Route path="/" exact element={<Users />} />
              <Route path="/:userId/places" exact element={<UserPlace />} />
              <Route path="/place/new" exact element={<NewPlace />} />
              <Route path="/place/:placeId" exact element={<UpdatePlace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" exact element={<Users />} />
              <Route path="/:userId/places" exact element={<UserPlace />} />
              <Route path="/auth" exact element={<Auth />} />
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </Routes>
          )}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
