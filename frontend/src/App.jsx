import "./App.css";

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Properties from "./pages/Properties.jsx";
import CreateProperty from "./pages/CreateProperty.jsx";
import UpdateProperty from "./pages/UpdateProperty.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/create-property" element={<CreateProperty />} />
          <Route path="/update-property/:id" element={<UpdateProperty />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
