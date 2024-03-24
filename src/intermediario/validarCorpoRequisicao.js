const validarCorpoReq = arrayPropiedades =>(req,res,next)=>{
    for (const item of arrayPropiedades) {
        if(!req.body[item]){
            return res.status(400).json({mensagem:`O campo ${item} é obrigatório!`})
        }
        
    }
    next()
}

module.exports = validarCorpoReq