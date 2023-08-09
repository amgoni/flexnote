import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.scss";
import Footer from "./components/Footer";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Welcome from "./Pages/Welcome";
import AuthContext from "./store/auth-context";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Redirect to /home if authenticated, otherwise show Welcome */}
          <Route
            path="/"
            element={authCtx.isLoggedIn ? <Navigate to="/home" /> : <Welcome />}
          />

          {/* Render the About component */}
          <Route path="/about" element={<About />} />

          {/* Render the Home component */}
          <Route path="/home/*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
