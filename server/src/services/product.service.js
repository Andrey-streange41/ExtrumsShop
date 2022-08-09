const {Product, Comments, Characteristics, Purpose} = require('../models/models');

class ProductService{
    async createProduct(product,characteristics) {
        try {
              const prod = await Product.create(product);
            if(characteristics){
                characteristics = JSON.parse(characteristics);
                characteristics.foreach(i=>Characteristics.create({name:i.name,info:i.info,product_id:prod.id}))
              }
          
            return prod;
        } catch (error) {
            return error.message;
        }
    }
    async getProducts({category, subcategory, price, characteristicName_id, purpose_id,limit,page}){
        try {
            let products =[];
            page = page || 1;
            limit = limit || 9;
            const offset = limit * page - limit;

            if(!category){
                products = await Product.findAndCountAll({limit,offset});
            }
            else if(category&&!subcategory){
                products = await Product.findAndCountAll({where:{category},limit,offset})
            }
            else if(category&&subcategory &&!price&&!characteristicName_id&&!purpose_id){
                products = await Product.findAndCountAll({where:{category,subcategory},limit,offset})
            }
            else if(category&&subcategory&&price&&!characteristicName_id&&!purpose_id){
                products = await Product.findAndCountAll({where:{category,subcategory,price},limit,offset}) //need fixing price
            }
            else if(category&&subcategory&&price&&characteristicName_id&&!purpose_id){
                products = await Product.findAndCountAll({where:{category,subcategory,price,characteristicName_id},limit,offset}) 
            }
            else if(category&&subcategory&&price&&characteristicName_id&&purpose_id){
                products = await Product.findAndCountAll({where:{category,subcategory,price,characteristicName_id,purpose_id},limit,offset}) 
            }
            else if(category&&subcategory&&characteristicName_id&&!price&&!purpose_id){
                products = await Product.findAndCountAll({where:{category,subcategory,characteristicName_id},limit,offset}) 
            }
            else if(category&&subcategory&&purpose_id&&!price&&!characteristicName_id){
                products = await Product.findAndCountAll({where:{category,subcategory,purpose_id},limit,offset}) 
            }
            return products;
        } catch (error) {
            return error.message;
        }
        
    }
    async getProductById(id){
        try {
            const product = await Product.findOne({where:{id},include:[{model:Characteristics,as:'characteristics'}]});
            return product;
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = new ProductService();