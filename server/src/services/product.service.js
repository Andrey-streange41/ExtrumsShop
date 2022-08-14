const {
  UserInfo,
  User,
  Product,
  Comments,
  Date,
  Characteristics,
  Purpose,
  UserCommunication,
  FavoriteList,
} = require("../models/models");

class ProductService {
  async createProduct(productData) {
    try {
      const formatProduct = {};
      const images = productData.images;
      formatProduct.images = JSON.stringify(images);
      formatProduct.category = productData.data.categori;
      formatProduct.sub_category = productData.data.subCategory;
      formatProduct.title = JSON.parse(productData.data.productInfo).title;
      formatProduct.price = JSON.parse(productData.data.productInfo).price;
      formatProduct.discription = JSON.parse(
        productData.data.productInfo
      ).discription;
      formatProduct.full_info = JSON.parse(
        productData.data.productInfo
      ).discription;

      formatProduct.avatar = JSON.stringify(images[0]);
      const product = await Product.create({ ...formatProduct });
      const formatCharacteristics = JSON.parse(
        productData.data.characteristics
      ).map((el) => {
        return { ...el, productId: product.id };
      });
      const charcs = await Characteristics.bulkCreate(formatCharacteristics);
      const responce = await Characteristics.findAll({
        include: { all: true },
      });
      const formatPurpose = JSON.parse(productData.data.purpose).map((el) => {
        return { name: el, productId: product.id };
      });

      const purpose = await Purpose.bulkCreate(formatPurpose);

      const comments = await UserCommunication.bulkCreate([
        { name: "likes", amount: 0, productId: product.id, isActive: false },
        { name: "dislikes", amount: 0, productId: product.id, isActive: false },
        {
          name: "favorites",
          amount: 0,
          productId: product.id,
          isActive: false,
        },
        { name: "views", amount: 0, productId: product.id, isActive: false },
      ]);

      return responce;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
  async getProducts({
    category,
    subcategory,
    price,
    characteristicName_id,
    purpose_id,
    limit,
    page,
  }) {
    try {
      let products = [];
      page = page || 1;
      limit = limit || 9;
      const offset = limit * page - limit;

      if (!category) {
        products = await Product.findAll({
          include: [
            {
              model: Comments,
              include: [
                { model: Date },
                { model: User, include: { model: UserInfo } },
              ],
            },
            { model: UserCommunication },
            { model: Purpose,include:{model:Product}, as:"purpose" },
            { model:Characteristics, as:"characteristics"}
          ],
        });
      } else if (category && !subcategory) {
        products = await Product.findAndCountAll({
          where: { category },
          limit,
          offset,
        });
      } else if (
        category &&
        subcategory &&
        !price &&
        !characteristicName_id &&
        !purpose_id
      ) {
        products = await Product.findAndCountAll({
          where: { category, subcategory },
          limit,
          offset,
        });
      } else if (
        category &&
        subcategory &&
        price &&
        !characteristicName_id &&
        !purpose_id
      ) {
        products = await Product.findAndCountAll({
          where: { category, subcategory, price },
          limit,
          offset,
        }); //need fixing price
      } else if (
        category &&
        subcategory &&
        price &&
        characteristicName_id &&
        !purpose_id
      ) {
        products = await Product.findAndCountAll({
          where: { category, subcategory, price, characteristicName_id },
          limit,
          offset,
        });
      } else if (
        category &&
        subcategory &&
        price &&
        characteristicName_id &&
        purpose_id
      ) {
        products = await Product.findAndCountAll({
          where: {
            category,
            subcategory,
            price,
            characteristicName_id,
            purpose_id,
          },
          limit,
          offset,
        });
      } else if (
        category &&
        subcategory &&
        characteristicName_id &&
        !price &&
        !purpose_id
      ) {
        products = await Product.findAndCountAll({
          where: { category, subcategory, characteristicName_id },
          limit,
          offset,
        });
      } else if (
        category &&
        subcategory &&
        purpose_id &&
        !price &&
        !characteristicName_id
      ) {
        products = await Product.findAndCountAll({
          where: { category, subcategory, purpose_id },
          limit,
          offset,
        });
      }
      return products;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
  async getProductById(id) {
    try {
      const product = await Product.findOne({
        where: { id },
        include: [{ model: Characteristics, as: "characteristics" }],
      });
      return product;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
  async updateComunicationByProductId({ name, id }) {
    try {
      const record = await UserCommunication.findOne({
        where: { productId: id, name: name },
      });
      if (name === "views") {
        await UserCommunication.update(
          { amount: record.amount + 1 },
          { where: { productId: id, name: "views" } }
        );
        const data = await Product.findAll({ include: { all: true } });
        return data;
      }

      const operation = record.isActive ? record.amount - 1 : record.amount + 1;

      if (name === "dislikes") {
        const like = await UserCommunication.findOne({
          where: { productId: id, name: "likes" },
        });
        if (like.isActive) {
          const likeOp = like.amount - 1;
          await UserCommunication.update(
            { amount: likeOp, isActive: false },
            { where: { productId: id, name: "likes" } }
          );
        }
      } else if (name === "likes") {
        const dislike = await UserCommunication.findOne({
          where: { productId: id, name: "dislikes" },
        });
        if (dislike.isActive) {
          const dislikeOp = dislike.amount - 1;
          await UserCommunication.update(
            { amount: dislikeOp, isActive: false },
            { where: { productId: id, name: "dislikes" } }
          );
        }
      } else if (name === "favorites") {
        const favor = await UserCommunication.findOne({
          where: { productId: id, name: "favorites" },
        });
        if (favor.isActive) {
          const fav = favor.amount - 1;
          await UserCommunication.update(
            { amount: fav, isActive: false },
            { where: { productId: id, name: "favorites" } }
          );
        }
      }
      await UserCommunication.update(
        { amount: operation, isActive: !record.isActive },
        { where: { productId: id, name: name } }
      );
      const data = await Product.findAll({ include: { all: true } });

      return data;
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }
  async addToFavorite(data) {
    try {
      console.error("Removing ... ");
      const { productId, userId } = data;

      const favItems = await FavoriteList.findAll({
        where: { productId, userId },
      }); // check

      await FavoriteList.create({ productId, userId });

      const user = await Product.findAll({
        include: [{ model: User, where: { id: userId } }, { all: true }],
      });
      return user;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  async removeFromFavorite({ data }) {
    try {
      const { productId, userId } = data;
      await FavoriteList.destroy({
        where: { productId: productId, userId: userId },
      });

      const user = await Product.findAll({
        include: [{ model: User, where: { id: userId } }, { all: true }],
      });
      return user;
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }
  async getFavorList({ id }) {
    try {
      const user = await Product.findAll({
        include: [{ model: User, where: { id: id } }, { all: true }],
      });
      return user;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  async addComments(data) {
    try {
      const { day, month, year, minute, hour } = data.comment.date;
      const { textMessage } = data.comment;
      const { userId, productId } = data;
      const date = await Date.create({ day, month, year, min: minute, hour });
      const comments = await Comments.create({
        message: textMessage,
        dateId: date.id,
        userId,
        productId,
      });
      const product = await Product.findOne({
        include: { all: true },
        where: { id: productId },
      });
      return product;
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }

  async getComments({ id }) {
    try {
      const results = await Comments.findAll({
        include: [
          { model: User, include: { model: UserInfo } },
          { model: Date },
        ],
        where: { productId: id },
      });

      return results;
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }
}

module.exports = new ProductService();
