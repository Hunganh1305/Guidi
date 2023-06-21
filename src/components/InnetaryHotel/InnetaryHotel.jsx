import {
  faCalendarDays,
  faHotel,
  faLocationPin,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "./InnetaryHotel.scss";
import { updateInnetary } from "../../feature/innetarySlice";
import { useDispatch } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const InnetaryHotel = ({ item, planInfo, setPlanInfo, setLoading }) => {
  console.log(planInfo);
  const [dates, setDates] = useState([
    {
      startDate: new Date(item.checkInDate),
      endDate: new Date(item.checkOutDate),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);

  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    feature: "",
  });

  const { open, feature, vertical, horizontal } = openSnackbar;

  const handleCloseSnackbar = () => {
    setOpenSnackbar({ ...openSnackbar, open: false });
  };

  const handleDelete = () => {
    setLoading(true);
    fetch(
      `https://guidiapi.azurewebsites.net/api/Itinerary/${planInfo.id}/Hotel`,
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
            setOpenSnackbar({ ...openSnackbar, open: true, feature: "Xóa" });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="innetary__hotel-container">
      <div className="travelplanner__container-form-inputcontrol innetary__inputcontrol date-range">
        <FontAwesomeIcon
          icon={faCalendarDays}
          className="travelplanner__container-form-inputcontrol-icon"
        />
        {dates[0].startDate === null ? (
          <div
            onClick={() => setOpenDate(!openDate)}
            className={`travelplanner__container-form-inputcontrol-text ${
              openDate ? "blue-outline" : ""
            }`}
            style={{ color: "#aeaeae" }}
          >
            Check in / Check out
          </div>
        ) : (
          <div
            onClick={() => setOpenDate(!openDate)}
            className={`travelplanner__container-form-inputcontrol-text ${
              openDate ? "blue-outline" : ""
            }`}
          >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
            dates[0].endDate,
            "dd/MM/yyyy"
          )}`}</div>
        )}

        {/* {openDate && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => {
              setDates([item.selection]);
              setOpenDate(!openDate);
            }}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            className="date"
            minDate={new Date()}
          />
        )} */}
      </div>
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
              Nằm ở trung tâm thành phố {item.locationName},{item.hotelName} có
              phòng nghỉ gắn máy điều hòa, nhà hàng, WiFi miễn phí và quầy bar.
              Khách sạn {Math.round(item.rating)} sao này cung cấp dịch vụ phòng
              và dịch vụ trợ giúp đặc biệt
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
                  onClick={handleDelete}
                  className="hotel__item-content-info-bottom-feature-button"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={1000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: "100%",
            fontSize: "15px",
            alignItem: "center",
          }}
        >
          Đã {feature} thành công
        </Alert>
      </Snackbar>
    </div>
  );
};

export default InnetaryHotel;
