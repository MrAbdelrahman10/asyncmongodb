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
        return MongoClient.connect(this.config.uri)
        .then((client) => {this.client = client; this.db = this.client.db(this.config.dbName); return true;})
        .catch((e) => e);
    }

    /**
     * Insert one row to mongodb
     * @param {Object} param0 
     */
    async insert({collection, row}) {
        return await this.db.collection(collection).insertOne(row).catch((e) => e.code);
    }

    /**
     * Insert many rows to mongodb
     * @param {Object} param0 
     */
    async insertMany({collection, rows, ignoreErrors = true}) {
        return await this.db.collection(collection).insertMany(rows, { ordered: !ignoreErrors }).catch((e) => e.code);
    }

    /**
     * Update one row in mongodb
     * @param {Object} param0 
     */
    async update({collection, row, where}) {
        return await this.db.collection(collection).updateOne(where, {$set: row}).catch((e) => e.code);
    }

    /**
     * Update many rows in mongodb
     * @param {Object} param0  
     */
    async updateMany({collection, rows, where, ignoreErrors = true}) {
        return await this.db.collection(collection).updateMany(where, rows, { ordered: !ignoreErrors }).catch((e) => e.code);
    }

    /**
     * Delete one row in mongodb
     * @param {Object} param0 
     */
    async delete({collection, where}) {
        return await this.db.collection(collection).deleteOne(where).catch((e) => e.code);
    }

    /**
     * Delete many rows in mongodb
     * @param {Object} param0  
     */
    async deleteMany({collection, where, ignoreErrors = true}) {
        return await this.db.collection(collection).deleteMany(where, { ordered: !ignoreErrors }).catch((e) => e.code);
    }

    /**
     * Find one row in mongodb
     * @param {Object} param0 
     */
    async findOne({collection, where}) {
        return await this.db.collection(collection).findOne(where).catch((e) => e.code);
    }

    /**
     * Find rows in mongodb
     * @param {Object} param0  
     */
    find({collection, where, limit = 0, skip = 0, fields = {}}) {
        return new Promise((resolve, reject)=>{
            this.db.collection(collection).find(where, fields).skip(skip).limit(limit).toArray(function(err, result) {
                if (err) reject(err);
                resolve(result);
              });
        });
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
