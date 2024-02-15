import mongoose from "mongoose";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export function connect(URI) {
  mongoose.connect(URI, options);

  mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", () => {
    console.log("Unable to connect to MongoDB");
  });
}
