import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const SearchFlight = ({ loading, formik, location, setLoading }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchFlightBrand = () => {
      setLoading(true);
      fetch(`https://guidiapi.azurewebsites.net/api/Flight/BrandName`)
        .then((res) => res.json())
        .then((response) => {
          setBrands([...response.result, "Tất cả"]);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    fetchFlightBrand();
  }, []);

  const [openDate, setOpenDate] = useState(false);

  return (
    <>
      {" "}
      <form action="" onSubmit={formik.handleSubmit}>
        <label className="content__search-label" htmlFor="location">
          Điểm khởi hành:
        </label>
        <Autocomplete
          disablePortal
          id="locationFrom"
          name="locationFrom"
          options={[...location, { name: "Tất cả", id: 0 }]}
          getOptionLabel={(option) => option.name}
          sx={{
            width: "100%",
            "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
              fontSize: "15px",
              paddingY: "10px",
            },
          }}
          defaultValue={formik.values.locationFrom}
          onChange={(e, value) => {
            formik.setFieldValue(
              "locationFrom",
              value !== null ? value : formik.initialValues.locationFrom
            );
          }}
          renderInput={(params) => (
            <TextField className="content__search-input-location" {...params} />
          )}
        />
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
          Hãng:
        </label>
        <Autocomplete
          disablePortal
          id="brand"
          name="brand"
          options={brands}
          sx={{
            width: "100%",
            "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
              fontSize: "15px",
              paddingY: "15px",
            },
          }}
          defaultValue={formik.values.brand}
          onChange={(e, value) => {
            formik.setFieldValue(
              "brand",
              value !== null ? value : formik.initialValues.brand
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
        <div className="content__search-price">
          <label htmlFor="maxPrice" className="content__search-label">
            Số chỗ ngồi:
          </label>
          <input
            value={formik.values.number}
            onChange={formik.handleChange}
            type="number"
            name="number"
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

export default SearchFlight;
