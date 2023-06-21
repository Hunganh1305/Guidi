import React, { useState } from "react";
import "./Profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faPhone,
  faLocationDot,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import profileImg from "../../assets/proflieImg.png";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "../../feature/userSlice";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const SignupSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Số điện thoại không hợp lệ"
    )
    .min(9, "Số điện thoại không hợp lệ")
    .max(11, "Số điện thoại không hợp lệ")
    .required("Vui lòng không để trống"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng không để trống"),
  address: Yup.string()
    .min(5, "Địa chỉ quá ngắn")
    .required("Vui lòng không để trống"),
  fullname: Yup.string()
    .min(5, "Tên quá ngắn")
    .required("Vui lòng không để trống"),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const userInfo = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal } = openSnackbar;

  const handleCloseSnackbar = () => {
    setOpenSnackbar({ ...openSnackbar, open: false });
  };

  const formik = useFormik({
    initialValues: {
      fullname: userInfo.fullName ? userInfo.fullName : "",
      email: userInfo.email ? userInfo.email : "",
      phone: userInfo.phone ? userInfo.phone : "",
      address: userInfo.address ? userInfo.address : "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      setLoading(true);
      fetch(`https://guidiapi.azurewebsites.net/api/User/${userInfo.id}`)
        .then((res) => res.json())
        .then((response) => {
          const data = { ...values, password: response.result.password };

          fetch(
            `https://guidiapi.azurewebsites.net/api/User/Update/${userInfo.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          )
            .then((res) => res.json())
            .then((response) => {
              const result = {
                id: response.result.id,
                address: response.result.address,
                email: response.result.email,
                fullName: response.result.fullName.includes("NewGoogleUser")
                  ? null
                  : response.result.fullName,
                phone:
                  response.result.phone === "0000000000"
                    ? null
                    : response.result.phone,
              };
              const action = login(result);
              dispatch(action);
              localStorage.setItem("user", JSON.stringify(result));
              setLoading(false);
              setOpenSnackbar({ ...openSnackbar, open: true });
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    },
  });

  return (
    <>
      {!userInfo ? (
        <Navigate to="/" />
      ) : (
        <div className="profile__container">
          <Card
            sx={{ maxWidth: 500, width: "470px" }}
            className="profile_cardContent"
          >
            <CardMedia
              sx={{
                height: 200,
                width: 200,
                marginLeft: 18,
                borderRadius: 50,
                marginTop: 5,
              }}
              image={profileImg}
              title="green iguana"
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                textAlign: "center",
              }}
            >
              <Typography gutterBottom variant="h3" component="div">
                THÔNG TIN LIÊN HỆ
              </Typography>
              <Typography variant="h4" className="profile__text">
                <FontAwesomeIcon
                  icon={faUserCircle}
                  size="lg"
                  className="profile__text-icon"
                />
                <span className="profile__text-content">
                  {userInfo.fullName ? (
                    userInfo.fullName
                  ) : (
                    <p className="profile__nullinfo">
                      Người dùng chưa cập nhật tên
                    </p>
                  )}
                </span>
              </Typography>
              <Typography variant="h4" className="profile__text">
                <FontAwesomeIcon
                  icon={faPhone}
                  size="lg"
                  className="profile__text-icon"
                />
                <span className="profile__text-content">
                  {userInfo.phone ? (
                    userInfo.phone
                  ) : (
                    <p className="profile__nullinfo">
                      Người dùng chưa cập nhật số điện thoại
                    </p>
                  )}
                </span>
              </Typography>
              <Typography variant="h4" className="profile__text">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size="lg"
                  className="profile__text-icon"
                />
                <span className="profile__text-content">{userInfo.email}</span>
              </Typography>
              <Typography variant="h4" className="profile__text">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  size="lg"
                  className="profile__text-icon"
                />
                <span className="profile__text-content">
                  {userInfo.address ? (
                    userInfo.address
                  ) : (
                    <p className="profile__nullinfo">
                      Người dùng chưa cập nhật địa chỉ
                    </p>
                  )}
                </span>
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="large"
                sx={{ width: "100px" }}
                variant="outlined"
                className="profile__buttonEdit"
                onClick={handleOpenModal}
              >
                Chỉnh sửa
              </Button>
            </CardActions>
          </Card>

          <Modal
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            open={openModal}
            onClose={handleCloseModal}
          >
            <div className="profile__edit-container">
              <div className="profile__edit-header">
                <h2>Chỉnh sửa thông tin</h2>{" "}
              </div>
              <form
                className="profile__edit-form"
                onSubmit={formik.handleSubmit}
                action=""
              >
                <div className="profile__edit-form-inputcontrol">
                  <h3>Họ và tên:</h3>
                  <input
                    name="fullname"
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="right_content-input"
                    type="text"
                    placeholder="Họ và tên"
                  />
                  {formik.errors.fullname && formik.touched.fullname ? (
                    <p className="auth__error">{formik.errors.fullname}</p>
                  ) : (
                    <br />
                  )}
                </div>

                <div className="profile__edit-form-inputcontrol">
                  <h3>Số điện thoại:</h3>
                  <input
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="right_content-input"
                    type="text"
                    placeholder="Số điện thoại"
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <p className="auth__error">{formik.errors.phone}</p>
                  ) : (
                    <br />
                  )}
                </div>

                <div className="profile__edit-form-inputcontrol">
                  <h3>Địa chỉ:</h3>
                  <input
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="right_content-input"
                    type="text"
                    placeholder="Địa chỉ"
                  />
                  {formik.errors.address && formik.touched.address ? (
                    <p className="auth__error">{formik.errors.address}</p>
                  ) : (
                    <br />
                  )}
                </div>

                <button type="submit" className="profile__edit-button">
                  Chỉnh sửa
                </button>
                <br />
              </form>
            </div>
          </Modal>
          {loading && <LoadingScreen />}
          <Snackbar
            open={openSnackbar.open}
            autoHideDuration={2000}
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
              Lưu thành công
            </Alert>
          </Snackbar>
        </div>
      )}
    </>
  );
};

export default Profile;
