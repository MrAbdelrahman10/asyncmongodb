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
    var res = await mng.insertMany({ collectionName: 'countries', rows: [{ _id: 1, name: 'egypt' }, { _id: 2, name: 'turkey' }, { _id: 3, name: 'malaysia' }], ignoreErrors: true }).catch((e) => e.code);
    var data = mng.find({ collectionName: 'countries', where: {}, fields: {}, limit: 10 })
    console.log(res);
    console.log(data);
    mng.disconnect();
})();