import { Router } from 'express';
import { castVote,getVotesByCandidateId,getVotes} from '../controllers/voteController.js';

const router = Router();

router.post('/', castVote);
router.get('/', getVotes);
router.get('/:id', getVotesByCandidateId);
// router.put('/:id', updateVote);
// router.delete('/:id', deleteVote);

export default router;