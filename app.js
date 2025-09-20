// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación.
// Aquí deberás desarrollar la lógica para resolver el problema.

// Bases
const campoNombre = document.getElementById("amigo"); 
const listaAmigosEl = document.getElementById("listaAmigos"); 
const resultadoEl = document.getElementById("resultado"); 

// Botones
const btnAgregarEl = document.getElementById("btnAgregar");
const btnSortearEl = document.getElementById("btnSortear");
const btnResetEl = document.getElementById("btnReset");

// Eventos
btnAgregarEl.addEventListener("click", agregarAmigo);
btnSortearEl.addEventListener("click", sortearAmigo);
btnResetEl.addEventListener("click", resetearLista);

// Para agregar amigo
function agregarAmigo() {
  const nombre = campoNombre.value.trim();
  const regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/;

  if (nombre.length < 2) {
    alert("El nombre debe tener mínimo 2 caracteres.");
    return;
  }
  if (!regexNombre.test(nombre)) {
    alert(`"${nombre}" contiene caracteres no permitidos.`);
    return;
  }

  const listaActual = Array.from(listaAmigosEl.querySelectorAll("li"))
    .map(li => li.textContent);

  if (listaActual.some(n => n.toLowerCase() === nombre.toLowerCase())) {
    alert(`El nombre "${nombre}" ya está en la lista.`);
    return;
  }

  // Crear nuevo <li>
  const nuevoItem = document.createElement("li");
  nuevoItem.textContent = nombre;
  listaAmigosEl.appendChild(nuevoItem);

  campoNombre.value = "";
  actualizarUI();
}

// Sorteo de amigo
function sortearAmigo() {
  const participantes = Array.from(listaAmigosEl.querySelectorAll("li"))
    .map(li => li.textContent);

  if (participantes.length < 2) {
    resultadoEl.innerHTML = `<li>Debes ingresar al menos 2 participantes.</li>`;
    return;
  }

  const randomIndex = Math.floor(Math.random() * participantes.length);
  const elegido = participantes[randomIndex].toLocaleUpperCase();

  resultadoEl.innerHTML = `<li>🎉 El amigo secreto es: <strong>${elegido}</strong></li>`;
}

// Resetear lista
function resetearLista() {
  const confirmar = confirm("¿Seguro que deseas reiniciar la lista?");
  if (!confirmar) return;

  listaAmigosEl.innerHTML = "";
  resultadoEl.innerHTML = "";
  actualizarUI();
}

// Actualizar interfaz
function actualizarUI() {
  const total = listaAmigosEl.querySelectorAll("li").length;
  btnSortearEl.disabled = total < 2;
  btnAgregarEl.disabled = campoNombre.value.trim() === "";
}

// Inicialización
actualizarUI();