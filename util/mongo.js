const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.DATABASE_URL, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let Schema = mongoose.Schema;
module.exports.SchemaExport = module.exports.SchemaExport || {};
module.exports.Models = module.exports.Models || {};
let SchemaExport = module.exports.SchemaExport;

let register = (name = "collectionName", def = {}) => {
  SchemaExport[name] = new Schema(def, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  });

  module.exports.Models[name] =
    mongoose.models[name] || mongoose.model(name, SchemaExport[name]);
};

register("projects", {
  //
  userID: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },

  published: {
    type: Boolean,
    default: true,
  },
  //
  displayName: {
    type: String,
    default: "My New Project",
    index: true,
  },

  //
  slug: {
    type: String,
    unique: true,
    index: true,
  },
});
