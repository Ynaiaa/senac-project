const app = require('./app')
const port = process.env.PORT || 3000

app.listen(port, '192.168.18.41', () => {
  console.log(`Servidor rodando em http://192.168.18.41:${port}`)
});