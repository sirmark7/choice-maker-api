import {Candidate,Position,Category,User,Vote} from '../model/index.js';
// Create a new candidate
export const createCandidate = async (req, res) => {
  try {
    const { manifesto, policies, userId, positionId } = req.body;
    const newCandidate = await Candidate.create({ manifesto, policies, userId, positionId });
    res.status(201).json({message:'success',data:newCandidate});
  } catch (error) {
    res.status(500).json({ error: 'Error creating candidate' });
  }
};

export const getAllCandidatesWithVotes=async(req,res)=>{
  try {
    // Find all candidates, ordered by category, and count the votes for each
    const candidates = await Candidate.findAll({
      attributes: [
        'id', 'manifesto', 'policies',
        [Vote.sequelize.fn('COUNT', Vote.sequelize.col('votes.candidateId')), 'voteCount'] // Count votes
      ],
      include: [
        {
          model: Position,
          as: 'position',
          include: {
            model: Category,
            as: 'category',
            attributes: ['name']  // Include the category name
          }
        },
        {
          model: Vote,
          as: 'votes',
          attributes: []  // Don't need vote details, just count
        },
        {
          model: User,
          as: 'student',
          attributes: ['name']  // Include the student's name
        }
      ],
      group: ['Candidate.id', 'position.id', 'position->category.id'],  // Group by candidate, position, and category
      order: [
        [{ model: Position, as: 'position' }, { model: Category, as: 'category' }, 'name', 'ASC'],  // Order by category name
        [Vote.sequelize.literal('voteCount'), 'DESC']  // Order by vote count
      ]
    });

    res.status(200).json({ message: 'success', data: candidates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching candidates' });
  }
}

export const getCandidateByCategory=async (req, res) => {
  try {
    // const categoryId = req.params.categoryId;

    // Find all candidates where the position's category matches the given category ID
    const candidates = await Candidate.findAll({
      include: [
        {
          model: Position,
          as: 'position',
          include: {
            model: Category,
            as: 'category',
            attributes: ['name'], // Include the category name
          }
        },
        {
          model: User,
          as: 'student',
          attributes: ['name'], // Include the user's name
        }
      ]
    });

    if (candidates.length === 0) {
      return res.status(404).json({ message: 'No candidates found for this category' });
    }

    res.status(200).json({message:'success',data:candidates});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching candidates by category' });
  }
};

// Get all candidates
export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.findAll({
      include: [
        {
          model: Position,
          as: 'position',
          include: {
            model: Category,
            as: 'category',
            attributes: ['name'], // Include the category name
          }
        },
        {
          model: User,
          as: 'student',
          attributes: ['name'], // Include the user's name
        }
      ]
    });
    res.status(200).json({message:'success',data:candidates});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching candidates' });
  }
};

// Get a candidate by ID
export const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findByPk(req.params.id,{
      include: [
        {
          model: Position,
          as: 'position',
          where: { categoryId: categoryId },
          include: {
            model: Category,
            as: 'category',
            attributes: ['name'], // Include the category name
          }
        },
        {
          model: User,
          as: 'student',
          attributes: ['name'], // Include the user's name
        }
      ]
    });
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });
    res.status(200).json({message:'success',data:candidate});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching candidate' });
  }
};

// Update a candidate
export const updateCandidate = async (req, res) => {
  try {
    const { manifesto, policies, userId, positionId } = req.body;
    const candidate = await Candidate.findByPk(req.params.id);
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

    candidate.manifesto = manifesto || candidate.manifesto;
    candidate.policies = policies || candidate.policies;
    candidate.userId = userId || candidate.userId;
    candidate.positionId = positionId || candidate.positionId;

    await candidate.save();
    res.status(200).json({message:'success',data:candidate});
  } catch (error) {
    res.status(500).json({ error: 'Error updating candidate' });
  }
};

// Delete a candidate
export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByPk(req.params.id);
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

    await candidate.destroy();
    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting candidate' });
  }
};
