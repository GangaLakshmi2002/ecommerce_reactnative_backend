
import express from "express";
import multer from 'multer';
import path from "path";
import {createProduct, getAllProducts, getFeaturedProducts, getProduct, getProductByCatId, getTrendingProducts, getWelcomeProducts} from '../Controllers';


const router = express.Router();

const imageStorage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'assets')
  },
  filename: function(req, file, cb){
    cb(null, req.body.name+'-'+ Date.now() + path.extname(file.originalname))
  }

})

const images = multer({storage: imageStorage}).array('images');

router.post('/createProduct', images, createProduct);

router.get('/getProductByCatId/:catId', getProductByCatId);
router.get('/getAllProducts', getAllProducts);

router.get('/getProduct/:id', getProduct);
router.get('/featuredProducts', getFeaturedProducts);
router.get('/trendingProducts', getTrendingProducts);
router.get('/welcomeProducts', getWelcomeProducts);



// router.get('/getCategories', getAllCategories);
// router.put('/editCategory/:id', images, updateCategory);
// router.delete('/deleteCat/:id', deleteCategory)

export {router as ProductRoute};

