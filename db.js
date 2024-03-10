import mongoose from "mongoose";

const connect = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/mongo-db", {
          family: 4 
      
      });
    if (connection)
      console.log("\x1b[32m%s\x1b[0m", "Database Connected Successfully...");
  } catch (err) {
    console.log("\x1b[31m%s\x1b[0m", "Error while connecting database\n");
    console.log(err);
  }
};

export { connect };
