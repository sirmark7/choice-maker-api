import { object } from 'joi'

const Shema= object({
    userName:string().min(4).required(),
    password:string().min(8).require()
})

export default Shema