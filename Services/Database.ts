import mongoose from 'mongoose';
import {MONGO_URI} from '../config';

export const  Dbcon =  async () => {
  try {
    console.log(MONGO_URI);
    await mongoose.connect(MONGO_URI)
    .then(() => console.log("mongodb connected"))
  } catch (error) {
    console.log("-------------------------",error);
    process.exit(1);
  }
}
