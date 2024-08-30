// In your main file where you set up models
import User from './userModel.js';
import Candidate from './candidateModel.js';
import Position from './positionModel.js';
import Category from './categoryModel.js';
import Vote from './voteModel.js';
import Election from './electionModel.js';

// Associations
User.hasMany(Candidate, { as: 'candidates', foreignKey: 'userId' });
User.hasMany(Vote, { as: 'votes', foreignKey: 'userId' });

Candidate.belongsTo(User, { as: 'student', foreignKey: 'userId' });
Candidate.belongsTo(Position, { as: 'position', foreignKey: 'positionId' });

Position.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' });
Position.hasMany(Candidate, { as: 'candidates', foreignKey: 'positionId' });

Vote.belongsTo(User, { as: 'student', foreignKey: 'userId' });
Vote.belongsTo(Candidate, { as: 'candidate', foreignKey: 'candidateId' });