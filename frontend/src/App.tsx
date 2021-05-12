import BootcampsPage from "./pages/BootcampsPage";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={BootcampsPage} />
      </Switch>
    </div>
  );
}

export default App;
