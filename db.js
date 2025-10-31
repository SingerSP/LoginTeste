const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',       // ou o IP do servidor MySQL
  user: 'root',            // seu usuário
  password: '',            // sua senha (se houver)
  database: 'bancodedados'  // nome do seu banco
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao Banco de Dados:', err);
    return;
  }
  console.log('✅ Conectado ao banco de dados MySQL!');
});

// ⚠️ Aqui é o ponto importante: exporta a conexão real
module.exports = connection;
