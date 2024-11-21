const isValidSort = (item) => {
  return ["ASC", "DESC", "asc", "desc"].includes(item);
};

module.exports = isValidSort;
