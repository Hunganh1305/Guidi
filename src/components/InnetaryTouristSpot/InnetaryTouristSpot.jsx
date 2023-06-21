import {
  faBookOpen,
  faList,
  faLocationPin,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./InnetaryTouristSpot.scss";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { format } from "date-fns";
import MuiAlert from "@mui/material/Alert";
import { updateInnetary } from "../../feature/innetarySlice";
import { useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import dayjs from "dayjs";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InnetaryTouristSpot = ({
  setPlanInfo,
  planInfo,
  item,
  plannedSpot,
  setLoading,
}) => {
  const [date, setDate] = useState(
    plannedSpot.date ? dayjs(plannedSpot.date).$d : null
  );
  const [startTime, setStartTime] = useState(
    plannedSpot.date && plannedSpot.startTime
      ? dayjs(
          format(dayjs(plannedSpot.date).$d, "yyyy-MM-dd").concat(
            plannedSpot.startTime
          )
        ).$d
      : null
  );
  const [endTime, setEndTime] = useState(
    plannedSpot.date && plannedSpot.endTime
      ? dayjs(
          format(dayjs(plannedSpot.date).$d, "yyyy-MM-dd").concat(
            plannedSpot.endTime
          )
        ).$d
      : null
  );
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar({ ...openSnackbar, open: false });
  };

  const { open, vertical, horizontal, feature } = openSnackbar;

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    error: "",
  });

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar({ ...openSnackbar, open: false });
  };

  const handleSave = () => {
    if (!date || !startTime || !endTime) {
      setOpenErrorSnackbar({
        ...openSnackbar,
        open: true,
        error: "Vui lòng nhập đầy đủ",
      });

      return;
    }

    if (format(endTime, "HH:mm:ss") < format(startTime, "HH:mm:ss")) {
      setOpenErrorSnackbar({
        ...openSnackbar,
        open: true,
        error: "Thời điểm kết thúc không thể sớm hơn thời điểm bắt đầu",
      });
      return;
    }

    const data = {
      itineraryId: planInfo.id,
      spotId: item.id,
      date: format(date, "yyyy-MM-dd"),
      startTime: format(startTime, "HH:mm:ss"),
      endTime: format(endTime, "HH:mm:ss"),
    };

    setLoading(true);

    fetch(`https://guidiapi.azurewebsites.net/api/Itinerary/TouristSpot`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        fetch(`https://guidiapi.azurewebsites.net/api/Itinerary/${planInfo.id}`)
          .then((res) => res.json())
          .then((response) => {
            setPlanInfo(response.result);
            let itenary = JSON.parse(localStorage.getItem("itenary"));
            itenary = { ...itenary };
            localStorage.setItem("itenary", JSON.stringify(itenary));
            const action = updateInnetary();
            dispatch(action);
            setLoading(false);
            setOpenSnackbar({ ...openSnackbar, open: true, feature: "lưu" });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    setLoading(true);
    fetch(
      `https://guidiapi.azurewebsites.net/api/Itinerary/${planInfo.id}/TouristSpot/${item.id}`,
      {
        method: "DELETE",
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
            setOpenSnackbar({ ...openSnackbar, open: true, feature: "xóa" });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="date-time-picker">
        <div className="date-time-picker-component">
          <h2>Ngày :</h2>
          {plannedSpot.date ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                defaultValue={dayjs(plannedSpot.date)}
                onChange={(value) => {
                  setDate(value.$d);
                }}
              />
            </LocalizationProvider>
          ) : (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(value) => {
                  setDate(value.$d);
                }}
              />
            </LocalizationProvider>
          )}
        </div>
        <div className="date-time-picker-component">
          <h2>Thời gian bắt đầu :</h2>
          {plannedSpot.date && plannedSpot.startTime ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                defaultValue={dayjs(
                  format(dayjs(plannedSpot.date).$d, "yyyy-MM-dd").concat(
                    plannedSpot.startTime
                  )
                )}
                onChange={(value) => {
                  setStartTime(value.$d);
                }}
              />
            </LocalizationProvider>
          ) : (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                onChange={(value) => {
                  setStartTime(value.$d);
                }}
              />
            </LocalizationProvider>
          )}
        </div>
        <div className="date-time-picker-component">
          <h2>Thời gian kết thúc :</h2>
          {plannedSpot.date && plannedSpot.endTime ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                defaultValue={dayjs(
                  format(dayjs(plannedSpot.date).$d, "yyyy-MM-dd").concat(
                    plannedSpot.endTime
                  )
                )}
                onChange={(value) => {
                  console.log(value);
                  setEndTime(value.$d);
                }}
              />
            </LocalizationProvider>
          ) : (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                onChange={(value) => {
                  setEndTime(value.$d);
                }}
              />
            </LocalizationProvider>
          )}
        </div>

        <button onClick={handleSave} className="date-time-picker-button">
          Lưu
        </button>
      </div>

      <div className="tourist__container">
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
            <button onClick={handleDelete} className="tourist__add-button">
              Xóa
            </button>
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
          Đã {feature} du lịch thành công
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorSnackbar.open}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: openErrorSnackbar.vertical,
          horizontal: openErrorSnackbar.horizontal,
        }}
        onClose={handleCloseErrorSnackbar}
      >
        <Alert
          onClose={handleCloseErrorSnackbar}
          severity="error"
          sx={{
            width: "100%",
            fontSize: "15px",
            alignItem: "center",
          }}
        >
          {openErrorSnackbar.error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default InnetaryTouristSpot;
