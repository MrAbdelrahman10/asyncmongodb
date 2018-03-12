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
    async connect() {
        this.client = await MongoClient.connect(this.config.uri).catch(_ => null);
        if(this.client){
            this.db = this.client.db(this.config.dbName);
        }
    }

    /**
     * Insert one row to mongodb
     * @param {String} collectionName 
     * @param {Object} row 
     */
    async insert(collectionName, row) {
        const collection = this.db.collection(collectionName);
        return await collection.insertOne(row).catch((e) => e.code);
    }

    /**
     * Insert many rows to mongodb
     * @param {String} collectionName 
     * @param {Object} rows 
     * @param {Boolean} ignoreErrors 
     */
    async insertMany(collectionName, rows, ignoreErrors = true) {
        const collection = this.db.collection(collectionName);
        return await collection.insertMany(rows, { ordered: !ignoreErrors }).catch((e) => e.code);
    }

    /**
     * Update one row in mongodb
     * @param {String} collectionName 
     * @param {Object} row 
     * @param {Object} where 
     */
    async update(collectionName, row, where) {
        const collection = this.db.collection(collectionName);
        return await collection.updateOne(where, row).catch((e) => e.code);
    }

    /**
     * Update many rows in mongodb
     * @param {String} collectionName 
     * @param {Array} rows 
     * @param {Object} where 
     * @param {Boolean} ignoreErrors 
     */
    async updateMany(collectionName, rows, where, ignoreErrors = true) {
        const collection = this.db.collection(collectionName);
        return await collection.updateMany(where, rows, { ordered: !ignoreErrors }).catch((e) => e.code);
    }

    /**
     * Delete one row in mongodb
     * @param {String} collectionName 
     * @param {Object} where 
     */
    async delete(collectionName, where) {
        const collection = this.db.collection(collectionName);
        return await collection.deleteOne(where).catch((e) => e.code);
    }

    /**
     * Delete many rows in mongodb
     * @param {String} collectionName 
     * @param {Object} where 
     * @param {Boolean} ignoreErrors 
     */
    async deleteMany(collectionName, where, ignoreErrors = true) {
        const collection = this.db.collection(collectionName);
        return await collection.deleteMany(where, { ordered: !ignoreErrors }).catch((e) => e.code);
    }

    /**
     * Find one row in mongodb
     * @param {String} collectionName 
     * @param {Object} where 
     */
    async findOne(collectionName, where) {
        const collection = this.db.collection(collectionName);
        return await collection.findOne(where).catch((e) => e.code);
    }

    /**
     * Find rows in mongodb
     * @param {String} collectionName 
     * @param {Object} where 
     * @param {Integer} limit 
     * @param {Array} ignoreErrors 
     */
    async find(collectionName, where, limit = 0, ignoreErrors = true) {
        const collection = this.db.collection(collectionName);
        return await collection.find(where).catch((e) => e.code);
    }

    /**
     * Disconnect Mongodb connection 
     */
    async disconnect() {
        if(this.client){
            await this.client.close(); 
        }
    }

}

module.exports = asyncmongodb;