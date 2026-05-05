const Corrida = require('../models/Corrida');
const Categoria = require('../models/Categoria');

const CorridaController = {

    // cria corrida e calcula o valor com base na categoria
    async criar(req, res) {
        try {
            const { origem, destino, distancia, tempoEstimado, categoriaId } = req.body;

            if (!origem || !destino || !distancia || !tempoEstimado || !categoriaId) {
                return res.status(400).json({ erro: 'Preencha todos os campos' });
            }

            const categoria = await Categoria.findByPk(categoriaId);
            if (!categoria) {
                return res.status(404).json({ erro: 'Categoria nao encontrada' });
            }

            // calcula valor: base + (km * distancia)
            const valorTotal = categoria.valorBase + (categoria.valorPorKm * distancia);

            const corrida = await Corrida.create({
                origem,
                destino,
                distancia,
                tempoEstimado,
                valorTotal: parseFloat(valorTotal.toFixed(2)),
                categoriaId
            });

            const resultado = await Corrida.findByPk(corrida.id, {
                include: [{ model: Categoria, as: 'categoria' }]
            });

            res.status(201).json(resultado);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

    async listar(req, res) {
        try {
            const corridas = await Corrida.findAll({
                include: [{ model: Categoria, as: 'categoria' }]
            });
            res.json(corridas);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

    async buscarPorId(req, res) {
        try {
            const corrida = await Corrida.findByPk(req.params.id, {
                include: [{ model: Categoria, as: 'categoria' }]
            });

            if (!corrida) {
                return res.status(404).json({ erro: 'Corrida nao encontrada' });
            }

            res.json(corrida);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

    // atualiza e recalcula o valor se mudar distancia ou categoria
    async atualizar(req, res) {
        try {
            const corrida = await Corrida.findByPk(req.params.id);
            if (!corrida) {
                return res.status(404).json({ erro: 'Corrida nao encontrada' });
            }

            const { origem, destino, distancia, tempoEstimado, categoriaId } = req.body;

            // pega a categoria certa pra recalcular
            const catId = categoriaId || corrida.categoriaId;
            const categoria = await Categoria.findByPk(catId);
            if (!categoria) {
                return res.status(404).json({ erro: 'Categoria nao encontrada' });
            }

            const dist = distancia || corrida.distancia;
            const valorTotal = categoria.valorBase + (categoria.valorPorKm * dist);

            await corrida.update({
                origem: origem || corrida.origem,
                destino: destino || corrida.destino,
                distancia: dist,
                tempoEstimado: tempoEstimado || corrida.tempoEstimado,
                valorTotal: parseFloat(valorTotal.toFixed(2)),
                categoriaId: catId
            });

            const atualizada = await Corrida.findByPk(corrida.id, {
                include: [{ model: Categoria, as: 'categoria' }]
            });

            res.json(atualizada);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

    async deletar(req, res) {
        try {
            const corrida = await Corrida.findByPk(req.params.id);
            if (!corrida) {
                return res.status(404).json({ erro: 'Corrida nao encontrada' });
            }

            await corrida.destroy();
            res.json({ mensagem: 'Corrida removida' });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
};

module.exports = CorridaController;
