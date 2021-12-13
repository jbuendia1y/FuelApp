import "./App.scss";

import Header from "./components/Header";
import Routes from "./Routes";
import Sidenav from "./components/Sidenav";

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Sidenav />
        <div className="App-w">
          <Routes />
        </div>
      </div>
    </>
  );
}

export default App;
