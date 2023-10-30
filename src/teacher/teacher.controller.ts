import { Body, Controller, Delete, Get ,Param,Post,Put} from '@nestjs/common';
import { TeacherService } from './teacher.service';


@Controller('teacher')
export class StudentController implements ControllerInterface{
  constructor(private readonly teacherService: TeacherService) {}
   

@Get()
    async getAll(): Promise<any> {
        // throw new Error('Method not implemented.');
        return await this.teacherService.getAll()
    }
@Get(':id')
    async getOne( @Param() id: string): Promise<any> {
        return await this.teacherService.getOne(id)

        // throw new Error('Method not implemented.');
    }

@Post()
async create(@Body() updateDto: any): Promise<any> {
    return await this.teacherService.create(updateDto)
    // throw new Error('Method not implemented.');
}

@Put(':id')
    async update( @Body() updateDto: any, @Param() id: string): Promise<any> {
        return await this.teacherService.update(updateDto,id)
        // throw new Error('Method not implemented.');
    }
@Delete(':id')
    async delete( @Param() id: string): Promise<any> {
        return await this.teacherService.delete(id)

        // throw new Error('Method not implemented.');
    }
}
