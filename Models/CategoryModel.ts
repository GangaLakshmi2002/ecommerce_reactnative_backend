import mongoose, {Schema} from 'mongoose';
import {CategoryObj} from './../dto/Categories';

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  images: {
    type: [String]
  }
},{
  toJSON: {
    transform(doc, ret){
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
    }
  },
  timestamps: true
}
)



const CATEGORIES = mongoose.model<CategoryObj>("category", CategorySchema)
export {CATEGORIES};

