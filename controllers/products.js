const mongodb = require("mongodb");
const db = require("../db");
const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;
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
    .db()
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

exports.getProduct = (req, res, next) => {
  db.getDb()
    .db()
    .collection("products")
    .findOne({ _id: new ObjectId(req.params.id) })

    .then(productDoc => {
      productDoc.price = productDoc.price.toString();
      res.status(200).json(productDoc);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

exports.getProducts = (req, res, next) => {
  const products = [];
  db.getDb()
    .db()
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
