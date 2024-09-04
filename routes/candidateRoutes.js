import { Router } from 'express';
import { createCandidate, getCandidates, getCandidateById, updateCandidate, deleteCandidate } from '../controllers/candidateController.js';

const router = Router();

// Route to create a new candidate
router.post('/', createCandidate);

// Route to get all candidates
router.get('/', getCandidates);

// Route to get a candidate by ID
router.get('/:id', getCandidateById);

// Route to update a candidate by ID
router.put('/:id', updateCandidate);

// Route to delete a candidate by ID
router.delete('/:id', deleteCandidate);

export default router;
