import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const SearchHotel = ({ formik, location }) => {
  const rating = [
    { name: "5 sao", value: 5 },
    { name: "4 sao", value: 4 },
    { name: "3 sao", value: 3 },
    { name: "2 sao", value: 2 },
    { name: "1 sao", value: 1 },
    { name: "Tất cả", value: "" },
  ];
  const roomType = [
    { name: "Phòng tiêu chuẩn", value: "Standard" },
    { name: "Phòng hạng sang", value: "Deluxe" },
    { name: "Tiêu chuẩn", value: "" },
  ];

  return (
    <>
      <form action="" onSubmit={formik.handleSubmit}>
        <label className="content__search-label" htmlFor="location">
          Điểm đến:
        </label>
        <Autocomplete
          disablePortal
          id="location"
          name="location"
          options={location}
          getOptionLabel={(option) => option.name}
          sx={{
            width: "100%",
            "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
              fontSize: "15px",
              paddingY: "10px",
            },
          }}
          defaultValue={formik.values.location}
          onChange={(e, value) => {
            formik.setFieldValue(
              "location",
              value !== null ? value : formik.initialValues.location
            );
          }}
          renderInput={(params) => (
            <TextField className="content__search-input-location" {...params} />
          )}
        />
        <label className="content__search-label" htmlFor="location">
          Xếp hạng:
        </label>
        <Autocomplete
          disablePortal
          id="rating"
          name="rating"
          options={rating}
          getOptionLabel={(option) => option.name}
          sx={{
            width: "100%",
            "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
              fontSize: "15px",
              paddingY: "15px",
            },
          }}
          defaultValue={formik.values.rating}
          onChange={(e, value) => {
            formik.setFieldValue(
              "rating",
              value !== null ? value : formik.initialValues.rating
            );
          }}
          renderInput={(params) => (
            <TextField className="content__search-input-location" {...params} />
          )}
        />
        <label className="content__search-label" htmlFor="location">
          Loại phòng:
        </label>
        <Autocomplete
          disablePortal
          id="roomType"
          name="roomType"
          options={roomType}
          getOptionLabel={(option) => option.name}
          sx={{
            width: "100%",
            "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
              fontSize: "15px",
              paddingY: "15px",
            },
          }}
          defaultValue={formik.values.roomType}
          onChange={(e, value) => {
            formik.setFieldValue(
              "roomType",
              value !== null ? value : formik.initialValues.roomType
            );
          }}
          renderInput={(params) => (
            <TextField className="content__search-input-location" {...params} />
          )}
        />

        <div className="content__search-price">
          <label htmlFor="minPrice" className="content__search-label">
            Giá thấp nhất:
          </label>
          <input
            value={formik.values.minPrice}
            onChange={formik.handleChange}
            placeholder="(VNĐ)"
            type="number"
            name="minPrice"
            className="content__search-label-price"
          />
        </div>
        <div className="content__search-price">
          <label htmlFor="maxPrice" className="content__search-label">
            Giá cao nhất:
          </label>
          <input
            value={formik.values.maxPrice}
            onChange={formik.handleChange}
            placeholder="(VNĐ)"
            type="number"
            name="maxPrice"
            className="content__search-label-price"
          />
        </div>
        <button className="content__search-button" type="submit">
          Tìm kiếm
        </button>
      </form>
    </>
  );
};

export default SearchHotel;
