const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const connection_string = require("./config/mongoString");
let _db;

const initDb = callback => {
  if (_db) {
    console.log("Database is already initialized");
    return callback(null, _db);
  }
  MongoClient.connect(
    connection_string,
    { useNewUrlParser: true }
  )
    .then(client => {
      _db = client.db();
      callback(null, _db);
    })
    .catch(err => callback(err));
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not intialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
