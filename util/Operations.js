import { getSession } from "next-auth/client";
import { Models } from "./mongo";
const slugify = require("slugify");

export const getSlug = (displayName) => {
  if (!displayName) {
    throw new Error("slug source cannot be null");
  }
  return slugify(displayName, {
    replacement: "-",
    // remove?: RegExp;
    lower: true,
    strict: true,
    locale: "en-US",
  });
};

var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

export const getErrorHandler = ({ res }) => {
  return async (err) => {
    res.status(500).json({
      isError: true,
      message: err.message,
    });
  };
};

export const getID = (v) => {
  return ObjectId(v);
};

export const checkAdmin = async ({}) => {
  let session = await getSession();
  return session?.user?.isAdmin;
};

export const getModel = async (name) => {
  let Model = Models[name];
  if (!Model) {
    return Promise.reject(new Error("model name not found " + name));
  } else {
    return Promise.resolve(Model);
  }
};

export const run = async (onRun = () => {}, onErr = () => {}) => {
  try {
    await onRun();
  } catch (e) {
    // console.log(e);
    await onErr(e);
  }
};

export const query = async ({ name, query, perPage = 25, pageAt = 0 }) => {
  let Model = await getModel(name);
  let all = await Model.find(query)
    .sort("-created_at")
    .skip(perPage * pageAt)
    .limit(perPage);
  return all;
};

export const create = async ({ name, data }) => {
  let Model = await getModel(name);
  let created = new Model(data);
  let item = await created.save();
  return item;
};

export const deleteOneByID = async ({ name, _id }) => {
  let Model = await getModel(name);
  let result = await Model.findOneAndDelete({
    _id: ObjectId(_id),
  });
  return result;
};

export const deleteManyAdmin = async ({ name, query }) => {
  let Model = await getModel(name);
  let result = await Model.deleteMany(query);
  return result;
};

export const updateOne = async ({ name, _id, updates }) => {
  let Model = await getModel(name);
  let result = await Model.updateOne({ _id }, updates);
  return result;
};
