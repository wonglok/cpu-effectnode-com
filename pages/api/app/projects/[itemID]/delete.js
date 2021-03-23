import { getSession } from "next-auth/client";

export default (req, res) => {
  if (req.method.toUpperCase() !== "POST") {
    res.status(404).json({
      err: "bad method",
    });
    return;
  }

  res.json({
    id: req.query.itemID,
    test: "del",
  });
};

// mongoose.Types.ObjectId
