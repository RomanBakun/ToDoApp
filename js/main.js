// Находим элементы на странице по id
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];


if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function(task) {
        renderTask(task);
    });

}


checkEmptyList();


// Добавление задачи
form.addEventListener('submit', addTask);
// Удаление задачи
tasksList.addEventListener('click', deleteTask)
// Отмечаем задачу завершенной 
tasksList.addEventListener('click', doneTask)



// LS не правильный, но допустимый способ
// if (localStorage.getItem('tasksHTML')) {
//     tasksList.innerHTML = localStorage.getItem('tasksHTML');
// }


// Функции
function addTask(event) {
    // Отменяем отправку формы (перезагрузку страницы)
    event.preventDefault();

    // Достаем текст задачи из поля ввода
    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    }
    // Добавляем задачу в массив с задачами
    tasks.push(newTask)

    saveToLocalStorage();



    renderTask(newTask);
// ******************************
    // Формируем CSS класс
    // const cssClass = newTask.done ? "task-title task-title--done" : "task-title";
    // Формируем разметку для новой задачи
    // const taskHTML = `
    
    //             <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
	// 				<span class="${cssClass}">${newTask.text}</span>
	// 				<div class="task-item__buttons">
	// 					<button type="button" data-action="done" class="btn-action">
	// 						<img src="./img/tick.svg" alt="Done" width="18" height="18">
	// 					</button>
	// 					<button type="button" data-action="delete" class="btn-action">
	// 						<img src="./img/cross.svg" alt="Done" width="18" height="18">
	// 					</button>
	// 				</div>
	// 			</li>

    // `;
    // Добавляем разметку на страницу
    // tasksList.insertAdjacentHTML('beforeend', taskHTML)

// *******************************

    // Очищаем поле ввода и возвращаем на него фокус
    taskInput.value = "";
    taskInput.focus();

    // Проверка: cкрываем "список дел пуст", есди в списке > 1 елемента
    // if (tasksList.children.length > 1) {
    //     emptyList.classList.add('none');
    // }
    // saveHTMLtoLS();
    checkEmptyList();

}

function deleteTask(event) {

    // Проверяем, если мы кликнули НЕ по кнопке "удалить задачу" 
    if (event.target.dataset.action !== 'delete') {
        return
    }
    // Проверяем, что клик был по кнопке "удалить задачу"
    // if (event.target.dataset.action === 'delete') 
    const parentNode = event.target.closest('.list-group-item');

    // Определяем ID задачи
    const id = Number(parentNode.id)

    // Находим индекс задачи в массиве
    const index = tasks.findIndex(function (task) {
        // if (task.id === id) {
        //     return true
        // }

        return task.id === id;
    });

    // Удаляем задачу из массива
    // tasks.splice(index, 1)

    tasks = tasks.filter(function (task) {
        if (task.id === id) {
            return false
        } else {
            return true
        }
    })

    saveToLocalStorage();

    // Удаляем задачу
    parentNode.remove();

    // Проверка. Если в списке задач более 1-го элемента, показываем блок "список дел"
    // if (tasksList.children.length === 1) {
    //     emptyList.classList.remove('none');
    // }
    
    // saveHTMLtoLS();
    checkEmptyList();
}

function doneTask(event) {

    if (event.target.dataset.action !== 'done') return;
    // if (event.target.dataset.action === 'done') {
    const parentNode = event.target.closest('.list-group-item');

    const id = Number(parentNode.id);

    const task = tasks.find(function (task) {
        if (task.id === id) {
            return true
        }
    })
    task.done = !task.done

    saveToLocalStorage();

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done')
    // console.log(taskTitle);

    // saveHTMLtoLS();
    // }

}

// localStorage 
// function saveHTMLtoLS() {
//     localStorage.setItem('tasksHTML', tasksList.innerHTML);
// }



// 1:22:17


function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `
        <li id="emptyList" class="list-group-item empty-list">
            <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
            <div class="empty-list__title">Список дел пуст</div>
        </li>
        `;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// render

function renderTask(task) {
    const cssClass = task.done ? "task-title task-title--done" : "task-title";
    // Формируем разметку для новой задачи
    const taskHTML = `
                <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>
    `;
    // Добавляем разметку на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML)
}