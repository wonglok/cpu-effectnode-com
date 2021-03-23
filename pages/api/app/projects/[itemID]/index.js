let ModelName = require("../name");
export default (req, res) => {
  if (req.method.toUpperCase() !== "POST") {
    res.status(404).json({
      err: "bad method",
    });
    return;
  }

  // req.query.itemID

  res.json({ happy: "asdasd" });
};
