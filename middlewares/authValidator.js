import Pkg from 'joi'


const Shema= Pkg.object({
    personalId:Pkg.string().min(6).required(),
    password:Pkg.string().min(8).required(),
    name:Pkg.string().required()
})

export default Shema