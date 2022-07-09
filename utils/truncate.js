export const truncate = (str = "", len) => {
  if (str.length > len && str.length > 0) {
    let new_str = str + " ";
    new_str = str.substr(0, len);
    new_str = str.substr(0, new_str.lastIndexOf(" "));
    new_str = new_str.length > 0 ? new_str : str.substr(0, len);
    return new_str + "...";
  }
  return str;
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  return ["all", ...new Set(unique)];
};
