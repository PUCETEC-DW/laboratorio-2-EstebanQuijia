let paises = [];

const buscarInput = document.getElementById('buscar');
const resultadoDiv = document.getElementById('resultado');
const contenedorPaises = document.getElementById('contenedorPaises');

// Obtener datos de la API
fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
        paises = data;
        mostrarPaises(paises);
    })
    .catch(error => {
        resultadoDiv.textContent = 'Error al cargar los países.';
    });

// Mostrar países en el DOM
function mostrarPaises(lista) {
    contenedorPaises.innerHTML = '';
    resultadoDiv.textContent = `Resultados: ${lista.length}`;
    lista.forEach(pais => {
        const div = document.createElement('div');
        div.className = 'pais';
        div.innerHTML = `
            <img src="${pais.flags.svg}" alt="Bandera de ${pais.name.official}">
            <div>
                <strong>${pais.name.official}</strong><br>
                Región: ${pais.region}<br>
                Población: ${pais.population.toLocaleString()}
            </div>
        `;
        contenedorPaises.appendChild(div);
    });
}

// Filtrar países por nombre
buscarInput.addEventListener('input', function() {
    const texto = buscarInput.value.toLowerCase();
    const filtrados = paises.filter(pais =>
        pais.name.official.toLowerCase().includes(texto)
    );
    mostrarPaises(filtrados);
});