const tasksDomain = `${window.location.protocol}//${window.location.host}/tasks`;

document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const task = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        dueDate: document.querySelector('#dueDate').value,
    };

    await fetch(tasksDomain, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    loadTasks();
});

async function loadTasks() {
    const response = await fetch(tasksDomain);
    const tasks = await response.json();
    taskList = document.querySelector('.task-list');

    if (!taskList) {
        console.error('Task list element not found!');
        return;
    }

    taskList.innerHTML = '';

    tasks.forEach((task) => {
        if (!task || !task.id || !task.title || !task.dueDate) {
            console.error('Invalid task data:', task);
            return;
        }

        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const timeLeft = new Date(task.dueDate) - new Date();
        if (timeLeft < 0) {
            taskDiv.classList.add('expired');
        } else if (timeLeft < 3600000) {
            taskDiv.classList.add('warning');
        }

        taskDiv.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Due: ${new Date(task.dueDate).toLocaleString()}</p>
            </div>
            <div>
                <button class="complete" onclick="completeTask('${
                    task.id
                }')">Complete</button>
                <button class="delete" onclick="deleteTask('${
                    task.id
                }')">Delete</button>
            </div>
        `;
        taskList.append(taskDiv);
    });
}

async function completeTask(id) {
    await fetch(`${tasksDomain}/${id}`, { method: 'PUT' });
    loadTasks();
}

async function deleteTask(id) {
    await fetch(`${tasksDomain}/${id}`, { method: 'DELETE' });
    loadTasks();
}

loadTasks();
