// controllers/canteenController.js
const Item = require('../models/Item');

exports.renderShopPage = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.render('shop', { items });
  } catch (err) {
    next(err);
  }
};
