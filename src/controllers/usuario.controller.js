import * as usuarioModel from "../models/usuario.model.js";
import crypto from "crypto";

// LISTAR TODOS OS USUÁRIOS
export async function listar(req, res) {

    const usuarios = await usuarioModel.listarUsuarios();

    res.status(200).json(usuarios);
}



// BUSCAR USUÁRIO POR ID
export async function buscarPorId(req, res) {

    const id = req.params.id;

    const usuario = await usuarioModel.buscarUsuarioPorId(id);

    if (!usuario) {
        return res.status(404).json({
            msg: "Usuário não encontrado"
        });
    }

    res.status(200).json(usuario);
}



// CRIAR USUÁRIO
export async function criar(req, res) {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            msg: "Nome, email e senha são obrigatórios"
        });
    }

    // criptografar senha
    const senha_hash = crypto
        .createHash("sha256")
        .update(senha)
        .digest("hex");

    const id = await usuarioModel.criarUsuario({
        nome,
        email,
        senha_hash
    });

    res.status(201).json({
        msg: "Usuário criado com sucesso",
        id
    });
}



// LOGIN
export async function login(req, res) {

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            msg: "Email e senha são obrigatórios"
        });
    }

    const usuario = await usuarioModel.buscarUsuarioPorEmail(email);

    if (!usuario) {
        return res.status(404).json({
            msg: "Usuário não encontrado"
        });
    }

    const senha_hash = crypto
        .createHash("sha256")
        .update(senha)
        .digest("hex");

    if (usuario.senha_hash !== usuario.senha_hash) {
        return res.status(401).json({
            msg: "Senha incorreta"
        });
    }

    res.status(200).json({
        msg: "Login realizado com sucesso",
        usuario
    });
}