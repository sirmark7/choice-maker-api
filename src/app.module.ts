import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { dbConfig } from './database/dbconfig';
// import { JwtModule } from '@nestjs/jwt';
// import entities from './database/entities';

import { AdminController } from './admin/admin.controller';
import { VoterController } from './voter/voter.controller';
import { CandidateController } from './candidate/candidate.controller';
import { CategoryController } from './category/category.controller';
import { AuthController } from './auth/auth.controller';
import { VoteController } from './vote/vote.controller';

import { AdminService } from './admin/admin.service';
import { VoterService } from './voter/voter.service';
import { CandidateService } from './candidate/candidate.service';
import { CategoryService } from './category/category.service';
import { AuthService } from './auth/auth.service';
import { VoteService } from './vote/vote.service';

@Module({
  imports: [
    // ConfigModule.forRoot({ isGlobal: true }),
    // JwtModule.register({
    //   secret: process.env.JWT_CONSTANT,
    //   signOptions: { expiresIn: process.env.TOKEN_DURATION },
    // }),
    // TypeOrmModule.forRoot(dbConfig),
    // TypeOrmModule.forFeature(entities),
  ],

  controllers: [
    AuthController,
    AdminController,
    CandidateController,
    CategoryController,
    VoteController,
    VoterController,
  ],
  providers: [
    AuthService,
    AdminService,
    CandidateService,
    CategoryService,
    VoteService,
    VoterService,
  ],
})
export class AppModule {}
