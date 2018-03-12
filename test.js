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
    var res = await mng.insertMany('countries', [{ _id: 1, name: 'egypt' }, { _id: 2, name: 'turkey' }, { _id: 3, name: 'malaysia' }], true).catch((e) => e.code);
    console.log(res);
    mng.disconnect();
})();