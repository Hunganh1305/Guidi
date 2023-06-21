import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const SearchTourist = ({ formik, location, setLoading }) => {
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    const fetchPreferencesList = () => {
      setLoading(true);
      fetch(`https://guidiapi.azurewebsites.net/api/Preference`)
        .then((res) => res.json())
        .then((response) => {
          setPreferences([...response.result]);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    fetchPreferencesList();
  }, []);
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
          Hạng mục:
        </label>
        <Autocomplete
          disablePortal
          id="preference"
          name="preference"
          options={preferences}
          getOptionLabel={(option) => option.name}
          sx={{
            width: "100%",
            "& + .MuiAutocomplete-popper .MuiAutocomplete-option": {
              fontSize: "15px",
              paddingY: "15px",
            },
          }}
          defaultValue={formik.values.preference}
          onChange={(e, value) => {
            formik.setFieldValue(
              "preference",
              value !== null ? value : formik.initialValues.preference
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

export default SearchTourist;
