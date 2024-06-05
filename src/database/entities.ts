import { Vote } from '../vote/entities/vote.entity';
import { Category } from '../category/entities/category.entity';
import { Voter } from '../voter/entities/voter.entity';
import { Admin } from '../admin/entities/admin.entity';
import { Candidate } from '../candidate/entities/candidate.entity';

const entities = [Category, Voter, Vote, Admin, Candidate];

export default entities;
