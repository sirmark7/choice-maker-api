import Candidate from '../model/candidateModel.js';

// Create a new candidate
export const createCandidate = async (req, res) => {
  try {
    const { manifesto, policies, userId, positionId } = req.body;
    const newCandidate = await Candidate.create({ manifesto, policies, userId, positionId });
    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(500).json({ error: 'Error creating candidate' });
  }
};

// Get all candidates
export const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.findAll();
    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching candidates' });
  }
};

// Get a candidate by ID
export const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findByPk(req.params.id);
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });
    res.status(200).json(candidate);
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
    res.status(200).json(candidate);
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
