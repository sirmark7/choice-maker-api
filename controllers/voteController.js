import {Vote,Candidate,User,Position,Category} from '../model/index.js';
// Cast a vote
export const castVote = async (req, res) => {
  try {
    const { userId, candidateId } = req.body;
       // const {candidateId } = req.body;
    // const userId =req.user.id
    
    const existingVote = await Vote.findOne({ where: { userId, candidateId } });

    if (existingVote) {
      return res.status(400).json({ error: 'You have already voted for this candidate' });
    }

    const newVote = await Vote.create({ userId, candidateId });
    res.status(201).json({message:'success',data:newVote});
  } catch (error) {
    res.status(500).json({ error: 'Error casting vote' });
  }
};

// Get all votes
export const getVotes = async (req, res) => {
  try {
    const votes = await Vote.findAll();
    res.status(200).json(votes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching votes' });
  }
};

export const getVotesByUser=async(req,res)=>{
   try {
    const userId = req.user.id;

    // 1. Find all votes for the given user
    const votes = await Vote.findAll({
      where: { userId },  // Fetch votes where userId matches
      include: [
        {
          model: Candidate,
          as: 'candidate',
          include: [
            {
              model: Position,
              as: 'position',
              include: {
                model: Category,
                as: 'category',
                attributes: ['name']  // Include category name
              },
              attributes: ['name']  // Include position name
            },
            {
              model: User,
              as: 'student',
              attributes: ['name']  // Include the candidate's name (user info)
            }
          ]
        }
      ]
    });

    // 2. Return the result
    res.status(200).json({ message: 'success', data: votes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching votes for user' });
  }
}

// Get votes by candidate ID
export const getVotesByCandidateId = async (req, res) => {
  try {
    const votes = await Vote.findAll({ where: { candidateId: req.params.candidateId } });
    res.status(200).json(votes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching votes' });
  }
};
