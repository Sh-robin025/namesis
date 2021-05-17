import LoginPage from "./Components/LoginPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard from "./Components/DashBoard";
import { createContext } from "react";
import { useState } from "react";

export const popUpContext = createContext()

function App() {
  const [openPopUp, setOpenPopUp] = useState(false)

  return (
    <popUpContext.Provider value={[openPopUp, setOpenPopUp]}>
      <Router>
        <Switch>
          <Route path="/dashboard">
            <DashBoard />
          </Route>
          <Route>
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </popUpContext.Provider>
  );
}

export default App;
