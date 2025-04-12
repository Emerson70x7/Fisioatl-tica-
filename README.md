<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FisioAtlética Gestão</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="splash">
    <img src="aprovado.jpg" alt="Logo FisioAtlética">
  </div>
  <div class="app-container" style="display: none;">
    <div class="sidebar">
      <img src="aprovado.jpg" alt="Logo FisioAtlética">
      <div class="menu-item active" onclick="navigate('home')">Início</div>
      <div class="menu-item" onclick="navigate('sobre')">Sobre</div>
      <div class="menu-item" onclick="navigate('servicos')">Serviços</div>
      <div class="menu-item" onclick="navigate('depoimentos')">Depoimentos</div>
      <div class="menu-item" onclick="navigate('contato')">Contato</div>
      <div class="menu-item" onclick="navigate('login')">Login</div>
    </div>
    <div class="content">
      <div id="home" class="section active">
        <h1>Bem-vindo à FisioAtlética</h1>
        <p>Cuidando do seu movimento, transformando sua saúde.</p>
      </div>
      <div id="sobre" class="section">
        <h1>Sobre Nós</h1>
        <p>Fisioterapia e Pilates personalizados na Vila Mariana.</p>
      </div>
      <div id="servicos" class="section">
        <h1>Serviços</h1>
        <ul>
          <li>Pilates personalizado</li>
          <li>Fisioterapia esportiva</li>
          <li>Reabilitação pós-cirúrgica</li>
          <li>Tratamento de dores crônicas</li>
        </ul>
      </div>
      <div id="depoimentos" class="section">
        <h1>Depoimentos</h1>
        <blockquote>"Excelente atendimento e profissionalismo." - Maria S.</blockquote>
        <blockquote>"Professores incríveis. Recomendo!" - João P.</blockquote>
      </div>
      <div id="contato" class="section">
        <h1>Contato</h1>
        <p>Rua Vergueiro, 3185 - Vila Mariana, SP</p>
        <p>WhatsApp: (11) 98879-7362</p>
        <p>Instagram: @fisioatletica</p>
      </div>
      <div id="login" class="section">
        <h1>Login</h1>
        <form onsubmit="login(event)">
          <input type="text" id="username" placeholder="Usuário" required><br><br>
          <input type="password" id="password" placeholder="Senha" required><br><br>
          <button type="submit">Entrar</button>
        </form>
      </div>
      <div id="painel" class="section">
        <h1>Painel de Gestão</h1>
        <button onclick="navigate('alunos')">Área de Alunos</button>
        <button onclick="navigate('agenda')">Agenda</button>
      </div>
      <div id="alunos" class="section">
        <h1>Área de Alunos</h1>
        <form onsubmit="addAluno(event)">
          <input type="text" id="nomeAluno" placeholder="Nome do aluno" required>
          <button type="submit">Adicionar Aluno</button>
        </form>
        <ul id="listaAlunos"></ul>
      </div>
      <div id="agenda" class="section">
        <h1>Agenda de Aulas</h1>
        <form onsubmit="addAula(event)">
          <input type="text" id="descAula" placeholder="Descrição da aula" required>
          <input type="datetime-local" id="dataAula" required>
          <button type="submit">Agendar Aula</button>
        </form>
        <ul id="listaAulas"></ul>
      </div>
    </div>
  </div>
  <button class="agendar-btn" onclick="window.open('https://wa.me/5511988797362', '_blank')">Agendar Aula</button>
  <script src="script.js"></script>
</body>
</html>

function navigate(section) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(section).classList.add('active');
  document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
  const activeMenuItem = Array.from(document.querySelectorAll('.menu-item')).find(item => item.textContent.toLowerCase() === section);
  if (activeMenuItem) activeMenuItem.classList.add('active');
}

function login(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username === 'admin' && password === 'admin') {
    alert('Login bem-sucedido!');
    navigate('painel');
  } else {
    alert('Usuário ou senha incorretos!');
  }
}

window.onload = function() {
  setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
    document.querySelector('.app-container').style.display = 'flex';
    loadAlunos();
    loadAulas();
  }, 1500);
};

function addAluno(event) {
  event.preventDefault();
  const nome = document.getElementById('nomeAluno').value;
  if (!nome) return;
  const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
  alunos.push(nome);
  localStorage.setItem('alunos', JSON.stringify(alunos));
  document.getElementById('nomeAluno').value = '';
  loadAlunos();
}

function loadAlunos() {
  const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
  const lista = document.getElementById('listaAlunos');
  lista.innerHTML = '';
  alunos.forEach((aluno, index) => {
    const li = document.createElement('li');
    li.textContent = aluno + ' ';
    const excluir = document.createElement('button');
    excluir.textContent = 'Excluir';
    excluir.onclick = () => {
      alunos.splice(index, 1);
      localStorage.setItem('alunos', JSON.stringify(alunos));
      loadAlunos();
    };
    li.appendChild(excluir);
    lista.appendChild(li);
  });
}

function addAula(event) {
  event.preventDefault();
  const descricao = document.getElementById('descAula').value;
  const data = document.getElementById('dataAula').value;
  if (!descricao || !data) return;
  const aulas = JSON.parse(localStorage.getItem('aulas')) || [];
  aulas.push({ descricao, data, presença: false });
  localStorage.setItem('aulas', JSON.stringify(aulas));
  document.getElementById('descAula').value = '';
  document.getElementById('dataAula').value = '';
  loadAulas();
}

function loadAulas() {
  const aulas = JSON.parse(localStorage.getItem('aulas')) || [];
  const lista = document.getElementById('listaAulas');
  lista.innerHTML = '';
  aulas.forEach((aula, index) => {
    const li = document.createElement('li');
    li.textContent = `${aula.descricao} - ${new Date(aula.data).toLocaleString()} - Presença: ${aula.presença ? 'Sim' : 'Não'} `;
    const marcarPresença = document.createElement('button');
    marcarPresença.textContent = 'Marcar Presença';
    marcarPresença.onclick = () => {
      aulas[index].presença = true;
      localStorage.setItem('aulas', JSON.stringify(aulas));
      loadAulas();
    };
    const excluir = document.createElement('button');
    excluir.textContent = 'Excluir';
    excluir.onclick = () => {
      aulas.splice(index, 1);
      localStorage.setItem('aulas', JSON.stringify(aulas));
      loadAulas();
    };
    li.appendChild(marcarPresença);
    li.appendChild(excluir);
    lista.appendChild(li);
  });
}

