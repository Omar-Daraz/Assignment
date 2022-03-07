import mongoose from "mongoose";

const database = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_CONNECTION_STRING}/${process.env.DATABASE_NAME}`
    );
    console.log("database connected successfully");
  } catch (err) {
    console.log(err);
  }
};

export default database;
