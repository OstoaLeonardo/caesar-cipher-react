import React from 'react';
import ReactDOM from 'react-dom';
import {Table} from '../components/Table.jsx';
import {TableEncryptedMessage} from '../components/TableEncryptedMessage.jsx';

// Autoajustar el tamaño del textarea
autosize(document.querySelectorAll('.autosize-textarea'));

// Obtener el botón por su ID
var btnEncrypt = document.getElementById("btn-encrypt");

// Agregar un evento de escucha al botón
btnEncrypt.addEventListener("click", function () {
    deleteContainers();
    handleEncrypt();
    handleDecrypt();
});

function encrypt(message, password) {
    let encryptedMessage = "";
    const passwordLength = password.length;
    message = message.replace(/ /g, "");

    for (let i = 0; i < message.length; i++) {
        const char = message[i];
        const passwordIndex = i % passwordLength;
        const shift = password.toUpperCase().charCodeAt(passwordIndex) - 'A'.charCodeAt();

        let encryptedChar = "";
        if (char.match(/[a-z]/)) {
            encryptedChar = String.fromCharCode(((char.charCodeAt() - 'a'.charCodeAt() + shift) % 26) + 'A'.charCodeAt());
        } else {
            encryptedChar = String.fromCharCode(((char.charCodeAt() - 'A'.charCodeAt() + shift) % 26) + 'A'.charCodeAt());
        } encryptedMessage += encryptedChar;
    }

    return encryptedMessage;
}

function decrypt(encryptedMessage, password) {
    let decryptedMessage = "";
    const passwordLength = password.length;
    encryptedMessage = encryptedMessage.replace(/ /g, "");

    for (let i = 0; i < encryptedMessage.length; i++) {
        const char = encryptedMessage[i];
        const passwordIndex = i % passwordLength;
        const shift = password.toUpperCase().charCodeAt(passwordIndex) - 'A'.charCodeAt();

        let decryptedChar = "";
        if (char.match(/[A-Z]/)) {
            decryptedChar = String.fromCharCode(((char.charCodeAt() - 'A'.charCodeAt() - shift + 26) % 26) + 'A'.charCodeAt());
        } else {
            decryptedChar = char;
        } decryptedMessage += decryptedChar;
    }

    return decryptedMessage;
}

var encrypted;

function handleEncrypt() {
    const message = document.getElementById("input-message").value;
    const password = document.getElementById("input-password").value;

    const encryptedMessage = encrypt(message, password);
    encrypted = encryptedMessage;
    renderTableInput("Input", message, password);
    renderEncryptedMessage("Encrypted message:", encryptedMessage);
}

function handleDecrypt() {
    const encryptedMessage = encrypted;
    const password = document.getElementById("input-password").value;

    const decryptedMessage = decrypt(encryptedMessage, password);
    renderDecryptedMessage("Decrypted message:", decryptedMessage);
}

var messageContainer = document.getElementById("alphabet-container");
var encryptedMessageContainer = document.getElementById("encrypted-container");
var decryptedMessageContainer = document.getElementById("decrypted-container");

// Función para crear una tabla y renderizarla en el contenedor
function renderTableInput(title, message, password) { // Crear un elemento Table y pasarle las propiedades
    var tableComponent = React.createElement(Table, {
        title: title,
        message: message,
        password: password
    });

    // Crear un contenedor para la tabla
    var tableContainer = document.createElement("div");

    // Renderizar el componente Table en el contenedor de la tabla
    ReactDOM.render(tableComponent, tableContainer);

    // Agregar el contenedor de la tabla al contenedor principal
    messageContainer.appendChild(tableContainer);
}

function renderEncryptedMessage(title, message) { // Crear un elemento Table y pasarle las propiedades
    var tableComponent = React.createElement(TableEncryptedMessage, {
        title: title,
        message: message
    });

    // Crear un contenedor para la tabla
    var tableContainer = document.createElement("div");

    // Renderizar el componente Table en el contenedor de la tabla
    ReactDOM.render(tableComponent, tableContainer);

    // Agregar el contenedor de la tabla al contenedor principal
    encryptedMessageContainer.appendChild(tableContainer);
}

function renderDecryptedMessage(title, message) { // Crear un elemento Table y pasarle las propiedades
    var tableComponent = React.createElement(TableEncryptedMessage, {
        title: title,
        message: message
    });

    // Crear un contenedor para la tabla
    var tableContainer = document.createElement("div");

    // Renderizar el componente Table en el contenedor de la tabla
    ReactDOM.render(tableComponent, tableContainer);

    // Agregar el contenedor de la tabla al contenedor principal
    decryptedMessageContainer.appendChild(tableContainer);
}

function deleteContainers() {
    document.getElementById("alphabet-container").innerHTML = "";
    document.getElementById("encrypted-container").innerHTML = "";
    document.getElementById("decrypted-container").innerHTML = "";
}

// Obtener el botón por su ID
var btnUpload = document.getElementById("btn_upload");

// Agregar un evento de escucha al botón
btnUpload.addEventListener("click", function () {
    // Crear un elemento de entrada de tipo archivo
    var input = document.createElement('input');
    input.type = 'file';

    // Establecer la función de manejo de eventos para cuando se selecciona un archivo
    input.addEventListener('change', function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        // Establecer la función de manejo de eventos para cuando se completa la lectura del archivo
        reader.onload = function(event) {
            var fileContent = event.target.result;
            document.getElementById('input-message').value = fileContent;
            autosize.update(document.querySelectorAll('.autosize-textarea'));
        };
        
        // Leer el contenido del archivo como texto
        reader.readAsText(file);
    });
    
    // Hacer clic en el elemento de entrada de tipo archivo para abrir el selector de archivos
    input.click();
});
