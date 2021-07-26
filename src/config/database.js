module.exports = {
    HOST: "mysql",
    USER: "root",
    PASSWORD: "root",
    DB: "store",
    dialect: "mysql",
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};