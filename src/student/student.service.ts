import { Injectable } from '@nestjs/common';
import { StudentDto } from './student.dto';

@Injectable()
export class StudentService implements ServiceInterface {
 
  async getAll(): Promise<any> {
      return 'getAll';
    // throw new Error('Method not implemented.');
  }
  async getOne(id:string): Promise<any> {
    return {name:'getOne',id};

    // throw new Error('Method not implemented.');
  }
  async create(createDto: any): Promise<any> {
    return createDto;
    // throw new Error('Method not implemented.');
  }
  async update(body:any, id:string): Promise<any> {
    return {body,id}
    // throw new Error('Method not implemented.');
  }
  async delete(id:string): Promise<any> {
    return {name:'delete',id}
    // throw new Error('Method not implemented.');
  }
}
