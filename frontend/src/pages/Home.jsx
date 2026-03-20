import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Landing from "../components/Landing";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import RecentProperties from "../components/RecentProperties";

function Home() {
  return (
    <>
      <Navbar />
      <Landing />
      <RecentProperties />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
