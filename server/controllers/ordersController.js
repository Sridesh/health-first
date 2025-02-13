const { addOrder } = require("../models/ordersModel");

const addNewOrder = async (req, res) => {
  const { userId, total } = req.body;

  try {
    await addOrder(userId, total);
    res.status(200).json({ message: "Order Places Successfully" });
  } catch (error) {
    res.status(400).json({ message: "Server Error" });
  }
};

module.exports = { addNewOrder };
