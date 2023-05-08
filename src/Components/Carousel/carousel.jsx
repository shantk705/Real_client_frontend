import './carousel.css'
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import RightIcon from '../icons/iconRight';
import LeftIcon from '../icons/iconLeft';

function Carousel() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    axios.get('https://dayaa-backend.onrender.com/item/getdiscount')
      .then(res => {
        setData(res.data);
        
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    carouselRef.current.scrollTo({ left: currentIndex * carouselRef.current.offsetWidth, behavior: 'smooth' });
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);
  }

  const nextSlide = () => {
    setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);
  }

  return (
    <div className="carousel-wrap">
      <h1>DISCOUNTS</h1>
      <div className="carousel-container">
        <div className="carousel" ref={carouselRef}>
          <button onClick={prevSlide}>
            <LeftIcon />
          </button>
          {data.map((item, index) => {
            const active = index === currentIndex ? 'active' : '';
            return (
              <div key={index} className={`carousel-slide ${active}`}>
                <div className='sale-per'>SALE {item.discount_per}%</div>
                <div className='left-slide'>
                  <img src={item.image.url} alt={item.name} className='crsl-img'/>
                </div>
                <h2 className='Name-2'>{item.name}</h2>
                <div className='right-slide'>
                  <h2 className='Name'>{item.name}</h2>
                  <p className='slide-description'>{item.description}</p>
                  <div id='price-container'>
                    <h1 className='original'>{item.price}$</h1>
                    <h1 className='discounted-price'>{item.price_after_discount}$</h1>
                  </div>
                </div>
              </div>
            );
          })}
          <button onClick={nextSlide}>
            <RightIcon />
          </button>
        </div>
        </div>
    </div>
  );
}

export default Carousel;
