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
import MainNavigation from "./shared/components/Navigation/MainNavigation";

function App() {
  return (
    <Router>
      <MainNavigation></MainNavigation>
      <main>
        <Routes>
          <Route path="/" exact element={<Users />} />
          <Route path="/:userId/places" exact element={<UserPlace />} />
          <Route path="/place/new" exact element={<NewPlace />} />
          <Route path="/place/:placeId" exact element={<UpdatePlace />} />
          <Route path="/auth" exact element={<Auth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
