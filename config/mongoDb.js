const MongoClient = require("mongodb").MongoClient;

const url = require("./keys").mongodbURI;
const dbName = "TechnicalAcm";

const client = new MongoClient(url, { useNewUrlParser: true });
module.exports = {
  dataBaseName: dbName,

  dataBaseClient: client
};
// module.exports = function hh(  req  , callk) {
//     client.connect(err => {
//         res = err;
//         errors = err;
//         if (!err) console.log("Connected successfully to MongoDB");
//         else console.log("error : " + err);
//         const db = client.db(dbName);

//         callk(req);
//         //insert

//         // insertDocuments(db, cb => {
//         //   //   console.log(cb);
//         //   updateDoc(db, callback => {});
//         // });

//         //find all iteam in it

//         // findAllDoc(db, cd => {
//         //   //  console.log(cd);
//         // });

//         // find by cond

//         // findDocBy(db, cd => {});

//         // update doc By

//         //updateDoc(db, callback => {});

//         // perform actions on the collection object

//         //remove one

//         // removeDocument(db, cd => {});

//         client.close();
//     });

// };
