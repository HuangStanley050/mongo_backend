const mongodb = require("mongodb");
const db = require("../db");
const Decimal128 = mongodb.Decimal128;
const connection_string = require("../config/mongoString");

exports.addProduct = (req, res, next) => {
  //console.log(req.body);
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price.toString()), // store this as 128bit decimal in MongoDB
    image: req.body.image
  };

  db.getDb()
    .collection("products")
    .insertOne(newProduct)
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Product updated",
        productId: result.insertedId
      });
      //client.close();
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
      //client.close();
    });
};

exports.getProducts = (req, res, next) => {
  const products = [];
  db.getDb()
    .collection("products")
    .find()
    .forEach(productDoc => {
      productDoc.price = productDoc.price.toString();
      products.push(productDoc);
      return products;
    })
    .then(result => {
      //console.log(result);
      res.status(200).json(products);
      //client.close();
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
      //client.close();
    });
};
