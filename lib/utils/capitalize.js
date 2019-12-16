module.exports = function capitalize(s) {
  if (typeof s === "string") {
    return s.charAt(0).toUpperCase() + s.slice(1);
  } else {
    return "";
  }
};
