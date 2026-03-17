import "./App.css";

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Properties from "./pages/Properties.jsx";
import CreateProperty from "./pages/CreateProperty.jsx";
import UpdateProperty from "./pages/UpdateProperty.jsx";
import PropertyDetail from "./pages/PropertyDetail.jsx";
import PropertyInquiry from "./pages/PropertyInquiry";
import CreateTestimonial from "./pages/CreateTestimonial";
import EditTestimonial from "./pages/EditTestimonial";
import UserForms from "./pages/UserForms";
import TestimonialsAdmin from "./pages/TestimonialsAdmin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/property/inquiry/:id" element={<PropertyInquiry />} />
          <Route path="/create-property" element={<CreateProperty />} />
          <Route path="/update-property/:id" element={<UpdateProperty />} />
          <Route path="/user-forms" element={<UserForms />} />
        <Route path="/create-testimonials" element={<CreateTestimonial />} />
        <Route path="/edit-testimonial/:id" element={<EditTestimonial />} />
        <Route path="/testimonials-admin" element={<TestimonialsAdmin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
