const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
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

  MongoClient.connect(
    connection_string,
    { useNewUrlParser: true }
  )
    .then(client => {
      //console.log("connected to mongo");
      //app.locals.client = client;
      client
        .db()
        .collection("products")
        .insertOne(newProduct)
        .then(result => {
          console.log(result);
          res.status(200).json({
            message: "Product updated",
            productId: result.insertedId
          });
          client.close();
        })
        .catch(err => {
          res.status(500).json({ message: err.message });
          client.close();
        });
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  MongoClient.connect(
    connection_string,
    { useNewUrlParser: true }
  )
    .then(client => {
      //console.log("connected to mongo");
      //app.locals.client = client;
      const products = [];
      client
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
          client.close();
        })
        .catch(err => {
          res.status(500).json({ message: err.message });
          client.close();
        });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
      console.log(err);
    });
};
