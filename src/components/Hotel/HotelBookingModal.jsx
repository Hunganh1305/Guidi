import React, { useState } from "react";
import "./HotelBookingModal.scss";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { Autocomplete, TextField } from "@mui/material";
import { updateInnetary } from "../../feature/innetarySlice";
import { useDispatch } from "react-redux";

const HotelBookingModal = ({
  hotel,
  handleClose,
  setLoading,
  setPlanInfo,
  setOpenSnackbar,
  openSnackbar,
  planInfo,
  setOpenBudgetModal,
}) => {
  const [dates, setDates] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openDate, setOpenDate] = useState(false);
  const [diffDay, setDiffDay] = useState(null);
  const dispatch = useDispatch();

  const handleBooking = () => {
    setLoading(true);
    if (selectedRoom.price * diffDay > planInfo.budget - planInfo.price) {
      setOpenBudgetModal(true);
      setLoading(false);
      return;
    }

    console.log(planInfo);
    const data = {
      itineraryId: planInfo.id,
      roomId: selectedRoom.id,
      checkInDate: format(dates[0].startDate, "yyyy-MM-dd"),
      checkOutDate: format(dates[0].endDate, "yyyy-MM-dd"),
    };

    fetch(`https://guidi.azurewebsites.net/api/Itinerary/Hotel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        fetch(`https://guidi.azurewebsites.net/api/Itinerary/${planInfo.id}`)
          .then((res) => res.json())
          .then((response) => {
            setPlanInfo(response.result);
            let itenary = JSON.parse(localStorage.getItem("itenary"));
            itenary = { ...itenary, price: response.result.price };
            localStorage.setItem("itenary", JSON.stringify(itenary));
            const action = updateInnetary();
            dispatch(action);
            setLoading(false);
            handleClose();
            setOpenSnackbar({ ...openSnackbar, open: true });
          })
          .catch((err) => console.log(err));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="hotelbooking__container">
      {" "}
      <div className="budget__edit-header">
        <h2>Đặt phòng</h2>
      </div>
      <div className="budget__edit-body">
        <div className="budget__edit-inputcontrol date-range">
          <h3 className="budget__edit-inputcontrol-label">
            Ngày đến / Ngày đi
          </h3>
          {dates[0].startDate === null ? (
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
            >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
              dates[0].endDate,
              "dd/MM/yyyy"
            )}`}</div>
          )}

          {openDate && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                const oneDay = 24 * 60 * 60 * 1000;
                const dateRange = [item.selection][0];
                const diffDays = Math.round(
                  Math.abs((dateRange.endDate - dateRange.startDate) / oneDay)
                );
                setDiffDay(diffDays);
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
        <div className="budget__edit-inputcontrol">
          <h3 className="budget__edit-inputcontrol-label">Tên phòng</h3>
          <Autocomplete
            disablePortal
            id="room"
            name="room"
            options={hotel.hotelRooms}
            getOptionLabel={(option) => option.roomName}
            sx={{
              width: "350px",
              borderRadius: "10px",
              "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
                fontSize: "15px",

                paddingY: "10px",
              },
              "& + .MuiAutocomplete-input ": {
                fontSize: "25px",

                paddingY: "10px",
              },
            }}
            // defaultValue={formik.values.location}
            onChange={(e, value) => {
              setSelectedRoom(value);
            }}
            renderInput={(params) => (
              <TextField
                className="content__search-input-location"
                {...params}
                placeholder="Select room"
              />
            )}
          />
        </div>
        {selectedRoom && (
          <>
            {" "}
            <div className="budget__edit-inputcontrol">
              <h3 className="budget__edit-inputcontrol-label">Loại phòng</h3>
              <div className="budget__edit-inputcontrol-desc">
                <p>{selectedRoom.roomType}</p>
              </div>
            </div>
            <div className="budget__edit-inputcontrol">
              <h3 className="budget__edit-inputcontrol-label">Giá / 1 đêm</h3>
              <div className="budget__edit-inputcontrol-desc">
                <p>
                  {selectedRoom.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
            </div>
            <div className="budget__edit-inputcontrol">
              <h3 className="budget__edit-inputcontrol-label">Mô tả</h3>
              <div className="budget__edit-inputcontrol-desc">
                <p>{selectedRoom.description}</p>
              </div>
            </div>
          </>
        )}
        {selectedRoom && dates[0].startDate && (
          <div className="budget__edit-inputcontrol">
            <h3 className="budget__edit-inputcontrol-label">Tổng tiền</h3>
            <div className="budget__edit-inputcontrol-desc">
              <p>
                {(selectedRoom.price * diffDay).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="budget__edit-buttons">
        <button onClick={handleClose} className="budget__edit-button">
          Đóng
        </button>
        <button onClick={handleBooking} className="budget__edit-button">
          Đặt phòng
        </button>
      </div>
    </div>
  );
};

export default HotelBookingModal;
