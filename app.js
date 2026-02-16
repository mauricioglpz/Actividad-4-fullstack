class Tarea {
    constructor(id, titulo, descripcion) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
    }
}

let TOKEN = localStorage.getItem('token') || null;

class GestorDeTareas {

    constructor() {
        this.taskListElement = document.getElementById('taskList');
        this.inputElement = document.getElementById('taskInput');

        if (TOKEN) {
            this.mostrarMensaje('Sesión restaurada ', 'success');
            this.cargarTareas();
        }
    }

    mostrarMensaje(msg, tipo = 'info') {

        const loginMsg = document.getElementById('loginMsg');

        loginMsg.style.color =
            tipo === 'error' ? 'red' :
            tipo === 'success' ? 'lightgreen' :
            'white';

        loginMsg.innerText = msg;
    }

    async cargarTareas() {

        if (!TOKEN) return;

        try {
            const res = await fetch('http://localhost:3000/api/tareas', {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            });

            if (!res.ok) throw new Error();

            const tareas = await res.json();
            this.render(tareas);

        } catch {
            this.mostrarMensaje('No autorizado. Inicia sesión ', 'error');
        }
    }

    async agregarTarea(nombre) {

        if (!TOKEN) {
            this.mostrarMensaje('Debes iniciar sesión ⚠️', 'error');
            return;
        }

        if (nombre.trim() === '') {
            this.mostrarMensaje('La tarea no puede estar vacía ⚠️', 'error');
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/tareas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`
                },
                body: JSON.stringify({
                    titulo: nombre,
                    descripcion: 'Agendada desde la página web'
                })
            });

            if (!res.ok) throw new Error();

            this.inputElement.value = '';
            this.mostrarMensaje('Tarea agregada ', 'success');
            this.cargarTareas();

        } catch {
            this.mostrarMensaje('Error al agregar tarea ', 'error');
        }
    }

    async eliminarTarea(id) {

        if (!TOKEN) return;

        try {
            const res = await fetch(`http://localhost:3000/api/tareas/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            });

            if (!res.ok) throw new Error();

            this.mostrarMensaje('Tarea eliminada ', 'success');
            this.cargarTareas();

        } catch {
            this.mostrarMensaje('Error al eliminar tarea ', 'error');
        }
    }

    render(tareas) {

        this.taskListElement.innerHTML = '';

        if (tareas.length === 0) {
            this.taskListElement.innerHTML = '<p style="color: white; font-weight: bold;">No hay tareas aún </p>';
            return;
        }
        tareas.forEach(tarea => {

            const li = document.createElement('li');

            li.className = 'course-col';
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'center';
            li.style.marginBottom = '15px';

            li.innerHTML = `
                <span>${tarea.titulo}</span>
                <button onclick="gestor.eliminarTarea('${tarea._id}')"
                    style="color:red;border:none;background:none;cursor:pointer;">
                    <i class="fa fa-trash"></i>
                </button>
            `;

            this.taskListElement.appendChild(li);
        });
    }
}

const gestor = new GestorDeTareas();

/* BOTÓN AGREGAR */
document.getElementById('addTaskBtn').addEventListener('click', () => {
    gestor.agregarTarea(document.getElementById('taskInput').value);
});

/* ENTER */
document.getElementById('taskInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') gestor.agregarTarea(e.target.value);
});


/* LOGIN */
async function login() {

    const usuario = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!usuario || !password) {
        gestor.mostrarMensaje('Completa los campos ', 'error');
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, password })
        });

        const data = await res.json();

        if (data.token) {
            TOKEN = data.token;
            localStorage.setItem('token', TOKEN);

            gestor.mostrarMensaje('Sesión iniciada correctamente ', 'success');
            gestor.cargarTareas();

        } else {
            gestor.mostrarMensaje('Credenciales incorrectas ', 'error');
        }

    } catch {
        gestor.mostrarMensaje('Servidor no disponible ', 'error');
    }
}


/* REGISTER */
async function register() {

    const usuario = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!usuario || !password) {
        gestor.mostrarMensaje('Completa los campos ⚠️', 'error');
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, password })
        });

        const data = await res.json();
        gestor.mostrarMensaje(data.mensaje, 'success');

    } catch {
        gestor.mostrarMensaje('Servidor no disponible ', 'error');
    }
}


/* LOGOUT  */
function logout() {

    TOKEN = null;
    localStorage.removeItem('token');

    gestor.taskListElement.innerHTML = '';
    gestor.mostrarMensaje('Sesión cerrada ', 'success');
}

async function crearProducto() {
    const nombre = document.getElementById('nombreProducto').value;
    const precio = document.getElementById('precioProducto').value;
    const TOKEN = localStorage.getItem('token'); 

    if (!TOKEN) {
        alert("Debes iniciar sesión para gestionar productos");
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            },
            body: JSON.stringify({ nombre, precio })
        });

        if (res.ok) {
            alert("Producto agregado con éxito");
            document.getElementById('nombreProducto').value = '';
            document.getElementById('precioProducto').value = '';
            cargarProductos(); // Refrescar la lista
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

async function cargarProductos() {
    const TOKEN = localStorage.getItem('token');
    if (!TOKEN) return;

    try {
        const res = await fetch('http://localhost:3000/api/productos', {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const productos = await res.json();
        
        const lista = document.getElementById('productosList');
        lista.innerHTML = ''; 
        
        productos.forEach(p => {
            const li = document.createElement('li');
            li.style.color = "white";
            li.style.marginBottom = "10px";
            li.innerHTML = `
                <strong>${p.nombre}</strong> - $${p.precio} 
                <button onclick="eliminarProducto('${p._id}')" style="margin-left:10px; color:red; cursor:pointer;">Eliminar</button>
            `;
            lista.appendChild(li);
        });
    } catch (error) {
        console.error("Error cargando productos:", error);
    }
}
 
async function eliminarProducto(id) {
    const TOKEN = localStorage.getItem('token');
    await fetch(`http://localhost:3000/api/productos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${TOKEN}` }
    });
    cargarProductos();
}

if(localStorage.getItem('token')) {
    cargarProductos();
}
