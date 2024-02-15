// TODO update this and define a Mongoose schema and model!

import mongoose from "mongoose";
import uuidAPIKey from "uuid-apikey";

const ClientSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidAPIKey.create().uuid },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const Client = mongoose.model("Client", ClientSchema);

export default Client;
