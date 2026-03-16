import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Landing from "../components/Landing";
import About from "../components/About";
import Contact from "../components/Contact";

function Home() {
  return (
    <>
      <Navbar />
      <Landing />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
