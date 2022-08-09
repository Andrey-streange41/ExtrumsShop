const ApiError = require("../errors/api.errors");
const ProductService = require("../services/product.service");
const uuid = require("uuid");
const path = require("path");

class ProductController {
  async addProduct(req, res, next) {
    try {
      
      res.send(200).json({message:'ok'});

      // const { title, images, full_info, category, sub_category, price , characteristics} =
      //   req.body;
      // const { avatar } = req.files;
      // let fileName = uuid.v4() + `.png`;
      // avatar.mv(path.resolve(__dirname, "..", "..", "static", fileName));

      // if (
      //   !title ||
      //   !images ||
      //   !full_info ||
      //   !category ||
      //   !sub_category ||
      //   !price ||
      //   !avatar
      // ) {
      //   return next(
      //     ApiError.badRequest(
      //       "Product info data have invalid format, bad request !"
      //     )
      //   );
      // }

      

      // const product = await ProductService.createProduct({
      //   characteristics,
      //   title,
      //   images,
      //   full_info,
      //   category,
      //   sub_category,
      //   price,
      //   avatar: fileName,
      // });

      // res.status(200).json(product);
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
}

module.exports = new ProductController();
