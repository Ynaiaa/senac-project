const mockCategorias = require('../database/mockCategorias')

exports.getCategorias = async (req, res) => {
    const categorias = mockCategorias.listarCategorias()
    res.status(200).json(categorias)
}
