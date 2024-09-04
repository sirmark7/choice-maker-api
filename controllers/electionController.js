import Election from '../model/electionModel.js';
import Position from '../model/positionModel.js';
import Category from '../model/categoryModel.js';
import Vote from '../model/voteModel.js';
import User from '../model/userModel.js';
import Candidate from '../model/candidateModel.js';



// Get votes for each candidate in an election, sorted by their positions
export const getElectionResults = async (req, res) => {
  try {
    const electionId = req.params.electionId;

    // Find the election with its associated positions and candidates
    const election = await Election.findByPk(electionId, {
      include: {
        model: Position,
        as: 'positions',
        include: {
          model: Candidate,
          as: 'candidates',
          attributes: {
            include: [
              [Vote.sequelize.fn('COUNT', Vote.sequelize.col('votes.id')), 'voteCount'] // Count the votes
            ]
          },
          include: [
            {
              model: User,
              as: 'student',
              attributes: ['name'], // Include the user's name
            }
          ],
          group: ['Candidate.id'], // Group by candidate ID
        },
      },
      order: [
        ['positions', 'name', 'ASC'],  // Order positions by name
        [{ model: Position, as: 'positions' }, { model: Candidate, as: 'candidates' }, Vote.sequelize.literal('voteCount'), 'DESC']  // Order candidates by vote count within positions
      ]
    });

    if (!election) {
      return res.status(404).json({ message: 'Election not found' });
    }

    res.status(200).json({message:'success',data:election});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching election results' });
  }
};


// Create a new election
export const createElection = async (req, res) => {
  try {
    const { name, startDate, endDate, status, positions } = req.body;

    // Create the election
    const newElection = await Election.create({ name, startDate, endDate, status });

    // Associate positions with the election
    if (positions && positions.length > 0) {
      const foundPositions = await Position.findAll({
        where: { id: positions }
      });

      await newElection.setPositions(foundPositions);
    }

    res.status(201).json({message:'success',data:newElection});
  } catch (error) {
    res.status(500).json({ error: 'Error creating election' });
  }
};

// Get all elections
export const getElections = async (req, res) => {
  try {
    const elections = await Election.findAll({
      include: {
        model: Position,
        as: 'positions',
        through: { attributes: [] },  // Exclude join table attributes
        attributes: ['id', 'name','categoryId'] ,   // Include only relevant attributes
        include: {
          model: Category,
          as: 'category',
          attributes: ['name'],  // Include only the category name
        },
      }
    });

    res.status(200).json({message:'success',data:elections});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching elections' });
  }
};

// Get an election by ID
export const getElectionById = async (req, res) => {
  try {
    const election = await Election.findByPk(req.params.id, {
      include: {
        model: Position,
        as: 'positions',
        through: { attributes: [] },  // Exclude join table attributes
        attributes: ['id', 'name','categoryId'],    // Include only relevant attributes
        include: {
          model: Category,
          as: 'category',
          attributes: ['name'],  // Include only the category name
        },
      }
    });

    if (!election) {
      return res.status(404).json({ error: 'Election not found' });
    }

    res.status(200).json({message:'success',data:election});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching election' });
  }
};
// Update an election
export const updateElection = async (req, res) => {
  try {
    const { name, startDate, endDate, status } = req.body;
    const election = await Election.findByPk(req.params.id);
    if (!election) return res.status(404).json({ error: 'Election not found' });

    election.name = name || election.name;
    election.startDate = startDate || election.startDate;
    election.endDate = endDate || election.endDate;
    election.status = status || election.status;

    await election.save();
    res.status(200).json({message:'success',data:election});
  } catch (error) {
    res.status(500).json({ error: 'Error updating election' });
  }
};

// Delete an election
export const deleteElection = async (req, res) => {
  try {
    const election = await Election.findByPk(req.params.id);
    if (!election) return res.status(404).json({ error: 'Election not found' });

    await election.destroy();
    res.status(200).json({ message: 'Election deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting election' });
  }
};
