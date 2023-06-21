import React from "react";
import "./Payment.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Payment = () => {
  const itenary = useSelector((state) => state.innetary.itenary);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  console.log(user);
  return (
    <div className="payment__container">
      <div className="payment__wrapper">
        <div className="payment__title">
          <h2>Điền thông tin</h2>
        </div>
        <div className="payment__content">
          <form onSubmit={() => navigate("/qrpayment")} action="">
            <h2>Thông tin đơn hàng</h2>
            <div className="payment__productInfo">
              <div className="payment__productInfo-wrapper">
                <p className="payment__productInfo-label">Tên đơn hàng:</p>
                <p className="payment__productInfo-value">{itenary.title}</p>
              </div>
              <div className="payment__productInfo-wrapper">
                <p className="payment__productInfo-label">Giá tiền:</p>
                <p className="payment__productInfo-value">
                  {itenary.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
              <div className="payment__productInfo-wrapper">
                <p className="payment__productInfo-label">
                  Phí Agency/ Website:
                </p>
                <p className="payment__productInfo-value">15%</p>
              </div>
              <div className="payment__productInfo-wrapper">
                <p className="payment__productInfo-label">
                  Tổng số tiền phải thanh toán:
                </p>
                <p className="payment__productInfo-value">
                  {(itenary.price + (itenary.price * 15) / 100).toLocaleString(
                    "vi-VN",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                </p>
              </div>
            </div>
            <h2>Thông tin liên lạc</h2>
            <div className="payment__contactInfo">
              <div className="payment__contactInfo-wrapper">
                <p className="payment__contactInfo-label">Họ và Tên*:</p>
                <input
                  required
                  defaultValue={user.fullName ? user.fullName : ""}
                  className="payment__contactInfo-input"
                  type="text"
                  placeholder="Nguyen Van A"
                />
              </div>
              <div className="payment__contactInfo-wrapper">
                <p className="payment__contactInfo-label">Địa chỉ*:</p>
                <input
                  required
                  defaultValue={user.address ? user.address : ""}
                  className="payment__contactInfo-input"
                  type="text"
                  placeholder="TP.HCM"
                />
              </div>
              <div className="payment__contactInfo-wrapper">
                <p className="payment__contactInfo-label">SĐT*:</p>
                <input
                  defaultValue={user.phone ? user.phone : ""}
                  className="payment__contactInfo-input"
                  type="tel"
                  placeholder="0987654321"
                />
              </div>
              <div className="payment__contactInfo-wrapper">
                <p className="payment__contactInfo-label">Email*:</p>
                <input
                  required
                  defaultValue={user.email ? user.email : ""}
                  className="payment__contactInfo-input"
                  type="email"
                  placeholder="abc@gmal.com"
                />
              </div>
            </div>
            <p>
              Tôi đã hiểu và đồng ý với điều khoản sử dụng chung và chính sách
              quyền riêng tư của Guidi.
            </p>
            <div className="payment__noticed">
              Vui lòng điền thông tin chính xác. Một khi đã gửi thông tin bạn sẽ
              không thay đổi được
            </div>
            <button type="submit" className="payment__button">
              Thanh toán
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
