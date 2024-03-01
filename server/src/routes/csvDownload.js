const { Router } = require("express");
const User = require("../models/User.model");
const papParse = require("papaparse")
const xlsx = require('xlsx');


const downloadCsvRoute = Router();

downloadCsvRoute.get("", async (req, res) => {
  try {
    const userList = await User.find();
    const ws = xlsx.utils.json_to_sheet(userList);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Users');

    const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", 'attachment; filename="users.xlsx"');

    res.send(buffer);
  } catch (error) {
    console.error("Error downloading XLSX file:", error);
    res.status(500).send("Error downloading XLSX file");
  }
});

module.exports = downloadCsvRoute
