const Categoria = require('../models/Categoria');

const CategoriaController = {

    async criar(req, res) {
        try {
            const { nome, valorBase, valorPorKm } = req.body;

            if (!nome || valorBase == null || valorPorKm == null) {
                return res.status(400).json({ erro: 'Preencha todos os campos' });
            }

            const categoria = await Categoria.create({ nome, valorBase, valorPorKm });
            res.status(201).json(categoria);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

    async listar(req, res) {
        try {
            const categorias = await Categoria.findAll();
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

    async buscarPorId(req, res) {
        try {
            const categoria = await Categoria.findByPk(req.params.id);

            if (!categoria) {
                return res.status(404).json({ erro: 'Categoria nao encontrada' });
            }

            res.json(categoria);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

    // atualiza os campos que vieram no body
    async atualizar(req, res) {
        try {
            const categoria = await Categoria.findByPk(req.params.id);

            if (!categoria) {
                return res.status(404).json({ erro: 'Categoria nao encontrada' });
            }

            await categoria.update(req.body);
            res.json(categoria);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

    async deletar(req, res) {
        try {
            const categoria = await Categoria.findByPk(req.params.id);

            if (!categoria) {
                return res.status(404).json({ erro: 'Categoria nao encontrada' });
            }

            await categoria.destroy();
            res.json({ mensagem: 'Categoria removida' });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
};

module.exports = CategoriaController;
