import React from "react";
import Logo from "../../../assets/logo.png";
import Facebook from "../../../assets/Facebook.png";
import Instagram from "../../../assets/Instagram.png";
import Twitter from "../../../assets/Twitter.png";
import "./Footer.scss";

const Footer = () => {
  const footerContact = [
    {
      title: "Về chúng tôi",
      contact: [
        {
          display: "Về chúng tôi",
          to: "https://www.booking.com/content/about.en-gb.html?aid=356980&label=gog235jc-1DCBQoggJCBWFib3V0SDNYA2j0AYgBAZgBCbgBF8gBDNgBA-gBAYgCAagCA7gCgd-6pQbAAgHSAiRhYjE3MDBmMS1hMzJlLTQ5MzEtYmVlYi1mYjFjY2UwZmE1ZjbYAgTgAgE&sid=63462e60db7c68a4ce038a8dae91dfc5&keep_landing=1&",
        },
        {
          display: "Guidi Blog",
          to: "/blog",
        },
      ],
    },
    {
      title: "Đối tác",
      contact: [
        {
          display: "Đăng ký nhà cung cấp",
          to: "https://partnerships.booking.com/",
        },
        {
          display: "Đối tác đăng kí",
          to: "https://partnerships.booking.com/",
        },
      ],
    },
    {
      title: "Điều khoản sử dụng",
      contact: [
        {
          display: "Chính sách bảo mật",
          to: "https://www.booking.com/content/privacy.en-gb.html?aid=356980&label=gog235jc-1FCBQoggJCBWFib3V0SDNYA2j0AYgBAZgBCbgBF8gBDNgBAegBAfgBDYgCAagCA7gCgd-6pQbAAgHSAiRhYjE3MDBmMS1hMzJlLTQ5MzEtYmVlYi1mYjFjY2UwZmE1ZjbYAgbgAgE&sid=63462e60db7c68a4ce038a8dae91dfc5",
        },
        {
          display: "Chính sách cookie",
          to: "https://www.booking.com/content/privacy.en-gb.html?aid=356980&label=gog235jc-1FCBQoggJCBWFib3V0SDNYA2j0AYgBAZgBCbgBF8gBDNgBAegBAfgBDYgCAagCA7gCgd-6pQbAAgHSAiRhYjE3MDBmMS1hMzJlLTQ5MzEtYmVlYi1mYjFjY2UwZmE1ZjbYAgbgAgE&sid=63462e60db7c68a4ce038a8dae91dfc5",
        },
        {
          display: "Chính sách và qui định",
          to: "https://www.booking.com/content/privacy.en-gb.html?aid=356980&label=gog235jc-1FCBQoggJCBWFib3V0SDNYA2j0AYgBAZgBCbgBF8gBDNgBAegBAfgBDYgCAagCA7gCgd-6pQbAAgHSAiRhYjE3MDBmMS1hMzJlLTQ5MzEtYmVlYi1mYjFjY2UwZmE1ZjbYAgbgAgE&sid=63462e60db7c68a4ce038a8dae91dfc5",
        },
      ],
    },
  ];
  return (
    <div className="footer__container">
      <div className="footer__upper">
        <div className="footer__upper-help">
          <img src={Logo} className="footer__upper-help-logo"></img>
          <p className="footer__upper-help-text">
            Để lại email để nhận được những thông báo mới nhất
          </p>
          <div className="footer__upper-help-inputbutton">
            <input type="text" placeholder="Email" />
            <button>Submit</button>
          </div>
        </div>
        {footerContact.map((item, i) => (
          <div className="footer__upper-contact">
            <h2 className="footer__upper-contact-title">{item.title}</h2>
            {item.contact.map((item2, i) => (
              <a
                href={item2.to}
                className="footer__upper-contact-link"
                target="_blank"
              >
                {item2.display}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="footer__lower">
        <p href="" className="footer__lower-copyright">
          2022-2023 Guidi. All Rights Reserved
        </p>
        <div className="footer__lower-socials">
          <a
            href="https://www.facebook.com/profile.php?id=100092600456876"
            target="_blank"
          >
            <img src={Facebook} alt="" />
          </a>
          <img src={Twitter} alt="" />
          <img src={Instagram} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
