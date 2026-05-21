const express = require("express");
const csvWriter = require("csv-writer");

const createCsvWriter = csvWriter.createObjectCsvWriter;

const app = express();

app.get("/downloadCsvFromJson", async (req, res) => {
  const dataArray = [
    { id: "1", name: "BOB" },
    { id: "2", name: "JACK" },
  ];

  const path = "samle.csv";

  const csvWriter = createCsvWriter({
    path: path,
    header: [
      { id: "id", title: "ID" },
      { id: "name", title: "TITLE" },
    ],
  });
  try {
    csvWriter.writeRecords(dataArray).then(() => {
      res.download(path);
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("app is running on port", 3000);
});
