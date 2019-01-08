const mongodb = require("mongodb");
const MongoClient = mongodb.Client;
const connection_string = require("./config/mongoString");
let _db;

const initDb = callback => {
  if (_db) {
    console.log("Database is alread initialized");
    return callback(null, _db);
  }
  MongoClient.connect(connection_string)
    .then(client => {
      _db = client.db();
    })
    .catch(err => callback(err));
};
