import {Vote} from '../model/index.js';
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

// Get votes by candidate ID
export const getVotesByCandidateId = async (req, res) => {
  try {
    const votes = await Vote.findAll({ where: { candidateId: req.params.candidateId } });
    res.status(200).json(votes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching votes' });
  }
};
