const MongoClient = require("mongodb").MongoClient;

const url = require("./keys").mongodbURI;
const dbName = "TechnicalAcm";

const client = new MongoClient(url, { useNewUrlParser: true });
module.exports = {
  dataBaseName: dbName,

  dataBaseClient: client
};
