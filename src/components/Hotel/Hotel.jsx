import {
  faHotel,
  faLocationPin,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Empty from "../../assets/search-empty.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Hotel.scss";
import { updateInnetary } from "../../feature/innetarySlice";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Hotel = ({
  result,
  setOpenSnackbar,
  openSnackbar,
  planId,
  planInfo,
  setPlanInfo,
  setOpenBudgetModal,
  setLoading,
}) => {
  const dispatch = useDispatch();

  const [openWarningSnackbar, setOpenWarningSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const { open, vertical, horizontal } = openWarningSnackbar;

  const handleCloseWarningSnackbar = () => {
    setOpenWarningSnackbar({ ...openSnackbar, open: false });
  };

  const handleClickAdd = (hotelId, price) => {
    if (price > planInfo.budget - planInfo.price) {
      setOpenBudgetModal(true);
      return;
    }
    if (planInfo.hotel) {
      setOpenWarningSnackbar({ ...openSnackbar, open: true });
      return;
    }
    setLoading(true);
    fetch(
      `https://guidiapi.azurewebsites.net/api/Itinerary/${planId}/Hotel/${hotelId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        fetch(`https://guidiapi.azurewebsites.net/api/Itinerary/${planInfo.id}`)
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            setPlanInfo(response.result);
            let itenary = JSON.parse(localStorage.getItem("itenary"));
            itenary = { ...itenary, price: response.result.price };
            localStorage.setItem("itenary", JSON.stringify(itenary));
            const action = updateInnetary();
            dispatch(action);
            setLoading(false);
            setOpenSnackbar({ ...openSnackbar, open: true });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="hotel__container">
      {result.length === 0 ? (
        <div className="search__result-empty">
          <img src={Empty} alt="" />
          <h1>Không tìm thấy kết quả nào</h1>
        </div>
      ) : (
        result.map((item) => (
          <div key={item.id} className="hotel__item">
            <div className="hotel__item-header">
              <FontAwesomeIcon icon={faHotel} />
            </div>
            <div className="hotel__item-content">
              <img
                className="hotel__item-content-img"
                src={`https://drive.google.com/uc?export=view&id=${item.image}`}
                alt=""
              />

              <div className="hotel__item-content-info">
                <div className="hotel__item-content-info-header">
                  <h3 className="hotel__item-content-info-header-name">
                    {item.hotelName}
                  </h3>
                  <div className="hotel__item-content-info-header-star">
                    {Math.round(item.rating) === 1 && (
                      <FontAwesomeIcon icon={faStar} />
                    )}
                    {Math.round(item.rating) === 2 && (
                      <>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                      </>
                    )}
                    {Math.round(item.rating) === 3 && (
                      <>
                        {" "}
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                      </>
                    )}
                    {Math.round(item.rating) === 4 && (
                      <>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                      </>
                    )}
                    {Math.round(item.rating) === 5 && (
                      <>
                        {" "}
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                      </>
                    )}
                  </div>
                </div>
                <div className="hotel__item-content-info-location">
                  <FontAwesomeIcon icon={faLocationPin} />
                  <h6 className="hotel__item-content-info-location-address">
                    {item.address}
                  </h6>
                </div>
                <p className="hotel__item-content-info-desc">
                  Nằm ở trung tâm thành phố {item.locationName},{item.hotelName}{" "}
                  có phòng nghỉ gắn máy điều hòa, nhà hàng, WiFi miễn phí và
                  quầy bar. Khách sạn {Math.round(item.rating)} sao này cung cấp
                  dịch vụ phòng và dịch vụ trợ giúp đặc biệt
                  {/* {item.description} */}
                </p>

                <div className="hotel__item-content-info-bottom">
                  <div className="hotel__item-content-info-bottom-room">
                    <h3 className="hotel__item-content-info-bottom-room-name">
                      {item.roomType === "Deluxe" && "Phòng hạng sang"}
                      {item.roomType === "Standard" && "Phòng tiêu chuẩn"}
                    </h3>
                    <h3 className="hotel__item-content-info-bottom-room-type">
                      {item.roomName}
                    </h3>
                  </div>
                  <div className="hotel__item-content-info-bottom-feature">
                    <h3 className="hotel__item-content-info-bottom-feature-price">
                      {item.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </h3>
                    <button
                      onClick={() => handleClickAdd(item.id, item.price)}
                      className="hotel__item-content-info-bottom-feature-button"
                    >
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleCloseWarningSnackbar}
      >
        <Alert
          onClose={handleCloseWarningSnackbar}
          severity="error"
          sx={{
            width: "100%",
            fontSize: "15px",
            alignItem: "center",
          }}
        >
          Chỉ được phép có 1 khách sạn mỗi chuyến đi
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Hotel;
