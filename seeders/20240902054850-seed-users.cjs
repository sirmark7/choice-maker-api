'use strict';
/** @type {import('sequelize-cli').Migration} */
const bcrypt=require('bcrypt')
const saltRounds = 10;
module.exports={

async up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Users', [
    // Seed data for students
    { id: Sequelize.fn('UUID'), name: 'Student One', personalId: 'STU001', password: await bcrypt.hash('password1', saltRounds), role: 'student', createdAt: new Date(), updatedAt: new Date() },
    { id: Sequelize.fn('UUID'), name: 'Student Two', personalId: 'STU002', password: await bcrypt.hash('password2', saltRounds), role: 'student', createdAt: new Date(), updatedAt: new Date() },
    { id: Sequelize.fn('UUID'), name: 'Student Three', personalId: 'STU003', password: await bcrypt.hash('password3', saltRounds), role: 'student', createdAt: new Date(), updatedAt: new Date() },
    { id: Sequelize.fn('UUID'), name: 'Student Four', personalId: 'STU004', password: await bcrypt.hash('password4', saltRounds), role: 'student', createdAt: new Date(), updatedAt: new Date() },
    { id: Sequelize.fn('UUID'), name: 'Student Five', personalId: 'STU005', password: await bcrypt.hash('password5', saltRounds), role: 'student', createdAt: new Date(), updatedAt: new Date() },
    { id: Sequelize.fn('UUID'), name: 'Student Six', personalId: 'STU006', password: await bcrypt.hash('password6', saltRounds), role: 'student', createdAt: new Date(), updatedAt: new Date() },
    { id: Sequelize.fn('UUID'), name: 'Student Seven', personalId: 'STU007', password: await bcrypt.hash('password7', saltRounds), role: 'student', createdAt: new Date(), updatedAt: new Date() },
    { id: Sequelize.fn('UUID'), name: 'Student Eight', personalId: 'STU008', password: await bcrypt.hash('password8', saltRounds), role: 'student', createdAt: new Date(), updatedAt: new Date() },
    { id: Sequelize.fn('UUID'), name: 'Student Nine', personalId: 'STU009', password: await bcrypt.hash('password9', saltRounds), role: 'student', createdAt: new Date(), updatedAt: new Date() },
    { id: Sequelize.fn('UUID'), name: 'Student Ten', personalId: 'STU010', password: await bcrypt.hash('password10', saltRounds), role: 'student', createdAt: new Date(), updatedAt: new Date() },

    // Seed data for staff
    { id: Sequelize.fn('UUID'), name: 'Staff One', personalId: 'STF001', password: await bcrypt.hash('password11', saltRounds), role: 'staff', createdAt: new Date(), updatedAt: new Date() },
    { id: Sequelize.fn('UUID'), name: 'Staff Two', personalId: 'STF002', password: await bcrypt.hash('password12', saltRounds), role: 'staff', createdAt: new Date(), updatedAt: new Date() },
    { id: Sequelize.fn('UUID'), name: 'Staff Three', personalId: 'STF003', password: await bcrypt.hash('password13', saltRounds), role: 'staff', createdAt: new Date(), updatedAt: new Date() },
    { id: Sequelize.fn('UUID'), name: 'Staff Four', personalId: 'STF004', password: await bcrypt.hash('password14', saltRounds), role: 'staff', createdAt: new Date(), updatedAt: new Date() },
    { id: Sequelize.fn('UUID'), name: 'Staff Five', personalId: 'STF005', password: await bcrypt.hash('password15', saltRounds), role: 'staff', createdAt: new Date(), updatedAt: new Date() },

    // Seed data for admins
    { id: Sequelize.fn('UUID'), name: 'Admin One', personalId: 'ADM001', password: await bcrypt.hash('password16', saltRounds), role: 'admin', createdAt: new Date(), updatedAt: new Date() },
    { id: Sequelize.fn('UUID'), name: 'Admin Two', personalId: 'ADM002', password: await bcrypt.hash('password17', saltRounds), role: 'admin', createdAt: new Date(), updatedAt: new Date() },
  ], {});
},
async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Users', null, {});
}
}
