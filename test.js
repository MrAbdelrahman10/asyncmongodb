// Test Module
const Asyncmongodb = require('./index.js');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Collection Name
const collectionName = 'documents';

// Run test
(async () => {
    const mng = new Asyncmongodb({ dbName: dbName, uri: url });
    await mng.connect();
    var _insert = await mng.insertMany({ collection: 'countries', rows: [{ _id: 1, name: 'egypt' }, { _id: 2, name: 'turkey' }, { _id: 3, name: 'malaysia' }], ignoreErrors: true }).catch((e) => e.code);
    var _findOne = await mng.findOne({ collection: 'countries', where: {}});
    var _find = await mng.find({ collection: 'countries', where: {}, fields: {}, limit: 1, sort: {name: 1} })
    console.log(_insert);
    console.log(_findOne);
    console.log(_findOne);
    mng.disconnect();
})();