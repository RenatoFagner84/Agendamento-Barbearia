const validarAdmin = async (req, res, next) => {
    try {
        await schema.validateAsync(req.body)
        next()
    } catch (error) {
        console.error(error)
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = validarAdmin
