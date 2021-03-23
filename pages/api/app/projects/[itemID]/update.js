import { getSession } from "next-auth/client";
import mongoose from "mongoose";
let {
  Types: { ObjectId },
} = mongoose;

console.log(ObjectId());

let id = ObjectId();

console.log(ObjectId(id));

export default (req, res) => {
  if (req.method.toUpperCase() !== "POST") {
    res.status(404).json({
      err: "bad method",
    });
    return;
  }

  res.json({
    id: req.query.itemID,
    test: "update",
  });
};

// mongoose.Types.ObjectId
