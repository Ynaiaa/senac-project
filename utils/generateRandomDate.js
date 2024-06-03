const gerarDataAleatoria = () => {
    let random = Math.random() * 10
    let today = Date.now() + random
    let data = new Date(today)
    return data
}

module.exports = gerarDataAleatoria


