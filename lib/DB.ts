import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URI!;

if (!mongodbUrl) {
  throw new Error("Mongodb uri not defined.");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    console.log("already connected to the db");
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    cached.promise = mongoose
      .connect(mongodbUrl, opts)
      .then(() => mongoose.connection);
  }
  try {
    cached.conn = await cached.promise;
    console.log("Connected to the DB");
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}
