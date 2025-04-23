document.addEventListener("DOMContentLoaded", () => {
    const entradaTarea = document.getElementById("taskInput");
    const cuerpoTablaTareas = document.getElementById("taskTableBody");
    const botonEliminarCompletadas = document.getElementById("eliminarCompletadas");
    const selectFiltro = document.getElementById("filtroTareas");
    
    //Vemos si el localStorage tiene algo guardado con la key tareas, si hay lo guarda como objeto con el JSON.parse y si no hay crea un array vacio
    let tareas;
    if (localStorage.getItem("tareas")) {
        tareas = JSON.parse(localStorage.getItem("tareas"));
    } else {
        tareas = [];
    }

    function muestraTareas() {
        let contenidoHTML = "";
        const filtro = selectFiltro.value;

        const tareasFiltradas = tareas.filter(tarea => {
            if (filtro === "completadas") return tarea.completada;
            if (filtro === "pendientes") return !tarea.completada;
            return true; 
        });

        for (let i = 0; i < tareasFiltradas.length; i++) {
            const tarea = tareasFiltradas[i];
            const estiloTexto = tareas[i].completada ? 'style="text-decoration: line-through;"' : '';
            const indiceReal = tareas.indexOf(tarea); // por si el array está filtrado
            contenidoHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td ${estiloTexto}>${tareasFiltradas[i].nombre}</td>
                    <td><input type="checkbox" ${tareas[i].completada ? 'checked' : ''} onchange="alternarTarea(${i})"></td>
                    <td><button onclick="eliminarTarea(${indiceReal})" class="btn btn-danger">X</button></td>
                </tr>
            `;
        }
        cuerpoTablaTareas.innerHTML = contenidoHTML;
        //Almacenar la tarea usando JSON.stringify para pasar el array a cadena de texto antes de meterlo al localStorage
        localStorage.setItem("tareas", JSON.stringify(tareas));
        mostrarTareaMasRapida();
    }

    function agregarTarea() {
        const nombreTarea = entradaTarea.value.trim();
        if (nombreTarea !== "") {
            tareas.push({ nombre: nombreTarea, completada: false, fechaCreacion: new Date(), fechaCompletado: null});
            entradaTarea.value = "";
            muestraTareas();
        }
    }

    document.getElementById("botonAgregar").addEventListener("click", agregarTarea);

    function alternarTarea(indice) {
            tareas[indice].completada = !tareas[indice].completada;
        
            if (tareas[indice].completada) {
                tareas[indice].fechaCompletado = new Date().toISOString();
            } else {
                tareas[indice].fechaCompletado = null;
            }
        
            muestraTareas();
    }

    function mostrarTareaMasRapida() {
        const tareasCompletadas = tareas.filter(t => t.completada && t.completadaEn);
            if (tareasCompletadas.length === 0) {
                mostrarTareaMasRapida.textContent = "No hay tareas aún.";
                return;
            }

            let masRapida = tareasCompletadas.reduce((masRapida, t) => {
                const tiempo = new Date(t.completadaEn) - new Date(t.creadaEn);
                return tiempo < masRapida.tiempo ? { tarea: t, tiempo } : masRapida;
            }, { tarea: null, tiempo: Infinity });

            const segundos = (masRapida.tiempo / 1000).toFixed(2);
            document.getElementById(tareaMasRapida).innerHTML = `Tarea completada más rápido: "${masRapida.tarea.texto}" en ${segundos} segundos.`;   
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
