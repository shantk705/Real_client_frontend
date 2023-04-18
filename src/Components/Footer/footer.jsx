import "./footer.css";
import React from "react";

function Footer() {
  return (
    <footer>
      <main className="footer-main">
        <section className="clmn-1">
          <h1>
            <plaintext>SOCIAL LINKS</plaintext>
          </h1>
          <div className="media-icons-wrapper">
            <div className="icons-wrapper">
              <div className="icn-wrap">
                <a href="https://www.instagram.com/dayaa.store/">
                  <i className="ri-instagram-line"></i>
                </a>
              </div>
              <div className="icn-wrap">
                <a href="/">
                  <i className="ri-facebook-fill"></i>
                </a>
              </div>
              <div className="icn-wrap">
                <a href="/">
                  <i className="ri-linkedin-fill"></i>
                </a>
              </div>
            </div>
            <p>Don't Forget To Follow Us!</p>
          </div>
        </section>

        <section className="clmn-2">
          <h1>Products</h1>
          <ul>
            <li>
              <a href="/">Moune</a>
            </li>
            <li>
              <a href="/">Honey</a>
            </li>
            <li>
              <a href="/">Discounts</a>
            </li>
          </ul>
        </section>

        <section className="clmn-3">
          <h1>Resources</h1>
          <ul>
            <li>
              <a href="/">Insta post</a>
            </li>
            <li>
              <a href="/">Feedbacks</a>
            </li>
          </ul>
        </section>

        <section className="clmn-4">
          <h1>Contact</h1>
          <ul>
            <li>
              <a href="/contactus">Mail us</a>
            </li>
            <li>
              <a href="https://api.whatsapp.com/send/?phone=96181909322&text&type=phone_number&app_absent=0">
                WhatsApp
              </a>
            </li>
          </ul>
        </section>
      </main>
      <p className="copyright">
        Copyright © 2023 Dayaa Store All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
