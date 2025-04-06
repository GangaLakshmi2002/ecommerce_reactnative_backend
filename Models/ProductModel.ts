import mongoose, {Schema} from 'mongoose';
import {ProductParams} from '../dto/Product';


const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number
  },
  oldPrice: {
    type: Number
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
    max: 700
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  instock: {
    type: Boolean,
    default: true
  }
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
    }
  },
  timestamps: true
})

const PRODUCTS = mongoose.model<ProductParams>('products', ProductSchema);
export {PRODUCTS};
