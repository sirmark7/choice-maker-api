// routes/user.routes.js
import { Router } from 'express';
import { createElection,updateElection,getElectionById,getElections,deleteElection} from '../controllers/electionController.js';
const router = Router();
router.post('/', createElection);
router.get('/', getElections);
router.get('/:id', getElectionById);
router.put('/:id', updateElection);
router.delete('/:id', deleteElection);

export default router;
