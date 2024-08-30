import Election from '../model/electionModel.js';
// Create a new election
export const createElection = async (req, res) => {
  try {
    const { name, startDate, endDate, status } = req.body;
    const newElection = await Election.create({ name, startDate, endDate, status });
    res.status(201).json(newElection);
  } catch (error) {
    res.status(500).json({ error: 'Error creating election' });
  }
};

// Get all elections
export const getElections = async (req, res) => {
  try {
    const elections = await Election.findAll();
    res.status(200).json(elections);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching elections' });
  }
};

// Get an election by ID
export const getElectionById = async (req, res) => {
  try {
    const election = await Election.findByPk(req.params.id);
    if (!election) return res.status(404).json({ error: 'Election not found' });
    res.status(200).json(election);
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
    res.status(200).json(election);
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
