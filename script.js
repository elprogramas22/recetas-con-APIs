const apiURL = "https://68cdd89b3c0563e1a7657333.mockapi.io/users/datos"

document.getElementById("buscador").addEventListener("click", () =>{
    const receta ={
        name: document.getElementById("nombre").value,
        tiempo: document.getElementById("tiempo").value,
        imagen: document.getElementById("imagen").value
    }
    fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(receta)
    })
    .then(() => {
        getData(); // Recarga la lista de recetas con sus IDs
        alert("Receta agregada exitosamente");
        // Limpia los campos
        document.getElementById("nombre").value = "";
        document.getElementById("tiempo").value = "";
        document.getElementById("imagen").value = "";
    });
});

function mostrarRecetas(recetas) {
    const contenedor = document.getElementById("foto-receta");
    contenedor.innerHTML = ""; // Limpia antes de mostrar
    recetas.forEach(receta => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "receta-tarjeta";
        tarjeta.innerHTML = `
            <img src="${receta.imagen}" alt="Imagen de la receta">
            <div>
                <strong>Nombre:</strong> ${receta.name} <br>
                <strong>Tiempo:</strong> ${receta.tiempo}
                <button class="borrar-btn">Borrar</button>
            </div>
        `;
        const btnBorrar = tarjeta.querySelector('.borrar-btn');
        btnBorrar.addEventListener('click', () => {
            borrarReceta(receta.id);
        });
        contenedor.appendChild(tarjeta);
    });
}

function getData(){
    fetch(apiURL)
    .then(respuesta => respuesta.json())
    .then (data => mostrarRecetas(data));
}

function borrarReceta(id) {
    fetch(`${apiURL}/${id}`, {
        method: "DELETE"
    })
    .then(() => getData());
}

// Cargar recetas al iniciar la página
window.onload = getData;