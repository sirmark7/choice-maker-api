import { Body, Controller, Delete, Get ,Param,Post,Put} from '@nestjs/common';
import { StudentService } from './student.service';


@Controller('student')
export class StudentController implements ControllerInterface{
  constructor(private readonly studentService: StudentService) {}
   

@Get()
    async getAll(): Promise<any> {
        // throw new Error('Method not implemented.');
        return await this.studentService.getAll()
    }
@Get(':id')
    async getOne( @Param() id: string): Promise<any> {
        return await this.studentService.getOne(id)

        // throw new Error('Method not implemented.');
    }

@Post()
async create(@Body() updateDto: any): Promise<any> {
    return await this.studentService.create(updateDto)
    // throw new Error('Method not implemented.');
}

@Put(':id')
    async update( @Body() updateDto: any, @Param() id: string): Promise<any> {
        return await this.studentService.update(updateDto,id)
        // throw new Error('Method not implemented.');
    }
@Delete(':id')
    async delete( @Param() id: string): Promise<any> {
        return await this.studentService.delete(id)

        // throw new Error('Method not implemented.');
    }
}
