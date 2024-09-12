import { VoterProgress} from '../model/index.js';

// Save or update voting progress
export const saveVoterProgress = async (req, res) => {
  const { userId, electionId, positionId, candidateId } = req.body;

  try {
    // Check if progress already exists for this voter, election, and position
    let progress = await VoterProgress.findOne({
      where: { userId, electionId, positionId }
    });

    if (progress) {
      // Update the existing progress
      progress.candidateId = candidateId;
      await progress.save();
    } else {
      // Create new progress record
      progress = await VoterProgress.create({
        userId, electionId, positionId, candidateId
      });
    }

    res.status(200).json({ message: 'Progress saved', data: progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving voter progress' });
  }
};

// Get voting progress for a user
export const getVoterProgress = async (req, res) => {
  const { userId, electionId } = req.params;

  try {
    // Fetch the voter's progress for the given election
    const progress = await VoterProgress.findAll({
      where: { userId, electionId }
    });

    res.status(200).json({ message: 'Progress loaded', data: progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error loading voter progress' });
  }
};

export const finalizeVoting = async (req, res) => {
  const { userId, electionId } = req.body;

  try {
    // Mark all voter progress for this election as completed
    await VoterProgress.update(
      { progressStatus: 'completed' },
      { where: { userId, electionId } }
    );

    res.status(200).json({ message: 'Voting finalized' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error finalizing voting' });
  }
};

