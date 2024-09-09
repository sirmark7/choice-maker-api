
import { Election,Position,Category,Vote,User,Candidate } from '../model/index.js';


// Get votes for each candidate in an election, sorted by their positions

export const getElectionwithCandidates = async (req, res) => {
  console.log('heloo');
  try {
    // 1. Fetch all elections with positions
    const elections = await Election.findAll({
      include: {
        model: Position,
        as: 'positions',
        include: {
          model: Category,
          as: 'category',
          attributes: ['name'],  // Include category name
        }
      }
    });
console.log('done elections');


    // 2. Fetch all candidates with their positions
    const candidates = await Candidate.findAll({
      include: [
        {
          model: Position,
          as: 'position',
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'student',
          attributes: ['name']  // Include candidate's name (student name)
        }
      ]
    });
    console.log('done candidates');
// console.log(elections,candidates);

    // 3. Organize candidates by positionId for easy lookup
    const candidatesByPosition =  candidates.reduce((acc, candidate) => {
      if (!acc[candidate.positionId]) {
        acc[candidate.positionId] = [];
      }
      acc[candidate.positionId].push(candidate);
      return acc;
    }, {});

    // 4. Combine candidates into elections by matching positionId
    const combinedElections = elections.map(election => {
      const positionsWithCandidates = election.positions.map(position => {
        return {
          ...position.toJSON(),
          candidates: candidatesByPosition[position.id] || []  // Attach candidates or empty array if none
        };
      });

      return {
        ...election.toJSON(),
        positions: positionsWithCandidates  // Attach updated positions with candidates
      };
    });

    // 5. Return the combined result
    res.status(200).json({ message: 'success', data: combinedElections });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching election and candidate data' });
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
    res.status(200).json({ message: 'Election deleted successfully',data:election });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting election' });
  }
};
