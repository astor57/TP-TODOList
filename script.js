document.addEventListener("DOMContentLoaded", () => {
    const entradaTarea = document.getElementById("taskInput");
    const cuerpoTablaTareas = document.getElementById("taskTableBody");
    const botonEliminarCompletadas = document.getElementById("eliminarCompletadas");
    
    //Vemos si el localStorage tiene algo guardado con la key tareas, si hay lo guarda como objeto con el JSON.parse y si no hay crea un array vacio
    let tareas;
    if (localStorage.getItem("tareas")) {
        tareas = JSON.parse(localStorage.getItem("tareas"));
    } else {
        tareas = [];
    }

    function muestraTareas() {
        let contenidoHTML = "";
        for (let i = 0; i < tareas.length; i++) {
            contenidoHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${tareas[i].nombre}</td>
                    <td><input type="checkbox" ${tareas[i].completada ? 'checked' : ''} onchange="alternarTarea(${i})"></td>
                    <td><button onclick="eliminarTarea(${i})" class="btn btn-danger">X</button></td>
                </tr>
            `;
        }
        cuerpoTablaTareas.innerHTML = contenidoHTML;
        //Almacenar la tarea usando JSON.stringify para pasar el array a cadena de texto antes de meterlo al localStorage
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    function agregarTarea() {
        const nombreTarea = entradaTarea.value.trim();
        if (nombreTarea !== "") {
            tareas.push({ nombre: nombreTarea, completada: false });
            entradaTarea.value = "";
            muestraTareas();
        }
    }

    document.getElementById("botonAgregar").addEventListener("click", agregarTarea);

    function alternarTarea(indice) {
        tareas[indice].completada = !tareas[indice].completada;
        muestraTareas();
    }

    function eliminarTarea(indice) {
        //en el array tareas elimina 1 elemento a partir de x posición (indice en este caso)
        tareas.splice(indice, 1);
        muestraTareas();
    }
    
    function eliminarTareasCompletadas() {
        //filter hace que en el array tareas se elimine todas las que tienen tarea.completada === true y nos da un nuevo array solo con las no completadas
        tareas = tareas.filter(tarea => !tarea.completada);
        muestraTareas();
    }

    botonEliminarCompletadas.onclick = eliminarTareasCompletadas;

    muestraTareas();
    window.alternarTarea = alternarTarea;
    window.eliminarTarea = eliminarTarea;
    window.eliminarTareasCompletadas = eliminarTareasCompletadas;
});
