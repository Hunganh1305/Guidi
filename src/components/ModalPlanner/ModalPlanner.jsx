import React, { useState } from "react";
import "./ModalPlanner.scss";
import InnetaryFlight from "../InnetaryFlight/InnetaryFlight";
import InnetaryHotel from "../InnetaryHotel/InnetaryHotel";
import Empty from "../../assets/search-empty.png";
import { useNavigate } from "react-router";
import InnetaryService from "../InnetaryService/InnetaryService";
import InnetaryTouristSpot from "../InnetaryTouristSpot/InnetaryTouristSpot";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const ModalPlanner = ({ handleClose, planInfo, setPlanInfo }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  return (
    <div className="innetay__container">
      <h1 className="innetary__name">{planInfo.title}</h1>

      <h3 className="innetary__title">Chuyến bay</h3>
      {!planInfo.flight ? (
        <div className="search-empty">
          <img src={Empty} alt="" />
        </div>
      ) : (
        <InnetaryFlight
          setLoading={setLoading}
          setPlanInfo={setPlanInfo}
          planInfo={planInfo}
          item={planInfo.flight}
        />
      )}

      <h3 className="innetary__title">Khách sạn</h3>
      {!planInfo.hotel ? (
        <div className="search-empty">
          <img src={Empty} alt="" />
        </div>
      ) : (
        <InnetaryHotel
          setLoading={setLoading}
          setPlanInfo={setPlanInfo}
          planInfo={planInfo}
          item={planInfo.hotel}
        />
      )}

      <h3 className="innetary__title">Dịch vụ</h3>
      {planInfo.plannedServices.length === 0 ? (
        <div className="search-empty">
          <img src={Empty} alt="" />
        </div>
      ) : (
        planInfo.plannedServices.map((item) => (
          <InnetaryService
            setLoading={setLoading}
            setPlanInfo={setPlanInfo}
            planInfo={planInfo}
            item={item.service}
            plannedService={item}
          />
        ))
      )}

      <h3 className="innetary__title">Địa điểm du lịch</h3>
      {planInfo.plannedSpots.length === 0 ? (
        <div className="search-empty">
          <img src={Empty} alt="" />
        </div>
      ) : (
        planInfo.plannedSpots.map((item) => (
          <InnetaryTouristSpot
            setLoading={setLoading}
            setPlanInfo={setPlanInfo}
            planInfo={planInfo}
            item={item.spot}
            plannedSpot={item}
          />
        ))
      )}
      <div className="innetary__buttons">
        <button onClick={handleClose} className="innetary__button">
          Đóng
        </button>
        <button
          onClick={() => {
            navigate("/payment");
          }}
          className="innetary__button"
        >
          Thanh toán
        </button>
      </div>
      {loading && <LoadingScreen />}
    </div>
  );
};

export default ModalPlanner;
