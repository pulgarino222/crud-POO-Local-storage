// app.js
class Persona {
    constructor(nombre, username, password) {
        this.nombre = nombre;
        this.username = username;
        this.password = password;
    }

    static crearUsuario(nombre, username, password, role) {
        if (localStorage.getItem(username)) {
            throw new Error('Usuario ya existe');
        }
        if (role === 'admin') {
            return new Administrador(nombre, username, password);
        } else {
            return new UsuarioRegular(nombre, username, password);
        }
    }

    registrarse() {
        localStorage.setItem(this.username, JSON.stringify(this));
    }

    static iniciarSesion(username, password) {
        const user = JSON.parse(localStorage.getItem(username));
        if (user && user.password === password) {
            return user.role === 'admin' ? new Administrador(user.nombre, user.username, user.password) : new UsuarioRegular(user.nombre, user.username, user.password);
        }
        return null;
    }
}

class UsuarioRegular extends Persona {
    constructor(nombre, username, password) {
        super(nombre, username, password);
        this.role = 'user';
    }

    crearReserva(reserva) {
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push({ ...reserva, usuario: this.username });
        localStorage.setItem('reservas', JSON.stringify(reservas));
    }
}

class Administrador extends Persona {
    constructor(nombre, username, password) {
        super(nombre, username, password);
        this.role = 'admin';
    }

    crearReserva(reserva) {
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas.push(reserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));
    }

    eliminarReserva(id) {
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas = reservas.filter(reserva => reserva.id !== id);
        localStorage.setItem('reservas', JSON.stringify(reservas));
    }

    actualizarReserva(id, nuevaReserva) {
        let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
        reservas = reservas.map(reserva => reserva.id === id ? { ...reserva, ...nuevaReserva } : reserva);
        localStorage.setItem('reservas', JSON.stringify(reservas));
    }
}

class Auth {
    static iniciarSesion(username, password) {
        const user = Persona.iniciarSesion(username, password);
        if (user) {
            localStorage.setItem('session', JSON.stringify(user));
            return user;
        }
        return null;
    }

    static cerrarSesion() {
        localStorage.removeItem('session');
    }

    static obtenerUsuarioActual() {
        return JSON.parse(localStorage.getItem('session'));
    }
}

// Funciones para manipular el DOM
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    try {
        const usuario = Persona.crearUsuario(nombre, username, password, role);
        usuario.registrarse();
        alert('Usuario registrado exitosamente');
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const usuario = Auth.iniciarSesion(username, password);
    if (usuario) {
        mostrarReservas();
        document.getElementById('auth').style.display = 'none';
        document.getElementById('reservations').style.display = 'block';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

document.getElementById('logout').addEventListener('click', function() {
    Auth.cerrarSesion();
    document.getElementById('auth').style.display = 'block';
    document.getElementById('reservations').style.display = 'none';
});

document.getElementById('createReservation').addEventListener('click', function() {
    const usuario = Auth.obtenerUsuarioActual();
    if (usuario) {
        const reserva = {
            id: Date.now(),
            descripcion: prompt('Ingrese la descripción de la reserva:')
        };

        if (usuario.role === 'admin') {
            new Administrador(usuario.nombre, usuario.username, usuario.password).crearReserva(reserva);
        } else {
            new UsuarioRegular(usuario.nombre, usuario.username, usuario.password).crearReserva(reserva);
        }

        mostrarReservas();
    } else {
        alert('Debe iniciar sesión para crear una reserva');
    }
});

function mostrarReservas() {
    const usuario = Auth.obtenerUsuarioActual();
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const listaReservas = document.getElementById('reservationList');
    listaReservas.innerHTML = '';

    reservas.forEach(reserva => {
        const li = document.createElement('li');
        li.textContent = `Reserva: ${reserva.descripcion} - Usuario: ${reserva.usuario}`;

        if (usuario.role === 'admin') {
            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.addEventListener('click', function() {
                new Administrador(usuario.nombre, usuario.username, usuario.password).eliminarReserva(reserva.id);
                mostrarReservas();
            });

            const editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.addEventListener('click', function() {
                const nuevaDescripcion = prompt('Ingrese la nueva descripción de la reserva:', reserva.descripcion);
                new Administrador(usuario.nombre, usuario.username, usuario.password).actualizarReserva(reserva.id, { descripcion: nuevaDescripcion });
                mostrarReservas();
            });

            li.appendChild(editarBtn);
            li.appendChild(eliminarBtn);
        }

        listaReservas.appendChild(li);
    });
}

window.onload = function() {
    const usuario = Auth.obtenerUsuarioActual();
    if (usuario) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('reservations').style.display = 'block';
        mostrarReservas();
    }
};
