const bcrypt = require('bcrypt');
const pool = require('../config/conexao');
const jwt = require('jsonwebtoken');
const senhaJWT = require('../senhaJWT');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, telefone, senha } = req.body

    try {
        
        const emailExistente = await pool.query('SELECT * FROM cliente WHERE email = $1', [email])
        if (emailExistente.rowCount > 0) {
            return res.status(400).json({ mensagem: 'Email já cadastrado.' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const query = `
            INSERT INTO cliente(nome, email, telefone, senha)
            VALUES($1, $2, $3, $4)
            RETURNING id, nome, email, telefone
        `;
        const { rows } = await pool.query(query, [nome, email, telefone, senhaCriptografada]);
        const usuario = rows[0]
        return res.status(201).json(usuario)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const { rows, rowCount } = await pool.query('SELECT * FROM cliente WHERE email = $1', [email])
        if (rowCount === 0) {
            return res.status(400).json({ mensagem: 'Email ou senha inválidos!' })
        }

        const { senha: senhaUsuario, ...usuario } = rows[0];
        const senhaCorreta = await bcrypt.compare(senha, senhaUsuario)

        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: 'Email ou senha inválidos!' })
        }

        const token = jwt.sign({ id: usuario.id }, senhaJWT, { expiresIn: '8h' })
        return res.json({ usuario, token });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

const agendarServico = async (req, res) => {
    const { user_Id, servico_id, horario } = req.body;

    try {
        const usuarioExistente = await pool.query('SELECT * FROM cliente WHERE id = $1', [user_Id])
        if (usuarioExistente.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' })
        }

        
        const query = `
            INSERT INTO agendamentos(cliente_id, servico_id, data_hora)
            VALUES($1, $2, $3)
            RETURNING *
        `;
        const { rows } = await pool.query(query, [user_Id, servico_id, horario])
        const agendamento = rows[0]
        return res.status(201).json(agendamento)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

const visualizarDisponibilidade = async (req, res) => {
    const { servico } = req.query

    try {
        const query = `
            SELECT data_hora FROM agendamentos
            WHERE servico_id = (SELECT id FROM servicos WHERE nome = $1)
            AND data_hora > NOW()
            ORDER BY data_hora
        `;
        const { rows } = await pool.query(query, [servico])
        const horariosDisponiveis = rows.map(row => row.data_hora)
        return res.json(horariosDisponiveis)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}



const gerenciarAgendamentos = async (req, res) => {
    const { userId } = req.params

    try {
        const query = `
            SELECT * FROM agendamentos
            WHERE cliente_id = $1
            ORDER BY data_hora
        `;
        const { rows } = await pool.query(query, [userId])
        const agendamentos = rows
        return res.json(agendamentos)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno no servidor' })
    }
}

module.exports = {
    cadastrarUsuario,
    login,
    agendarServico,
    visualizarDisponibilidade,
    gerenciarAgendamentos
}
