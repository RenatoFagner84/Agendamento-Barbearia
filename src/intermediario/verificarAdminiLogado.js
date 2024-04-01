const senhaJWT = require("../senhaJWT")
const jwt = require('jsonwebtoken')

const verificarAdminLogado = async (req, res, next) => {
    const {authorization} = req.headers
 

    try {
        const token = authorization.split(' ')[1]
       if(!token){
        return res.status(401).json({mensagem:'Não autorizado'})
       }
       
       const admin = jwt.verify(token, senhaJWT)
     req.admin = {
        email:admin.email
     }
        next()
    } catch (error) {
        console.error(error)
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = verificarAdminLogado