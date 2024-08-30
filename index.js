import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import {sequelize} from './db/dbConfig.js';
dotenv.config()

const app= express();

app.use(cors());
// Middleware
app.use(express.json());

// Routes
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import positionRoutes from './routes/electionRoutes.js'
import candidateRoutes from './routes/positionRoutes.js'
import voteRoutes from './routes/votesRoutes.js'
import electionRoutes from './routes/electionRoutes.js'

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/elections', electionRoutes);

app.use("*",(req,res)=>{
    res.status(404).json("Error 404,Page Not Found")
});

(async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        app.listen(process.env.PORT, ()=>{console.log(`Server listening on port ${ process.env.PORT}`)})
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  })()

