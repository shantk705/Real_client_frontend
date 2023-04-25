import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <section className="about-us">
      <div className="about">
        <img
          src="/static/media/logo.763338d458b0b5baba83.png"
          className="pic"
          alt="logo"
        />
        <div className="text">
          <h2>About Us</h2>
          <h5>
            moooneeeee and honey shop &amp;{" "}
            <span className="aboutspan">honey</span>
          </h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
            natus ad sed harum itaque ullam enim quas, veniam accusantium, quia
            animi id eos adipisci iusto molestias asperiores explicabo cum vero
            atque amet corporis! Soluta illum facere consequuntur magni. Ullam
            dolorem repudiandae cumque voluptate consequatur consectetur, eos
            provident necessitatibus reiciendis corrupti!
          </p>
          <div className="data">
            <a href="/contactus" className="aboutbutton">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
