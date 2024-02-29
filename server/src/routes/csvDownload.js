const { Router } = require("express");
const User = require("../models/User.model");
const papParse = require("papaparse")

const downloadCsvRoute = Router();

downloadCsvRoute.get("", async (req, res) => {
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="users.csv"');


  const userList = await User.find();
  const csvString = papParse.unparse(userList);

  
  const blob = new Blob([csvString], { type: 'text/csv' });


 return res.send(blob);
});


module.exports = downloadCsvRoute
