const bcrypt = require('bcrypt')
const pool = require('../config/conexao')
const jwt = require('jsonwebtoken')
const senhaJWT = require('../senhaJWT')


const cadastrarAdministradores = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
    
        
        const adminExistente = await pool.query('SELECT * FROM administradores WHERE email = $1', [email])
        if (adminExistente.rowCount > 0) {
            return res.status(400).json({ mensagem: 'Email já cadastrado como administrador.' })
        }

    
        const senhaCriptografada = await bcrypt.hash(senha, 10)

    
        const query = `
            INSERT INTO administradores (nome, email, senha)
            VALUES ($1, $2, $3)
            RETURNING id, nome, email
        `;
        const { rows } = await pool.query(query, [nome, email, senhaCriptografada])
        const novoAdmin = rows[0]

       
        const token = jwt.sign({ id: novoAdmin.id }, senhaJWT, { expiresIn: '8h' })

        return res.status(201).json({ admin: novoAdmin, token })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}
const loginAdministrador = async (req, res) => {
    const { email, senha } = req.body

    try {
        const { rows, rowCount } = await pool.query('SELECT * FROM administradores WHERE email = $1', [email])
        if (rowCount === 0) {
            return res.status(400).json({ mensagem: 'Email ou senha inválidos!' })
        }

        const { senha: senhaUsuario, ...admin } = rows[0]
        const senhaCorreta = await bcrypt.compare(senha, senhaUsuario)

        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: 'Email ou senha inválidos!' })
        }

        const token = jwt.sign({ id: admin.id }, senhaJWT, { expiresIn: '8h' })
        return res.json({ admin, token })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

const listarClientes = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM Cliente')
        console.log(rows)
        return res.json(rows)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

const bloquearCliente = async (req, res) => {
    const cliente_id = req.params.id

    try {
        const { rowCount } = await pool.query('UPDATE Cliente SET bloqueado = true WHERE id = $1', [cliente_id])
        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' })
        }
        return res.status(200).json({ mensagem: 'Cliente bloqueado com sucesso.' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

const excluirCliente = async (req, res) => {
    const cliente_id = req.params.id

    try {
        const { rowCount } = await pool.query('DELETE FROM Cliente WHERE id = $1', [cliente_id])
        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado.' })
        }
        return res.status(200).json({ mensagem: 'Cliente excluído com sucesso.' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

const listarAgendamentos = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM Agendamentos')
        return res.json(rows)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

module.exports = {
    cadastrarAdministradores,
    loginAdministrador,
    listarClientes,
    bloquearCliente,
    excluirCliente,
    listarAgendamentos
}
