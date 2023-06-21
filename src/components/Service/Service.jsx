import React from "react";
import "./Service.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsHolding,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import Empty from "../../assets/search-empty.png";
import { useDispatch } from "react-redux";
import { updateInnetary } from "../../feature/innetarySlice";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";
import { Snackbar } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Service = ({
  result,
  setOpenSnackbar,
  openSnackbar,
  planId,
  planInfo,
  setPlanInfo,
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

  const handleClickAdd = (serviceId) => {
    const data = {
      itineraryId: planId,
      serviceId: serviceId,
    };

    setLoading(true);
    fetch(`https://guidiapi.azurewebsites.net/api/Itinerary/Service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.errorMessage) {
          setOpenWarningSnackbar({ ...openWarningSnackbar, open: true });
          setLoading(false);
          return;
        }
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
    <div className="service__container">
      {result.length === 0 ? (
        <div className="search__result-empty">
          <img src={Empty} alt="" />
          <h1>Không tìm thấy kết quả nào</h1>
        </div>
      ) : (
        result.map((item) => (
          <div className="service__item">
            <div className="service__header">
              <FontAwesomeIcon
                icon={faHandsHolding}
                size="lg"
                className="service__header-icon"
              />
            </div>
            <div className="service__body">
              <div className="service__body-left">
                <div className="service__image">
                  <img
                    width="250px"
                    src={`https://drive.google.com/uc?export=view&id=${item.image}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="service__body-right">
                <div className="service__title">
                  <h2>{item.name}</h2>

                  <h6>
                    <FontAwesomeIcon icon={faLocationPin} /> {item.address}
                  </h6>
                </div>
                <div className="service__desc">{item.description}</div>
              </div>
            </div>
            <div className="service__price">
              <h4>
                {item.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </h4>
            </div>
            <div className="service__detail-button">
              <button
                onClick={() => handleClickAdd(item.id)}
                className="service__add-button"
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
          Dịch vụ này đã có trong lịch trình rồi
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Service;
