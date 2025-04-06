
import {Request, Response} from "express";
import {CATEGORIES} from '../Models/CategoryModel';
import {CategoryObj, UpdateCategory} from '../dto/Categories';


export const createCategory = async (req: Request, res: Response) => {
  const {name} = <CategoryObj>req.body;
  //  // When using upload.fields(), req.files is an object with field names as keys.
  //  const filesObj = req.files as { [fieldname: string]: Express.Multer.File[] };
  //  const files = filesObj["images"];

  const files = req.files as [Express.Multer.File];
  const path = 'http://localhost:9000/assets/'
  const images =files ? files.map((files: Express.Multer.File) => path+files.filename) : [];

  const categories = new CATEGORIES({
    name: name,
    images: images
  });

  try {
    console.log(categories)
    await categories.save();
    res.status(200).json("Category created successfully")
  } catch (error) {
    res.status(500).json(`Failed to create cateogry ${error} `)
  }
}

export const getCategory = async (req: Request, res:Response) => {
  try {
    const result = await CATEGORIES.findById(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(`Category fetch failed ${error}`)
  }
}

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await CATEGORIES.find().limit(30);
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(`Categories not found ${error}`)
  }
}

export const updateCategory = async (req: Request, res:Response): Promise<void> => {
  const {name} = <UpdateCategory>req.body;
  const files = req.files as [Express.Multer.File]

  if(files){
    const images = files.map((file: Express.Multer.File) => file.filename)
    const catUpdate = await CATEGORIES.findByIdAndUpdate(req.params.id,
      {name: name, images: images},
      {new: true}
    )
    if(!catUpdate){
      res.status(500).json({ message: "The category cannot be updated" });
      return
    }
    res.status(200).json({message: "category updated successfully"});

  }
  else{
    const catUpdate = await CATEGORIES.findByIdAndUpdate(req.params.id, {name: name},
      {new: true}

    )
    if(!catUpdate){
      res.status(500).json({ message: "The category cannot be updated" });
      return
    }
    res.status(200).json({message: "category updated successfully"});

  }
}


export const deleteCategory = async (req: Request, res:Response) => {
  try {
    const findCat = await CATEGORIES.findByIdAndDelete(req.params.id);
    res.status(200).json("category removed successfully")
  } catch (error) {
    res.status(500).json(`category delete failed ${error} `)
  }
}
