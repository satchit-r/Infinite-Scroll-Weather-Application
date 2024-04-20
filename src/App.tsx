// App.tsx
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CitiesTable from "./components/CitiesTable";
import WeatherPage from "./components/WeatherPage";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={CitiesTable} />
        <Route path="/weather/:cityId" component={WeatherPage} />
      </Switch>
    </Router>
  );
};

export default App;
