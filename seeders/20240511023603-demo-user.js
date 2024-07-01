"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@gmail.com",
          password: await bcrypt.hash("123456", 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "ilhamnofaldi@gmail.com",
          password: await bcrypt.hash("123", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "tugalan@gmail.com",
          password: await bcrypt.hash("123", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "yuki@gmail.com",
          password: await bcrypt.hash("1234", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "irsan@gmail.com",
          password: await bcrypt.hash("12345", 10),
          role: "mahasiswa",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "dosen@gmail.com",
          password: await bcrypt.hash("345678", 10),
          role: "dosen",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
