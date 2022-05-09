var tasks=JSON.parse(localStorage.getItem('allTasks'));
if(tasks== null){
    tasks=[]
}
const render = (data)=>{
    const elemnt = document.getElementById("content");
elemnt.innerHTML='';
data.map((val, key )=>{
    elemnt.innerHTML +=`
        <div class="card border-0 shadow-sm mt-3">
        <div class="card-body">
            <h4 class="text-capitalize">${val.todo}</h4>
            <button class="btn" onclick="edit(${key})"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn" onclick="trash(${key})"><i class="fa-solid fa-trash-can"></i> Trash</button>
            <span class="badge float-end ${
                val.status == 'pending'? "bg-secondary":
                val.status == 'in-progress'? "bg-warning": "bg-success"

            }">${val.status}</span>
        </div>`
}); 

        localStorage.setItem('allTasks', JSON.stringify(data));

}

render(tasks);
//create
var addModal = new bootstrap.Modal(document.getElementById('addModal'))
var editModal = new bootstrap.Modal(document.getElementById('editModal'))



    document.getElementById("addform").addEventListener("submit", (e)=>{
    e.preventDefault();
    let todo = document.getElementById("addtask").value;
    tasks.push({todo:todo, status:'pending'})
    render(tasks);
    document.getElementById("addtask").value ='';
    addModal.hide();
})

//edit
const edit=(id)=>{
    editModal.show();
    document.getElementById('edittask').value=tasks[id].todo
    document.getElementById('editStatus').value=tasks[id].status
    document.getElementById('taskId').value=id
}

//save edit

document.getElementById("editform").addEventListener("submit", (e)=>{
    e.preventDefault();
    let todo = document.getElementById("edittask").value;
    let status = document.getElementById("editStatus").value;
    let id = document.getElementById("taskId").value;
    tasks[id].todo=todo;
    tasks[id].status=status;
    render(tasks);
    editModal.hide();
})

//trash
const trash =(id) =>{
    if(confirm("Delete task?")){
        tasks.splice(id, 1)
        render(tasks);
    }
   
}

