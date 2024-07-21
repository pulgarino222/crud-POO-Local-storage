# crud-POO-Local-storage

Workshop: Creación de un CRUD de Reservas con POO en JavaScript

En esta clase, repasaremos varios conceptos fundamentales de la Programación Orientada a Objetos (POO) en JavaScript y los aplicaremos en un ejercicio práctico. Vamos a crear un sistema de reservas que permitirá a dos tipos de usuarios (administrador y usuario regular) interactuar con la aplicación de manera diferente según su rol.

Objetivos del Ejercicio:
Aplicar los conceptos de LocalStorage, Clases, Herencia, Polimorfismo, Abstracción, Funciones flecha, Instanciación y Manipulación del DOM.
Desarrollar un CRUD (Create, Read, Update, Delete) para un sistema de reservas con diferentes roles de usuario.
Implementar la persistencia de datos en el navegador utilizando LocalStorage.
Crear una interfaz de usuario interactiva utilizando manipulación del DOM.
Instrucciones:
Paso 1: Crear las Entidades
Definiremos tres clases: Persona, UsuarioRegular y Administrador. Utilizaremos herencia para que UsuarioRegular y Administrador extiendan de Persona.
Métodos Persona: crear usuario, registrarse, crear reserva.
Metodos usuario_regular: registrarse como usuario regular, crear reserva únicamente para su usuario, 
Métodos Admi: Crear usuario para admin, crear reservas para varios pasajeros, eliminar, actualizar reservas.
Paso 2: Manipulación del DOM
Utilizaremos los conceptos aprendidos del DOM para que el usuario pueda interactuar con el sistema de reservas. Por ejemplo:
Paso 3: Utilizar LocalStorage para Guardar Información
Guardaremos la información del usuario en LocalStorage y generaremos un token para mantener la sesión activa.
Además, nos ayudaremos de una clase Auth, que contendrá métodos estativos y nos ayudara con estas tareas.

Paso 4: Crear Instancias y Métodos Estáticos
Utilizaremos instancias de las clases y métodos estáticos para realizar validaciones.
![image](https://github.com/user-attachments/assets/e01ae462-8f9e-4f6f-a9dc-cf57e51c9e03)
![image](https://github.com/user-attachments/assets/6353dd75-12e7-479d-89bf-7e637e396b0f)
