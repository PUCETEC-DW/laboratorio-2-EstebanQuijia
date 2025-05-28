let paisesGlobal = []; // Variable global para guardar los países

const contenedor = document.getElementById("contenedorPaises");
const buscarInput = document.getElementById("buscar");
const resultadoDiv = document.getElementById("resultado");

fetch("https://restcountries.com/v3.1/all")
  .then((respuesta) => respuesta.json())
  .then((paises) => {
    paisesGlobal = paises; // Guardar en variable global
    mostrarPaises(paisesGlobal);
  })
  .catch((error) => {
    console.error("Error al hacer la petición", error);
  });

function mostrarPaises(paises) {
  contenedor.innerHTML = ""; // Limpiar contenedor
  paises.forEach((pais) => {
    const div = document.createElement("div");
    div.classList.add("card");

    const nombre = pais.name?.official || "Sin nombre";
    const bandera = pais.flags?.png || "";
    const region = pais.region || "Desconocida";
    const poblacion = pais.population?.toLocaleString() || "Desconocida";

    div.innerHTML = `
      <img src="${bandera}" alt="Bandera de ${nombre}">
      <div class="nombre-pais"><strong>${nombre}</strong></div>
      <p>Región: ${region}</p>
      <p>Población: ${poblacion}</p>
    `;

    contenedor.appendChild(div);
  });
}

// Filtrado dinámico
buscarInput.addEventListener("input", function () {
  const texto = buscarInput.value.toLowerCase();
  const filtrados = paisesGlobal.filter((pais) =>
    pais.name?.official?.toLowerCase().includes(texto)
  );
  mostrarPaises(filtrados);

  // Mostrar cantidad de resultados
  resultadoDiv.textContent = `Resultados: ${filtrados.length}`;
});