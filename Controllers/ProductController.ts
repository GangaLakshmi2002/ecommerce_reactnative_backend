import {Request, Response} from 'express';
import {ProductParams} from '../dto/Product';
import {PRODUCTS} from '../Models/ProductModel';

export const createProduct = async (req: Request, res: Response) => {
  const {name, description, price, oldPrice, quantity, isFeatured, inStock, category} = <ProductParams>req.body;
  const files = req.files as [Express.Multer.File];
  const path = 'http://localhost:9000/assets/'
  const images = files.map((files: Express.Multer.File) => path+files.filename)

  const product = new PRODUCTS({
    name: name,
    images: images,
    description,
    price,
    oldPrice,
    category,
    quantity,
    inStock,
    isFeatured
  });
   try {
    await product.save();
    res.status(200).json('product created successfully');
   } catch (error) {
    res.status(500).json(`Failed to create product ${error}`)
   }

}

export const getProductByCatId = async(req: Request, res: Response) => {
  // console.log(req.params.catId);
  try {
    const result = await PRODUCTS.find({category: req.params.catId});
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(`fetching productByCatId failed ${error}`)
  }
}

export const getAllProducts = async(req: Request, res: Response) => {
  try {
    const products = await PRODUCTS.find().sort({createdAt: -1});
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(`fetching productByCatId failed ${error}`)
  }
}
export const getProduct = async(req: Request, res: Response) => {
  // console.log(req.params.id);
  try {
    const result = await PRODUCTS.findById(req.params.id);
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(`fetching productById failed ${error}`)
  }
}

export const getFeaturedProducts = async(req: Request, res: Response) => {
  try {
    const featuredProducts = await PRODUCTS.find({isFeatured: true});
    const result = featuredProducts;
    res.status(200).json({result})
  } catch (error) {
    res.status(500).json(`products not found ${error}`)
  }
}


export const getTrendingProducts = async(req: Request, res: Response) => {
  try {
    const result = await PRODUCTS.find({isFeatured: true}).limit(8).sort({createdAt: -1});
    // const Products = results;
    res.status(200).json({result})
  } catch (error) {
    res.status(500).json(`products not found ${error}`)
  }
}

export const getWelcomeProducts = async(req: Request, res: Response) => {
  try {
    const result = await PRODUCTS.find({price: {$eq: 300}}).limit(6);
    // const Products = results;
    res.status(200).json({result})
  } catch (error) {
    res.status(500).json(`products not found ${error}`)
  }
}
