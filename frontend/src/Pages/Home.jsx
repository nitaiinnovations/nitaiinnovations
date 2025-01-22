import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero";
import ProductsAndSolutions from "../Components/ProductsAndSolutions";
import AboutUsComp from "../Components/AboutUsComp";
import DividerLine from "../Components/DividerLine";
import ContactUsComp from "../Components/ContactUsComp";

import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll";
import axios from "axios";

export default function Home() {
  const location = useLocation();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching data...");
    axios
      .get(`${BACKEND_URL}/allBlogs`)
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
        console.log("Received data");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [BACKEND_URL]);

  // Scroll to particular section on navItem click
  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.state?.scrollTo) {
      const offset =
        location.state.scrollTo === "productsAndSolutionSection" ? 0 : -120;
      scroller.scrollTo(location.state.scrollTo, {
        smooth: true,
        duration: 500,
        offset: offset,
      });
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <DividerLine />

      <AboutUsComp />
      <DividerLine />

      <ProductsAndSolutions />
      <DividerLine />

      <ContactUsComp />
    </>
  );
}
