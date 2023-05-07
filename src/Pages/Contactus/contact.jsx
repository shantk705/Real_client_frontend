import "./contact.css";
import axios from "axios";
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const form = useRef();
  const [error, setError] = useState(null);

  const [myData, setmyData] = useState({
    fullName: "",
    mail: "",
    Message: "",
  });
  const { fullName, mail, Message } = myData;

  const onChange = (e) => {
    setmyData({ ...myData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        "service_51q4gui",
        "template_b9ajebw",
        form.current,
        "xGN8ZyR34jEIrY5x2"
      );

     
      form.current.reset();
    } catch (error) {
      console.log("email sending failed", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!mail) {
      setError("Email is required");
      return;
    }
    setError(null);
    const newContact = {
      fullName: fullName,
      mail: mail,
      Message: Message,
    };
    await sendEmail(e);

    try {
      await axios.post("https://dayaa-backend.onrender.com/contactus", newContact);
      setmyData({
        fullName: "",
        mail: "",
        Message: "",
      });
    } catch (err) {
      console.log("error", err.response.data);
    }
  };

  return (
    <>
      <div className="contact-us">
        <div className="primary">
          <h1>Have Any Question?</h1>
          <p>Please fill out this form below or email us at <span>day3aStore@gmail.com</span> and we will get back to you promptly regarding your request.</p>
        </div>
        
        <div className="secondary">
          <div className="secondary-clip"></div>
          <div className="holder-contact">
            <div className="insider">
            <div className="frm-wrpr">
              <form className="contact-form" ref={form} onSubmit={onSubmit}>
              <h1>CONTACT US</h1>
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  placeholder="Enter your Full name"
                  onChange={onChange}
                  required
                />
                <label htmlFor="E-mail">E-mail</label>
                <input
                  type="text"
                  name="mail"
                  value={mail}
                  placeholder="Enter your email "
                  onChange={onChange}
                  required
                />
                {error === "Email is required" && (
                  <div style={{ color: "red" }}>{error}</div>
                )}
                <label htmlFor="Message">Message</label>
                <textarea
                  className="message"
                  type="text"
                  name="Message"
                  value={Message}
                  placeholder="Enter your Message"
                  onChange={onChange}
                  required
                />
                <button className="form-sbmt" type="submit" onClick={onSubmit}>
                  SEND
                </button>
              </form>
            </div>
            <div className="social-cntc">
              <div className="cntct-info">
                <div className="info-head">
                  <h2>Feel Free</h2>
                  <p>To reach out at any time</p>
                </div>
                <div className="info-main">
                  <div className="icontainer">
                    <i className="ri-phone-line icontact"></i>
                    <p>+961 - 81422765</p>
                  </div>
                  <div className="icontainer">
                    <i className="ri-mail-line icontact"></i>
                    <p>day3aStore@gmail.com</p>
                  </div>
                  <div className="icontainer">
                    <i className="ri-map-pin-line icontact"></i>
                      <p>Had l chou esmo<br></br> eddem l shou bi2ouloulo</p>
                    </div>
                  </div>

                <div className="info-foot">
                  <div className="icontainer">
                  <i className="ri-facebook-fill icontact"></i>
                  </div>
                  <div className="icontainer">
                    <i className="ri-linkedin-fill icontact"></i>
                  </div>
                  <div className="icontainer">
                    <i className="ri-instagram-line icontact"></i>
                  </div>
                  <div className="icontainer">
                    <i className="ri-twitter-fill icontact"></i>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;