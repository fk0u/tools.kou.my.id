function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${task.text}
            <button onclick="removeTask(this)">Remove</button>
        `;
        if (task.completed) {
            listItem.classList.add('completed');
        }
        listItem.addEventListener('click', function() {
            listItem.classList.toggle('completed');
            saveTasks();
        });
        taskList.appendChild(listItem);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task');
        return;
    }

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        ${taskInput.value}
        <button onclick="removeTask(this)">Remove</button>
    `;
    listItem.addEventListener('click', function() {
        listItem.classList.toggle('completed');
        saveTasks();
    });

    taskList.appendChild(listItem);
    taskInput.value = '';
    saveTasks();
}

function removeTask(button) {
    const listItem = button.parentElement;
    listItem.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    const taskList = document.getElementById('taskList').children;

    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];
        tasks.push({
            text: task.firstChild.textContent.trim(),
            completed: task.classList.contains('completed')
        });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function goBack() {
    window.history.back();
}
