interface ServiceInterface{
    getAll():Promise<any>;
    getOne(id:string):Promise<any>;
    create(createDto:any):Promise<any>;
    update(updateDto:any, id:string):Promise<any>;
    delete(id:string):Promise<any>;
}