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
    });
    mostrarImagen(receta); // Mostrar la imagen y los datos en la página
    alert("Receta agregada exitosamente")
})

function mostrarImagen(receta) {
    const contenedor = document.getElementById("foto-receta");
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
}

function getData(){
    fetch(apiURL)
    .then(respuesta => respuesta.json())
    .then (data => console.log(data))
}

function borrarReceta(id) {
    fetch(`${apiURL}/${id}`, {
        method: "DELETE"
    })
    .then(() => getData());
}