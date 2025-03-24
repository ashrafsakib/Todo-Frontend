import { Todos } from "./classes/Todos.js";

const BACKEND_URL = "https://todo-server-br7v.onrender.com";
const todos = new Todos(BACKEND_URL);

const list = document.querySelector("ul");
const input = document.querySelector("input");

input.disabled = true;

const renderHTML = (task) => {
    const li = document.createElement("li");
    li.setAttribute("class", "list-group-item d-flex justify-content-between align-items-center");
    li.setAttribute("data-key", task.getId().toString());

    renderSpan(li, task.getText())
    renderLink(li, task.getId())

    list.appendChild(li);
};

const renderSpan = (li, text) =>{
    const span = li.appendChild(document.createElement("span"));
    span.innerText = text;
}
const renderLink = (li, id) =>{
    const a = li.appendChild(document.createElement("a"));
    a.innerHTML = '<i class="bi bi-trash"></i>';
    a.addEventListener("click", () => {
        todos.removeTask(id).then((removed_id) => {
            const li_to_remove = document.querySelector(`[data-key='${removed_id}']`)
            if (li_to_remove) 
                list.removeChild(li_to_remove);
        }).catch((error) => {
            alert(error)
        })
    });
}

const getTasks = () => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderHTML(task)
        })
        input.disabled = false
    }).catch((error) => {
        alert(error)
    })
};
getTasks();

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        const task = input.value.trim()
        if (task !== "") {
            todos.addTask(task).then((task) => {
                renderHTML(task)
                input.value = ""
            })
            .catch((error) => {
                alert(error)
            })
        }
    }    
})
