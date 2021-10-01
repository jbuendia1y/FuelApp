import "./App.scss";
import Footer from "./components/Footer";

import Header from "./components/Header";
import Routes from "./components/Routes";
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
      <Footer />
    </>
  );
}

export default App;
