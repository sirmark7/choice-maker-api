
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()

export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    //LOGGING IS USED TO HIDE OR SHOW THE GENERATED SQL QUERIES IN THE CONSOLES
    // logging:true
  });

// sequelize.sync({ force: true }) // Use force: true only in development
//       .then(() => {
//         console.log('Database & tables created!');
//       })
//       .catch((error) => {
//         console.error('Error creating database & tables:', error);
//       });


  export const dbClose=()=>{
    sequelize.close()
  }

  // dbConnect()
