import "./home.css";
import React from "react";
import { useState, useEffect, useRef } from "react";
import honey from "../../Assets/honey.png";
import plogo from "../../Assets/logo.png";
import stick from "../../Assets/honeystick.png";
import Carousel from "../../Components/Carousel/carousel";
import spread from "../../Assets/spices-spread.png";

//we will bring the data from database instead fir now, 3m 7ot data statick, just to apply the effect, the slide index will determine the id of the element, and we will fetch the data by id, and display them in the 'hero left' section below
function Home() {
  const [fixed, setFixed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const slidesData = [
    {
      title: "ALL NATURAL",
      subtitle: "HONEY EL",
      price: "$5.59",
    },
    {
      title: "ALL NATURAL",
      subtitle: "KAMMOUN EL",
      price: "$2.99",
    },
    {
      title: "ALL NATURAL",
      subtitle: "DEBES EL",
      price: "$6.99",
    },
    {
      title: "ALL NATURAL",
      subtitle: "MRABA EL",
      price: "$12.99",
    },
    {
      title: "ALL NATURAL",
      subtitle: "HACHICH EL",
      price: "$99.99",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(scrollCarousel, 3000);
    return () => clearInterval(intervalId);
  }, []);

  function scrollCarousel() {
    const carousel = carouselRef.current;
    const slideWidth = carousel.offsetWidth;
    const currentSlide = Math.round(carousel.scrollLeft / slideWidth);
    let nextSlide = currentSlide + 1;
    if (nextSlide >= carousel.children.length) {
      nextSlide = 0;
      carousel.scrollLeft = 0;
    } else {
      carousel.scroll({
        left: nextSlide * slideWidth,
        behavior: "smooth",
      });
    }
    setCurrentSlide(nextSlide);
  }

  function disabled() {
    if (window.scrollY >= 1050) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", disabled);
    return () => window.removeEventListener("scroll", disabled);
  }, []);

  return (
    <>
      <section className={fixed ? "notfixed" : "hero-main"}>
        <div className="hero-left">
          <h1>{slidesData[currentSlide].title}</h1>
          <div className="des-wrap">
            <h1>{slidesData[currentSlide].subtitle}</h1>
            <h1>DAYAA</h1>
          </div>
          <p>
            <span>{slidesData[currentSlide].price}</span>Regular price
          </p>
        </div>
        <div className="right-wrapper">
          <div className="clip"></div>
          <div className="carousel-parent">
            <ul
              className="carousel-wrapper"
              ref={carouselRef}
              onScroll={(e) => {
                const scrollPosition = e.target.scrollLeft;
                const slideWidth = e.target.offsetWidth;
                const newSlide = Math.round(scrollPosition / slideWidth);
                setCurrentSlide(newSlide);
              }}>
              <li className="carousel-child">
                <img src={honey} alt="honey" className="honey" />
                <div className="product-logo">
                  <img src={plogo} alt="product" className="plogo" />
                  <h1>Dayaa Store</h1>
                </div>
              </li>
              <li className="carousel-child">
                <img src={honey} alt="honey" className="honey" />
                <div className="product-logo">
                  <img src={plogo} alt="product" className="plogo" />
                  <h1>Dayaa Store</h1>
                </div>
              </li>
              <li className="carousel-child">
                <img src={honey} alt="honey" className="honey" />
                <div className="product-logo">
                  <img src={plogo} alt="product" className="plogo" />
                  <h1>Dayaa Store</h1>
                </div>
              </li>
              <li className="carousel-child">
                <img src={honey} alt="honey" className="honey" />
                <div className="product-logo">
                  <img src={plogo} alt="product" className="plogo" />
                  <h1>Dayaa Store</h1>
                </div>
              </li>
              <li className="carousel-child">
                <img src={honey} alt="honey" className="honey" />
                <div className="product-logo">
                  <img src={plogo} alt="product" className="plogo" />
                  <h1>Dayaa Store</h1>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="hero-shop">
        <div className="clip-left">
          <h2>Check out</h2>
          <h1>Our products</h1>
        </div>
        <div className="clip-right">
          <a href="/shop" className="shop-btn">
            Shop Now!
          </a>
        </div>
      </section>
      <div className="stick-fill">
        <img src={stick} alt="honey stick" />
      </div>
      <Carousel />
      <div className="spread-fill">
        <img src={spread} alt="honey stick" />
      </div>
    </>
  );
}

export default Home;
