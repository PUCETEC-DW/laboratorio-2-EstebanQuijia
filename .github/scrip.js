const contenedor = document.getElementById("contenedorPaises");

fetch("https://restcountries.com/v3.1/all")
  .then((respuesta) => {
    return respuesta.json();
  })
  .then((paises) => {
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
  })
  .catch((error) => {
    console.error("Error al hacer la petición", error);
  });
