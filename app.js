// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let amigos = []; // Lista de participantes
let asignaciones = {}; // Resultado del sorteo

// Agregar amigo a la lista
function agregarAmigo() {
  const input = document.getElementById("amigo");
  const nombre = input.value.trim();

  if (nombre === "") {
    alert("Por favor, escribe un nombre.");
    return;
  }

  if (amigos.includes(nombre)) {
    alert("Ese nombre ya fue agregado.");
    return;
  }

  amigos.push(nombre);
  mostrarLista();
  input.value = "";
}

// Mostrar la lista de amigos agregados
function mostrarLista() {
  const lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";

  amigos.forEach(amigo => {
    const li = document.createElement("li");
    li.textContent = amigo;
    lista.appendChild(li);
  });
}

// Generar una permutación sin autoasignaciones (derangement)
function generarAsignaciones(names) {
  if (names.length < 2) {
    alert("Se necesitan al menos 2 participantes.");
    return null;
  }

  let indices = names.map((_, i) => i);
  let shuffled;
  let attempts = 0;

  do {
    shuffled = [...indices];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    attempts++;
    if (attempts > 1000) {
      alert("No se pudo generar una asignación válida.");
      return null;
    }
  } while (shuffled.some((val, i) => val === i));

  let resultado = {};
  for (let i = 0; i < names.length; i++) {
    resultado[names[i]] = names[shuffled[i]];
  }
  return resultado;
}

// Sortear Amigo Secreto
function sortearAmigo() {
  if (amigos.length < 2) {
    alert("Agrega al menos dos nombres antes de sortear.");
    return;
  }

  asignaciones = generarAsignaciones(amigos);

  const listaResultado = document.getElementById("resultado");
  listaResultado.innerHTML = "";

  for (const [persona, asignado] of Object.entries(asignaciones)) {
    const li = document.createElement("li");
    li.textContent = `${persona} → ${asignado}`;
    listaResultado.appendChild(li);
  }
}
