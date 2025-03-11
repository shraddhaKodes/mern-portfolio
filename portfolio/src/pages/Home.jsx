import React from "react";
import Hero from "./miniComponents/Hero";
import Timeline from "./miniComponents/Timeline";
import Skills from "./miniComponents/Skills";
import MyApps from "./miniComponents/MyApps";
import About from "./miniComponents/About";
import Portfolio from "./miniComponents/Portfolio";
import Contact from "./miniComponents/Contact";
import Navbar from "./miniComponents/Navbar";
import Footer from "./miniComponents/Footer";
import "../styles/Home.css"
const Home = () => {
  return (
    <main className="px-6 sm:px-10 mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-32 w-full max-w-6xl mx-auto flex flex-col gap-16 bg-blue-50 min-h-screen">
      <Navbar/>
      <Hero />
      <Timeline />
      <About />
      <Skills />
      <Portfolio />
      <MyApps />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
