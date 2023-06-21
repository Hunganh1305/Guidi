import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./TravelPlanner.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HaNoi from "../../assets/HaNoi.png";
import DaNang from "../../assets/DaNang.png";
import PhuQuoc from "../../assets/PhuQuoc.png";
import HoiAn from "../../assets/HoiAn.png";
import {
  faCalendarDays,
  faLocation,
  faLocationPin,
  faMoneyBill,
  faPen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { useFormik } from "formik";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addInnetary } from "../../feature/innetarySlice";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const TravelPlanner = () => {
  const [dates, setDates] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errDate, setErrDate] = useState("");
  const [errBudget, setErrBudget] = useState("");

  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      location: "",
      dates: {
        startDate: null,
        endDate: null,
        key: "selection",
      },
      name: "",
      budget: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setErrBudget("");
      setErrDate("");
      if (user == null) {
        setOpenDialog(true);
        return;
      }

      if (values.budget < 2000000 || values.dates.startDate == null) {
        if (values.budget < 2000000) {
          setErrBudget("Bạn nên có ngân sách tối thiểu 2.000.000 đồng");
        }
        if (values.dates.startDate == null) {
          setErrDate("Vui lòng nhập ngày đến và ngày đi");
        }
        return;
      }

      // values.dates = values.dates.selection;

      const data = {
        title: values.name,
        destinationId: values.location.id,
        startDate: format(values.dates.startDate, "yyyy-MM-dd"),
        endDate: format(values.dates.endDate, "yyyy-MM-dd"),
        budget: values.budget,
      };

      setLoading(true);
      fetch("https://guidiapi.azurewebsites.net/api/Itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          userId: user.id,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((response) => {
          const itenary = {
            budget: values.budget,
            destinationId: response.result.destinationId,
            destinationName: values.location.name,
            title: response.result.title,
            startDate: response.result.startDate,
            endDate: response.result.endDate,
            id: response.result.id,
            price: 0,
          };
          const action = addInnetary(itenary);
          dispatch(action);
          localStorage.setItem("itenary", JSON.stringify(itenary));
          setLoading(false);
          navigate(`/planner/plan`);
        })
        .catch((err) => console.log(err));
    },
  });

  const [location, setLocation] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://guidiapi.azurewebsites.net/api/Location")
      .then((res) => res.json())
      .then((data) => {
        setLocation(data.result);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const [openDate, setOpenDate] = useState(false);
  return (
    <>
      <div className="travelplanner__container">
        <h1 className="travelplanner__container-title">
          Lên kế hoạch cho chuyến đi của bạn
        </h1>
        <form
          onSubmit={formik.handleSubmit}
          action=""
          className="travelplanner__container-form"
        >
          <div className="travelplanner__container-form-inputcontrol">
            <FontAwesomeIcon
              icon={faPen}
              className="travelplanner__container-form-inputcontrol-icon"
            />
            <input
              required
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Đặt tên cho chuyến đi của bạn"
              type="text"
              className="travelplanner__container-form-inputcontrol-input"
            />
          </div>
          <div className="travelplanner__container-form-inputcontrol">
            <FontAwesomeIcon
              icon={faLocationPin}
              className="travelplanner__container-form-inputcontrol-icon"
            />
            <Autocomplete
              disablePortal
              id="location"
              name="location"
              options={location}
              getOptionLabel={(option) => option.name}
              sx={{
                width: "450px",
                outline: "none",
                "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
                  fontSize: "15px",
                  paddingY: "10px",
                },
              }}
              // defaultValue={formik.values.location}
              onChange={(e, value) => {
                formik.setFieldValue(
                  "location",
                  value !== null ? value : formik.initialValues.location
                );
              }}
              renderInput={(params) => (
                <TextField
                  required
                  className=""
                  {...params}
                  sx={{ border: "none" }}
                  placeholder="Nhập nơi bạn muốn đến"
                />
              )}
            />
          </div>
          <div className="travelplanner__container-form-inputcontrol date-range">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="travelplanner__container-form-inputcontrol-icon"
            />
            {formik.values.dates.startDate === null ? (
              <div
                onClick={() => setOpenDate(!openDate)}
                className={`travelplanner__container-form-inputcontrol-text ${
                  openDate ? "blue-outline" : ""
                }`}
                style={{ color: "#aeaeae" }}
              >
                Ngày đi / Ngày đến
              </div>
            ) : (
              <div
                onClick={() => setOpenDate(!openDate)}
                className={`travelplanner__container-form-inputcontrol-text ${
                  openDate ? "blue-outline" : ""
                }`}
              >{`${format(
                formik.values.dates.startDate,
                "dd/MM/yyyy"
              )} to ${format(formik.values.dates.endDate, "dd/MM/yyyy")}`}</div>
            )}

            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  formik.setFieldValue(
                    "dates",
                    item !== null
                      ? [item.selection][0]
                      : formik.initialValues.dates
                  );
                  setDates([item.selection]);
                  setOpenDate(!openDate);
                }}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                minDate={new Date()}
              />
            )}
          </div>
          {errDate && (
            <p
              style={{ marginTop: "0", fontSize: "15px", marginLeft: "45px" }}
              className="auth__error"
            >
              {errDate}
            </p>
          )}

          <div className="travelplanner__container-form-inputcontrol">
            <FontAwesomeIcon
              icon={faMoneyBill}
              className="travelplanner__container-form-inputcontrol-icon"
            />
            <input
              required
              name="budget"
              value={formik.values.budget}
              onChange={formik.handleChange}
              placeholder="Ngân sách của bạn (VNĐ)"
              type="number"
              className="travelplanner__container-form-inputcontrol-input"
            />
          </div>
          {errBudget && (
            <p
              style={{ marginTop: "0", fontSize: "15px", marginLeft: "45px" }}
              className="auth__error"
            >
              {errBudget}
            </p>
          )}

          <button
            type="submit"
            className="travelplanner__container-form-button"
          >
            Bắt đầu
          </button>
        </form>
      </div>

      <div className="travelplanner__experience">
        <h1 className="travelplanner__experience-title">Trải nghiệm hấp dẫn</h1>
        <div className="travelplanner__experience-contain">
          <div className="travelplanner__experience-item">
            <img src={HaNoi} alt="" />
            <h1>Hà Nội</h1>
          </div>
          <div className="travelplanner__experience-item">
            <img src={DaNang} alt="" />
            <h1>Đà Nẵng</h1>
          </div>
          <div className="travelplanner__experience-item">
            <img src={PhuQuoc} alt="" />
            <h1>Phú Quốc</h1>
          </div>
          <div className="travelplanner__experience-item">
            <img src={HoiAn} alt="" />
            <h1>Hội An</h1>
          </div>
        </div>
      </div>

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ fontSize: "22px", fontWeight: 600 }}
          className="dialog-title"
          id="alert-dialog-title"
        >
          {"Yêu cầu đăng nhập"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            className="dialog-description"
            id="alert-dialog-description"
            sx={{ fontSize: "18px", fontWeight: 500, color: "black" }}
          >
            Bạn cần phải đăng nhập để thực hiện chức năng này
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-action">
          <Button
            className="dialog-button"
            sx={{ fontSize: "15px" }}
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            Đóng
          </Button>
          <Button
            sx={{ fontSize: "15px" }}
            className="dialog-button"
            onClick={() => {
              navigate("/login");
            }}
            autoFocus
          >
            Đăng nhập
          </Button>
        </DialogActions>
      </Dialog>
      {loading && <LoadingScreen />}
    </>
  );
};

export default TravelPlanner;
