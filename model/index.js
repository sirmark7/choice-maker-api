import User from './userModel.js';
import Position from './positionModel.js';
import Candidate from './candidateModel.js';
import Election from './electionModel.js';
import Category from './categoryModel.js';
import Vote from './voteModel.js';
// User Associations
User.hasMany(Candidate, { as: 'candidates', foreignKey: 'userId' });
User.hasMany(Vote, { as: 'votes', foreignKey: 'userId' });

// Candidate Associations
Candidate.hasMany(Vote, { as: 'votes', foreignKey: 'candidateId' });
Candidate.belongsTo(User, { foreignKey: 'userId', as: 'student' });
Candidate.belongsTo(Position, { foreignKey: 'positionId', as: 'position' });

// Position Associations
Position.hasMany(Candidate, { as: 'candidates', foreignKey: 'positionId' });
Position.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Position.belongsToMany(Election, { through: 'ElectionPosition', as: 'elections' });

// Election Associations
Election.belongsToMany(Position, { through: 'ElectionPosition', as: 'positions' });

// Vote Associations
Vote.belongsTo(Candidate, { foreignKey: 'candidateId', as: 'candidate' });
Vote.belongsTo(User, { foreignKey: 'userId', as: 'student' });

export {User,Candidate,Position,Category,Election,Vote}