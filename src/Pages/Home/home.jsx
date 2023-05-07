import './home.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import plogo from '../../Assets/logo.png';
import stick from '../../Assets/honeystick.png';
import Carousel from '../../Components/Carousel/carousel';
import spread from '../../Assets/spices-spread.png';
import axios from 'axios';


//we will bring the data from database instead fir now, 3m 7ot data statick, just to apply the effect, the slide index will determine the id of the element, and we will fetch the data by id, and display them in the 'hero left' section below
function Home() {
  const [fixed, setFixed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    axios.get('https://dayaa-backend.onrender.com/fav/getfav')
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    function scrollCarousel() {
      const carousel = carouselRef.current;
      const slideWidth = carousel.offsetWidth;
      const currentSlide = Math.round(carousel.scrollLeft / slideWidth);
      let nextSlide = currentSlide + 1;
      if (nextSlide >= favorites.length) { 
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
  
    const intervalId = setInterval(scrollCarousel, 3000);
    return () => clearInterval(intervalId);
  }, [favorites]);

  function disabled() {
    if (window.scrollY >= 790) {
      setFixed(true)
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
      <section className={fixed ? 'notfixed' : 'hero-main'}>

      <div className="hero-left">
  {favorites && favorites.length > 0 && (
    <div className='des-wrap'>
      
      <h1>{favorites[currentSlide]?.name_fav} El</h1>
      <h1>DAYAA</h1>
      <p><span>${favorites[currentSlide]?.price_fav}</span>Regular price</p>
    </div>
  )}
</div>

          <div className='right-wrapper'>
            <div className='clip'></div>
            <div className='carousel-parent'>

<ul className='carousel-wrapper' ref={carouselRef}
    onScroll={(e) => {
      const scrollPosition = e.target.scrollLeft;
      const slideWidth = e.target.offsetWidth;
      const newSlide = Math.round(scrollPosition / slideWidth);
      setCurrentSlide(newSlide); 
    }} 
>
  {favorites.map((favorite, index) => (
    <li className="carousel-child" key={index}>
      <img src={favorite.image_fav.url} alt={favorite.name_fav} className='honey'/>
      <div className="product-logo">
        <img src={plogo} alt="product" className='plogo'/>
        <h1>Dayaa Store</h1>
      </div>
    </li>
  ))}
</ul>
        </div>
          </div>
      </section>
     {/* ////////////////////////////////////////////////////////////////////// */}
      <section className='hero-shop'>
          <div className='clip-left'>
            <h2>Check out</h2>
            <h1>Our products</h1>
          </div>
          <div className='clip-right'>
            <a href="/shop" className='shop-btn'>Shop Now!</a>
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
