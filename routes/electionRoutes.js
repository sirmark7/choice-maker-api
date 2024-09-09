// routes/user.routes.js
import { Router } from 'express';
import { createElection,updateElection,getElectionById,getElections,deleteElection,getElectionwithCandidates} from '../controllers/electionController.js';
import { adminMiddleware } from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/', getElections);
router.get('/candidates',getElectionwithCandidates)
router.get('/:id', getElectionById);
router.use(adminMiddleware)
router.post('/', createElection);
router.put('/:id', updateElection);
router.delete('/:id', deleteElection);

export default router;
