/*en la funcion adTask creo con el html los elementos que estan dentro, hasta ahi todo bien, pero...el id si se repite nos va a provocar un error ya que los id no deben repetirse, por lo tanto debo crear una funcion para que el id sea siempre diferente:*/

let IdCounter = 0;

/*Cuando aprete el boton + del submit, quiero que se me genere un input, para eso tengo que llamar al input que esta en el innerhtml de la siguiente manera:*/

const input = document.querySelector('input[type="text"]')

userInput.addEventListener('submit', (event) => {
    /*Cuando lanzo el evento este desaparece por que el elemento submit envia la informaicon a un destinatario no existente ya que no hemos especificado en el action del form hacia donde va a ir la informacion, para que la informacion no desaparezca y se muestre la informacion hay que poner preventDefault concatenado al evento si es que pusimos event en el parametro de la funcion */
    event.preventDefault();
    addTask();
});

let addTask = () => {
    IdCounter++;

    /*Dentro de la funcion debo crear una variable que contenga el llamado al valor que ingresemos en el input para luego agregarla en el innerhtml*/

    let newValue = input.value;
    list.innerHTML += `
    <div class="task-container" id="${IdCounter}">
    <label>
        <input type="checkbox" class="check">${newValue}
    </label>
        <img src="trash.png" class="closeBtn">
    </div>`;

    /*cada vez que escribo algo en el input y lo envio, necesito que se reinicie el valor de lo que escribi para poder escribir de nuevo y no andar borrando constantemente, asiq voy a hacer que al final el valor del input sea un string vacio*/

    input.value = '';
    updateStats();
};

list.addEventListener('click', (event) => {
    if (event.srcElement.nodeName == 'INPUT') {
        updateStats();
    } else if (event.srcElement.nodeName == 'IMG') {
        deleteTask(event.srcElement.parentNode.id);

    }

});

let updateStats = () => {
    /*Ahora necesito hacer una variable que me capture todos los elementos div que posean el id de list, de la siguiente manera:*/
    let element = list.querySelectorAll('div');
    /*Ahora cada vez que se cree una etiqueta div (que se crearan a medida que introduzcamos valores en el input), se va a ir actualizando la cantidad de tareas pendientes de forma dinamica de la siguiente manera:*/

    let checkbox = list.querySelectorAll('input[type="checkbox"]:checked');
    stats.innerHTML = `<p>Tareas pendientes: ${element.length} completadas: ${checkbox.length}</p>`;
};

let deleteTask = (id) => {
    let taskToDelete = document.getElementById(id);
    list.removeChild(taskToDelete);
    updateStats();
};
