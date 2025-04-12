
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

// Splash Screen
window.onload = function() {
  setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
    document.querySelector('.app-container').style.display = 'flex';
    loadAlunos();
    loadAulas();
  }, 1500);
};

// Gestão de Alunos
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

// Gestão de Aulas
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
