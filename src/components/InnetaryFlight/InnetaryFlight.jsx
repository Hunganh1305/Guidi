import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import Arrow from "../../assets/Arrow.png";
import "./InnetaryFlight.scss";
import { format } from "date-fns";
import { updateInnetary } from "../../feature/innetarySlice";
import { useDispatch } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InnetaryFlight = ({ item, planInfo, setPlanInfo, setLoading }) => {
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const { open, vertical, horizontal } = openSnackbar;

  const handleCloseSnackbar = () => {
    setOpenSnackbar({ ...openSnackbar, open: false });
  };

  const handleDelete = () => {
    setLoading(true);
    fetch(
      `https://guidiapi.azurewebsites.net/api/Itinerary/${planInfo.id}/Flight`,
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
        <button onClick={handleDelete} className="flight__item-content-button">
          Xóa
        </button>
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
          Đã xóa thành công
        </Alert>
      </Snackbar>
    </div>
  );
};

export default InnetaryFlight;
