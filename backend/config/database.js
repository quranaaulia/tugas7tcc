import { Sequelize } from "sequelize";

const db = new Sequelize("notes", "root", "", {
    host: "localhost",
    dialect: "mysql",
    dialectOptions: {
    ssl: false
     }
});

export default db;
