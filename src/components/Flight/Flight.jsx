import {
  faCircle,
  faCirclePlus,
  faPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Flight.scss";
import Arrow from "../../assets/Arrow.png";
import { format } from "date-fns";
import Empty from "../../assets/search-empty.png";
import { useDispatch } from "react-redux";
import { updateInnetary } from "../../feature/innetarySlice";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Flight = ({
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
    setOpenWarningSnackbar({ ...openWarningSnackbar, open: false });
  };

  const handleClickAdd = (flightId, price) => {
    if (price > planInfo.budget - planInfo.price) {
      setOpenBudgetModal(true);
      return;
    }
    if (planInfo.flight) {
      setOpenWarningSnackbar({ ...openWarningSnackbar, open: true });
      return;
    }
    setLoading(true);
    fetch(
      `https://guidiapi.azurewebsites.net/api/Itinerary/${planId}/Flight/${flightId}`,
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
    <div className="fligth__container">
      {result.length === 0 ? (
        <div className="search__result-empty">
          <img src={Empty} alt="" />
          <h1>Không tìm thấy kết quả nào</h1>
        </div>
      ) : (
        result.map((item) => (
          <div key={item.id} className="flight__item">
            <div className="flight__item-header">
              <FontAwesomeIcon icon={faPlane} />
              <h3 className="flight__item-header-date">
                {format(new Date(item.date), "dd/MM/yyyy")}
              </h3>
              <h3 className="flight__item-header-seat">
                {item.numberOfSeats} chỗ ngồi
              </h3>
            </div>
            <div className="flight__item-content">
              <div className="flight__item-content-brand">{item.brandName}</div>
              <div className="flight__item-content-departure">
                <h3 className="flight__item-content-departure-time">
                  {item.startTime.slice(0, -3)}
                </h3>
                <h3 className="flight__item-content-departure-location">
                  {item.destinationFromName}
                </h3>
              </div>
              <img className="flight__item-content-img" src={Arrow} alt="" />
              <div className="flight__item-content-departure">
                <h3 className="flight__item-content-departure-time">
                  {item.endTime.slice(0, -3)}
                </h3>
                <h3 className="flight__item-content-departure-location">
                  {item.destinationToName}
                </h3>
              </div>
              <h3 className="flight__item-content-price">
                {item.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </h3>
              <button
                onClick={() => handleClickAdd(item.id, item.price)}
                className="flight__item-content-button"
              >
                Thêm
              </button>
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
          Chỉ được phép có 1 chuyến bay mỗi chuyến đi
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Flight;
