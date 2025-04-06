
import express from "express";
import multer from 'multer';
import path from "path";
import {createCategory, deleteCategory, getAllCategories, getCategory, updateCategory} from '../Controllers';


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
// .fileds() will accept both text and file fields where .array accepts files only
// const upload = multer({ storage: imageStorage });

router.post('/createCategory', images, createCategory);
// router.post('/createCategory', upload.fields([{ name: 'images' }]), createCategory);
router.get('/getSingleCategory/:id', getCategory);
router.get('/getCategories', getAllCategories);
router.put('/editCategory/:id', images, updateCategory);
router.delete('/deleteCat/:id', deleteCategory)

export {router as CategoryRoute};

