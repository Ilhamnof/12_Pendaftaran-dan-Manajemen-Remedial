"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          email: "admin@gmail.com",
          password: await bcrypt.hash("123456", 10),
          role: "admin",
        },
        {
          email: "ilhamnofaldi@gmail.com",
          password: await bcrypt.hash("234567", 10),
          role: "mahasiswa",
        },
        {
          email: "dosen@gmail.com",
          password: await bcrypt.hash("345678", 10),
          role: "dosen",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
