const ApiError = require("../errors/api.errors");
const ProductService = require("../services/product.service");
const uuid = require("uuid");
const path = require("path");

class ProductController {
  async addProduct(req, res, next) {
    try {
      const images = req.files;
      const bufferFormatImages = [];
        for (let i = 0; i < images.files.length; i++) {
          const fileName = uuid.v4() +'.'+ images.files[i].name.split('.')[1];
          images.files[i].mv(path.resolve(__dirname,'..','..','static',fileName));
          bufferFormatImages.push(fileName);
        }
        const data = req.body;
      
       const product = await ProductService.createProduct({images:bufferFormatImages,data:data});
        
      return res.json(product);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async takeAllProducts(req, res) {
    try {
      const {
        category,
        subcategory,
        price,
        characteristicName_id,
        purpose_id,
        limit,
        page,
      } = req.query;
      const products = await ProductService.getProducts({
        category,
        subcategory,
        price,
        characteristicName_id,
        purpose_id,
        limit,
        page,
      });
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async takeById(req, res) {
    try {
      const {id} = req.params;
      const product = await ProductService.getProductById(id);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  async updateComunicationByProductId(req,res){
    try {
     
      const responce = await ProductService.updateComunicationByProductId({...req.body});
      return res.status(200).json(responce);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error).message;
    }
  }

  async addToFavorite(req,res){
    try {
      const results = await ProductService.addToFavorite(req.body);
      res.status(200).json(results);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error)
    }
  }

  async removeFromFavorite(req,res){
    try {
      
      const list = await ProductService.removeFromFavorite(req.body);
      res.status(200).json(list);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getFavorList(req,res){
    try {
      console.log(req.params);
      const results = await ProductService.getFavorList(req.params);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async addComments(req,res){
    try {
      const results = await ProductService.addComments(req.body);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  async getComments(req,res){
    try {
      const results = await ProductService.getComments(req.params);
      return res.status(200).json(results);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  }
 
}

module.exports = new ProductController();
