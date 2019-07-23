var express = require('express');
 
var app = module.exports = express.Router();
 
var Offer = require('../models/offer');
 
// POST
// Create a new Offer
app.post('/offers', function (req, res) {
  if (!req.body.companyID||!req.body.voucherID||!req.body.title||!req.body.offer||!req.body.price||!req.body.promocode||!req.body.status) {
    return res.status(400).send({ "success": false, "msg": "You need to fill out all the deatils of the offer!" });
  }
 
  var newOffer = new Offer({
    companyID: req.body.companyID,
    voucherID: req.body.voucherID,
    title: req.body.title,
    offer: req.body.offer,
    price: req.body.price,
    promocode: req.body.promocode,
    status:req.body.status
  });
 
  newOffer.save(function (err) {
    if (err) {
      console.log("some error: ", err);
      return res.json({ "success": false, "msg": "Error while creating Offer", "error": err });
    }
    res.status(201).send({ "success": true, "msg": 'Successful created new Offer.' });
  });
});
 
// GET
// Get all open Offers
app.get('/offers', function (req, res) {
  Offer.find({}, function (err, offers) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while creating Offer", "error": err });
    }
 
    res.status(200).send({ "success": true, "result": offers });
  });
});
 
// DELETE
// Remove one Offer by its ID
app.delete('/offers/:offerId', function (req, res) {
  var lectionId = req.params.offerId;
  if (!lectionId || lectionId === "") {
    return res.json({ "success": false, "msg": "You need to send the ID of the Offer", "error": err });
  }
 
  Offer.findByIdAndRemove(lectionId, function (err, removed) {
    if (err) {
      return res.json({ "success": false, "msg": "Error while deleting Offer", "error": err });
    }
    res.status(200).json({ "success": true, "msg": "Offer deleted" });
  });
});