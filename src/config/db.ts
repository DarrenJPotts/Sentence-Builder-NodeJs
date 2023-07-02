import mongoose from "mongoose";

const MONGO_URL =
  "mongodb+srv://pottsdarren:BdgRoF79oPnmp2dD@cluster0.dxxxyqq.mongodb.net/";

async function connect() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas", error);
  }
}

export default connect;
