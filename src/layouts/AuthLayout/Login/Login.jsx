import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import logo from "../../../assets/logo.png";
import googleIcon from "../../../assets/Google.png";
import fbIcon from "../../../assets/Facebook.png";
import {
  auth,
  googleProvider,
  facebookProvider,
} from "../../../firebase/firebase.config";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../../feature/userSlice";
import { useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";

const Login = () => {
  const [user, setUser] = useState("");

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMessage, setErrMessage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const googleAuth = () => {
    try {
      signInWithPopup(auth, googleProvider).then((data) => {
        const {
          user: { providerData },
        } = data;
        setLoading(true);
        fetch(
          `https://guidiapi.azurewebsites.net/api/User/LoginByThirdParty?email=${providerData[0].email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
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
            navigate("/");
          })
          .catch((err) => console.log(err));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(
      `https://guidiapi.azurewebsites.net/api/User/Login?email=${email}&password=${password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === false || data.errors) {
          setErrMessage("Sai email hoặc mật khẩu");
          setLoading(false);
          return;
        } else {
          const result = {
            id: data.result.id,
            address: data.result.address,
            email: data.result.email,
            fullName: data.result.fullName,
            phone: data.result.phone,
          };
          const action = login(result);
          dispatch(action);
          localStorage.setItem("user", JSON.stringify(result));
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const facebookAuth = () => {
    signInWithPopup(auth, facebookProvider).then((data) => {
      const {
        user: { providerData },
      } = data;
      fetch(
        `https://guidiapi.azurewebsites.net/api/User/LoginByThirdParty?email=${providerData[0].email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          const result = {
            id: response.result.id,
            address: null,
            email: response.result.email,
            fullName: null,
            phone: null,
          };
          const action = login(result);
          dispatch(action);
          localStorage.setItem("user", JSON.stringify(result));
          navigate("/");
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <div className="login-content_container">
      <div className="left_content">
        <Link to="/">
          <img className="left_content-logo" src={logo} alt="" />
        </Link>
        <p>
          Tìm kiếm niềm vui và khám phá những điều mới lạ mà bạn <br />
          chưa từng được trải nghiệm
        </p>
      </div>
      <div className="right_content">
        <h1>Đăng Nhập</h1>
        {errMessage && (
          <p style={{ textAlign: "center" }} className="auth__error">
            Sai email hoặc mật khẩu
          </p>
        )}

        <div>
          <form action="">
            <input
              className="right_content-input"
              type="text"
              placeholder="Địa chỉ Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <input
              className="right_content-input"
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <button
              onSubmit={handleLogin}
              onClick={handleLogin}
              className="right_content-login-button"
            >
              Đăng nhập
            </button>
            <br />
          </form>

          <div className="right_content-account">
            <div>
              <input type="checkbox" name="rememberCheckbox" />
              <label
                htmlFor="rememberCheckbox"
                className="right_content-checkbox"
              >
                Nhớ tài khoản
              </label>
            </div>
            <a href="#" className="right_content-links">
              Quên mật khẩu?
            </a>
          </div>
          <p className="right_content-custom-dash">
            ————————————————— Hoặc —————————————————
          </p>
          <div className="right_content-button">
            <div className="button-container">
              <button onClick={googleAuth}>
                <img src={googleIcon} alt="" className="icon-img" />
                Đăng nhập với Google
              </button>
              {/* <button onClick={facebookAuth}>
                <img src={fbIcon} alt="" className="icon-img" />
                Đăng nhập với Facebook
              </button> */}
            </div>
          </div>
          <div>
            {/* <a href="/register" className="right_content-links"></a> */}
            <Link to="/register" className="right_content-links">
              —————————————— Tạo tài khoản mới ——————————————
            </Link>
            <br />
            <p className="right_content-text">
              Bằng cách đăng ký hoặc đăng nhập bạn đã hiểu và đồng ý với
              <br /> Điều khoản Sử Dụng và Chính Sách Bảo Mật cảu Guidi
            </p>
          </div>
        </div>
      </div>
      {loading && <LoadingScreen />}
    </div>
  );
};

export default Login;
