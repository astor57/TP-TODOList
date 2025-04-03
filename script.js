document.addEventListener("DOMContentLoaded", () => {
    const entradaTarea = document.getElementById("taskInput");
    const cuerpoTablaTareas = document.getElementById("taskTableBody");
    const botonEliminarCompletadas = document.getElementById("eliminarCompletadas");
    let tareas = localStorage.getItem("tareas") ? JSON.parse(localStorage.getItem("tareas")) : [];

    function renderizarTareas() {
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
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    function agregarTarea() {
        const nombreTarea = entradaTarea.value.trim();
        if (nombreTarea !== "") {
            tareas.push({ nombre: nombreTarea, completada: false });
            entradaTarea.value = "";
            renderizarTareas();
        }
    }

    function alternarTarea(indice) {
        tareas[indice].completada = !tareas[indice].completada;
        renderizarTareas();
    }

    function eliminarTarea(indice) {
        tareas.splice(indice, 1);
        renderizarTareas();
    }

    function eliminarTareasCompletadas() {
        tareas = tareas.filter(tarea => !tarea.completada);
        renderizarTareas();
    }

    botonEliminarCompletadas.onclick = eliminarTareasCompletadas;

    renderizarTareas();
    window.agregarTarea = agregarTarea;
    window.alternarTarea = alternarTarea;
    window.eliminarTarea = eliminarTarea;
    window.eliminarTareasCompletadas = eliminarTareasCompletadas;
});
