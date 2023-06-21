import React from "react";
import "./Qrpayment.scss";
import Qrcode from "../../assets/qrcode.png";
import Logo from "../../assets/logo.png";

const Qrpayment = () => {
  return (
    <div className="qrpayment__container">
      <div className="qrcode__content">
        <h1 className="qrcode__content-title">
          Quét mã dưới đây để thanh toán đơn hàng của bạn
        </h1>
        <img className="qrcode__content-qr" src={Qrcode} alt="" />
        <h1 className="qrcode__content-logo">Guidi</h1>
      </div>
    </div>
  );
};

export default Qrpayment;
