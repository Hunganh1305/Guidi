import React from "react";
import "./TouristSpot.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faLocationPin,
  faStar,
  faList,
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

const TouristSpot = ({
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

  const handleClickAdd = (spotId) => {
    const data = {
      itineraryId: planId,
      spotId: spotId,
    };

    setLoading(true);

    fetch(`https://guidiapi.azurewebsites.net/api/Itinerary/TouristSpot`, {
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
    <div className="tourist__container">
      {result.length === 0 ? (
        <div className="search__result-empty">
          <img src={Empty} alt="" />
          <h1>Không tìm thấy kết quả nào</h1>
        </div>
      ) : (
        result.map((item) => (
          <div className="tourist__item">
            <div className="tourist__header">
              <FontAwesomeIcon
                icon={faBookOpen}
                size="lg"
                className="tourist__header-icon"
              />
            </div>
            <div className="tourist__body">
              <div className="tourist__body-left">
                <div className="tourist__image">
                  <img
                    width="250px"
                    src={`https://drive.google.com/uc?export=view&id=${item.image}`}
                    alt=""
                  />
                </div>
                <div className="tourist__categories">
                  <h5>
                    <FontAwesomeIcon icon={faList} /> {item.preferenceName}
                  </h5>
                </div>
              </div>
              <div className="tourist__body-right">
                <div className="tourist__title">
                  <div className="tourist__title-info">
                    <h2>{item.name}</h2>
                    <h4>
                      {item.rating}{" "}
                      <FontAwesomeIcon
                        className="tourist__iconStar"
                        icon={faStar}
                      />
                    </h4>
                  </div>
                  <h6>
                    <FontAwesomeIcon icon={faLocationPin} /> {item.address}
                  </h6>
                </div>
                <div className="tourist__desc">{item.description}</div>
              </div>
            </div>
            <div className="tourist__price">
              <h4>
                {item.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </h4>
            </div>
            <div className="tourist__detail-button">
              <button
                onClick={() => handleClickAdd(item.id)}
                className="tourist__add-button"
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
          Địa điểm này đã có trong lịch trình rồi
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TouristSpot;
