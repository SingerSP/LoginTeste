const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./db');

// Permite ler dados do corpo da requisição (vindo de formulários)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set('views', "./views");

// Página inicial
app.get('/', (req, res) => {
  res.render('index', {
    titulo: 'LandPage',
    nomeUsuario: 'Visitante'
  });
});

// Página de cadastro (formulário)
app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

app.get('/login', (req, res) =>{
    res.render('login')
})

// Recebe os dados do formulário e insere no banco
app.post('/cadastro', (req, res) => {
  const { email, senha } = req.body;

  const sql = 'INSERT INTO login (`Email`, `Senha`) VALUES (?, ?)';
  db.query(sql, [email, senha], (err, result) => {
    if (err) {
      console.error('❌ Erro ao cadastrar:', err);
      return res.status(500).send('Erro ao cadastrar usuário.');
    }

    console.log('✅ Usuário cadastrado com sucesso!');
    res.send('Usuário cadastrado com sucesso!');
  });
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;
  
    // SQL para verificar se o usuário existe
    const sql = 'SELECT * FROM login WHERE Email = ? AND Senha = ?';
  
    db.query(sql, [email, senha], (err, result) => {
      if (err) {
        console.error('❌ Erro ao verificar login:', err);
        return res.status(500).send('Erro no servidor ao tentar fazer login.');
      }
  
      if (result.length > 0) {
        console.log('✅ Login bem-sucedido!');
        res.send('Entrada com sucesso! ✅');
      } else {
        console.log('⚠️ Usuário ou senha incorretos.');
        res.status(401).send('Email ou senha incorretos.');
      }
    });
  });
  
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
