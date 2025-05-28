const contenedor = document.getElementById("contenedorPersonajes");
const inputBuscar = document.getElementById("buscar");
const resultado = document.getElementById("resultado");

let todosLosPaises = []; //  Variable global 


function mostrarPaises(paises) {
  resultado.innerHTML = ""; // limpia resultados

  paises.forEach(pais => {
    const div = document.createElement("div");
    div.classList.add("card");

    const nombre = pais.name?.official || "Sin nombre";
    const bandera = pais.flags?.png || "";
    const region = pais.region || "Desconocida";
    const poblacion = pais.population?.toLocaleString() || "Desconocida";

    div.innerHTML = `
      <img src="${bandera}" alt="Bandera de ${nombre}">
      <div><strong>${nombre}</strong></div>
      <p>Región: ${region}</p>
      <p>Población: ${poblacion}</p>
    `;

    resultado.appendChild(div);
  });
}

// Petición a la API y guardar en la variable global
fetch("https://restcountries.com/v3.1/all")
  .then(res => res.json())
  .then(data => {
    todosLosPaises = data;
    mostrarPaises(todosLosPaises); // Muestra todos al inicio
  })
  .catch(error => console.error("Error al obtener países:", error));

// ✅ Evento de búsqueda en tiempo real
inputBuscar.addEventListener("input", () => {
  const texto = inputBuscar.value.toLowerCase();
  const paisesFiltrados = todosLosPaises.filter(pais =>
    pais.name?.official.toLowerCase().includes(texto)
  );
  mostrarPaises(paisesFiltrados);
});
