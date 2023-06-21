import React, { useState } from "react";
import "./ModalEditBudget.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { updateInnetary } from "../../feature/innetarySlice";
import { useDispatch } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

const ModalEditBudget = ({
  budget,
  handleClose,
  setPlanInfo,
  planInfo,
  openBudgetSnackbar,
  setOpenBudgetSnackbar,
}) => {
  const [newBudget, setNewBudget] = useState(budget);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleSave = () => {
    // if (newBudget <= budget) {
    //   setError(true);
    //   return;
    // }
    console.log("abc");
    fetch(`https://guidiapi.azurewebsites.net/api/Itinerary`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: planInfo.id,
        budget: newBudget,
        title: planInfo.title,
        startDate: planInfo.startDate,
        endDate: planInfo.endDate,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        fetch(`https://guidiapi.azurewebsites.net/api/Itinerary/${planInfo.id}`)
          .then((res) => res.json())
          .then((response) => {
            setPlanInfo(response.result);
            let itenary = JSON.parse(localStorage.getItem("itenary"));
            itenary = { ...itenary, budget: response.result.budget };
            localStorage.setItem("itenary", JSON.stringify(itenary));
            const action = updateInnetary();
            dispatch(action);
            setOpenBudgetSnackbar({ ...openBudgetSnackbar, open: true });
            handleClose();
            // setLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="budget__edit-container">
      <div className="budget__edit-header">
        <h2>Ngân sách của bạn không đủ</h2>
      </div>
      <h1>Cập nhật lại ngân sách của bạn</h1>
      <div className="budget__edit-inputcontrol">
        <FontAwesomeIcon
          icon={faMoneyBill}
          className="budget__edit-inputcontrol-icon"
        />
        <input
          required
          name="budget"
          defaultValue={budget}
          onChange={(e) => setNewBudget(e.target.value)}
          placeholder="Ngân sách của bạn (VNĐ)"
          type="number"
          className="budget__edit-inputcontrol-input"
        />
      </div>
      {error && (
        <p className="budget__edit-error">
          Ngân sách mới phải lớn hơn ngân sách cũ
        </p>
      )}

      <div className="budget__edit-buttons">
        <button onClick={handleClose} className="budget__edit-button">
          Đóng
        </button>
        <button onClick={handleSave} className="budget__edit-button">
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default ModalEditBudget;
