// Load required Modules
const MongoClient = require('mongodb').MongoClient;

/**
 * Async mongodb class
 */
class asyncmongodb {

    /**
     * Create new object
     * @param {Object} _config 
     */
    constructor(_config = {}) {
        this.config = _config;
    }

    /**
     * Connect to mongodb
     */
    connect() {
        return MongoClient.connect(this.config.uri)
            .then((client) => { this.client = client; this.db = this.client.db(this.config.dbName); return true; })
            .catch((e) => e);
    }

    /**
     * Insert one row to mongodb
     * @param {Object} param0 
     */
    insert({ collection, row }) {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).insertOne(row)
                .then(_ => resolve(true))
                .catch((e) => reject(e));
        });
    }

    /**
     * Insert many rows to mongodb
     * @param {Object} param0 
     */
    insertMany({ collection, rows, ignoreErrors = true }) {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).insertMany(rows, { ordered: !ignoreErrors })
                .then(_ => resolve(true))
                .catch((e) => reject(e));
        });
    }

    /**
     * Update one row in mongodb
     * @param {Object} param0 
     */
    update({ collection, row, where = {} }) {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).updateOne(where, { $set: row })
                .then(_ => resolve(true))
                .catch((e) => reject(e));
        });
    }

    /**
     * Update many rows in mongodb
     * @param {Object} param0  
     */
    updateMany({ collection, rows, where = {}, ignoreErrors = true }) {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).updateMany(where, rows, { ordered: !ignoreErrors })
                .then(_ => resolve(true))
                .catch((e) => reject(e));
        });
    }

    /**
     * Delete one row in mongodb
     * @param {Object} param0 
     */
    delete({ collection, where = {} }) {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).deleteOne(where)
                .then(_ => resolve(true))
                .catch((e) => reject(e));
        });
    }

    /**
     * Delete many rows in mongodb
     * @param {Object} param0  
     */
    deleteMany({ collection, where = {}, ignoreErrors = true }) {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).deleteMany(where, { ordered: !ignoreErrors })
                .then(_ => resolve(true))
                .catch((e) => reject(e));
        });
    }

    /**
     * Find one row in mongodb
     * @param {Object} param0 
     */
    findOne({ collection, where = {}, fields = {}, sort = {} }) {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).findOne(where, { sort: sort }, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    /**
     * Find rows in mongodb
     * @param {Object} param0  
     */
    find({ collection, where = {}, limit = 0, skip = 0, sort = {}, fields = {} }) {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).find(where, fields).sort(sort).skip(skip).limit(limit).toArray(function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    /**
     * Get count of documents
     * @param {Object} param0  
     */
    count({ collection, where = {}, limit = 0, skip = 0, fields = {} }) {
        return new Promise((resolve, reject) => {
            this.db.collection(collection).find(where, fields).skip(skip).limit(limit).count(function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    /**
     * Drop Collection
     * @param {Object} param0  
     */
    dropCollection(collection) {
        return new Promise((resolve, reject) => {
            this.db.dropCollection(collection, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    }

    /**
     * Disconnect Mongodb connection 
     */
    disconnect() {
        if (this.client) {
            return this.client.close();
        }
    }

}

module.exports = asyncmongodb;