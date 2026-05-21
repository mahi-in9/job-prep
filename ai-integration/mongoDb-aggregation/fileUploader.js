const { useOptimistic } = require("react");
const xlsx = require("xlsx");

const uploadExcel = async (req, res) => {
  try {
    const book = xlsx.readFile(req.file.path);
    const sheetName = book.SheetNames[0];
    const sheet = book.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    res.status(200).json({ data: jsonData });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = uploadExcel;
