document.addEventListener("DOMContentLoaded", () => {
    const entradaTarea = document.getElementById("taskInput");
    const cuerpoTablaTareas = document.getElementById("taskTableBody");
    const botonEliminarCompletadas = document.getElementById("eliminarCompletadas");
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    function renderizarTareas() {
        cuerpoTablaTareas.innerHTML = "";
        tareas.forEach((tarea, indice) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${indice + 1}</td>
                <td>${tarea.nombre}</td>
                <td><input type="checkbox" ${tarea.completada ? 'checked' : ''} data-index="${indice}" onchange="alternarTarea(${indice})"></td>
                <td><input type="checkbox" data-index="${indice}" onclick="eliminarTarea(${indice})" class="btn btn-danger"></td>
            `;
            cuerpoTablaTareas.appendChild(fila);
        });
        localStorage.setItem("tareas", JSON.stringify(tareas));
    }

    function agregarTarea() {
        const nombreTarea = entradaTarea.value.trim();
        if (nombreTarea) {
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

    botonEliminarCompletadas.addEventListener("click", eliminarTareasCompletadas);

    renderizarTareas();
    window.agregarTarea = agregarTarea;
    window.alternarTarea = alternarTarea;
    window.eliminarTarea = eliminarTarea;
    window.eliminarTareasCompletadas = eliminarTareasCompletadas;
});