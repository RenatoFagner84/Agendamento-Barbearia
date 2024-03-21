const bcrypt = require('bcrypt')
const pool = require('../config/conexao')
const jwt = require('jsonwebtoken')
const senhaJWT = require('../senhaJWT')

const cadastrarUsuario = async (req, res) => {
    const { nome, email,telefone, senha } = req.body

    try {
        const emailExiste = await pool.query('select * from cliente where email = $1', [email])
         if(emailExiste.rowCount > 0){
            return res.status(400).json({mensagem:'Email existente!'})
         }
         const telefoneExiste = await pool.query('select * from cliente where telefone = $1', [telefone])
         if(telefoneExiste.rowCount > 0){
            return res.status(400).json({mensagem:'Telefone existente!'})
         }

        const senhaCriptografada = await bcrypt.hash(senha, 10)
        
       const query = `
       insert into cliente(nome, email,telefone, senha)
       values($1, $2, $3, $4) returning *
       `
       const { rows } = await pool.query(query, [nome, email, telefone, senhaCriptografada])
       const { senha: _, ...usuario } = rows[0]
       return res.status(201).json(usuario)
       
    } catch (error) {
        console.log(error)

        return res.status(500).json({ mensagem: 'Erro interno no servidor' })

    }
}

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const { rows, rowCount } = await pool.query('SELECT * FROM cliente WHERE email = $1', [email]);
        if (rowCount === 0) {
            return res.status(400).json({ mensagem: 'Email ou senha inválidos!' });
        }

        const { senha: senhaUsuario, ...usuario } = rows[0];
        const senhaCorreta = await bcrypt.compare(senha, senhaUsuario);

        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: 'Email ou senha inválidos!' });
        }

        const token = jwt.sign({ id: usuario.id }, senhaJWT, { expiresIn: '8h' });
        return res.json({
            usuario,
            token
        });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}

module.exports = {
    cadastrarUsuario,
    login
}