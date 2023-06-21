export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  return userInfo;
};

export const fetchItenary = () => {
  const userInfo =
    localStorage.getItem("itenary") !== "undefined"
      ? JSON.parse(localStorage.getItem("itenary"))
      : localStorage.clear();
  return userInfo;
};
