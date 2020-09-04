module.exports =  {
    "type": process.env.DB_TYPE || "mysql",
    "host": process.env.DB_HOST || 'us-cdbr-east-02.cleardb.com',
    "port": process.env.DB_PORT || 3306,
    "username": process.env.DB_USERNAME || 'b83cf5762df255',
    "password": process.env.DB_PASSWORD || '4a66a39f',
    "database": process.env.DB_DATABASE || 'heroku_340ecf5d467ed76',
    "synchronize": true,
    "logging": false,
    "entities": [
        "src/entity/**/*.ts"
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
};
