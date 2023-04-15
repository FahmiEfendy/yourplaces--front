import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Auth from "./user/pages/Auth";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import useAuth from "./shared/hooks/auth-hook";
import UserPlace from "./places/pages/UserPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import { AuthContext } from "./shared/context/auth-context";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

function App() {
  const { userId, userToken, login, logout } = useAuth();

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
