const tasksDomain = `${window.location.protocol}//${window.location.host}/tasks`;

document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const task = {
        title: document.querySelector('#id').value,
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
    taskList.innerHTML = '';

    tasks.forEach();
}
