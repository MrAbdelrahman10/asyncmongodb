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
    var _insertMeny = await mng.insertMany({ collection: 'countries', rows: [{ _id: 1, name: 'egypt' }, { _id: 2, name: 'turkey' }, { _id: 3, name: 'malaysia' }], ignoreErrors: true }).catch((e) => e.code);
    var _insert = await mng.insert({ collection: 'countries', row: { _id: 5, name: 'maroco' }, ignoreErrors: true }).catch((e) => e.code);
    var _update = await mng.update({ collection: 'countries', where: { _id: 5 }, row: { name: 'sudan' }, ignoreErrors: true }).catch((e) => e.code);
    var _find = await mng.find({ collection: 'countries', where: { _id: { $gt: 0 } }, fields: {}, limit: 3, sort: { name: 1 } })
    var _findOne = await mng.findOne({ collection: 'countries', where: {}, sort: { name: -1 } });
    var _deleteMany = await mng.deleteMany({ collection: 'countries', where: {} });
    var _dropCollection = await mng.dropCollection('countries');
    console.log('[insertMeny]', _insertMeny);
    console.log('[insert]', _insert);
    console.log('[update]', _update);
    console.log('[find]', _find);
    console.log('[findOne]', _findOne);
    console.log('[deleteMany]', _deleteMany);
    console.log('[dropCollection]', _dropCollection);
    mng.disconnect();
})();
