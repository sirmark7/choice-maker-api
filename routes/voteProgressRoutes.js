import { Router } from 'express';
import { finalizeVoting, getVoterProgress, saveVoterProgress } from '../controllers/voterProgress.js';


const router = Router();

router.post('/', saveVoterProgress);
router.get('/:userId/:electionId', getVoterProgress);
router.put('/',finalizeVoting);


export default router;