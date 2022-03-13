// Tüm Elementleri Seçme

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const firstCardbdy = document.querySelectorAll(".card-body")[0];
const secondCardbdy = document.querySelectorAll(".card-body")[1];
const todoList = document.querySelector(".list-group");
const filter = document.querySelectorAll("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();
  
function eventListeners(){

    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardbdy.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);

} 

function clearAllTodos(e){

    if (confirm("Tümünü Silmek İstediğinize Emin misiniz?")){

        //Arayüzden todoları temizleme
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");

    }
}



 
function filterTodos(e){//js otomatik e'ye değer gönderir
    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");
 
    listItems.forEach(function(listItem){//listItem burada her bir li'ye eşit olacak
        const text=listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)===-1)//indexof her harfe göre arar -1 de bulamadı anlamına gelir.Bulamıyorsa yani.
        {
          listItem.setAttribute("style","display: none !important");//none diyince sayfada var olduğunu bilip göstermiyoruz.Yani arama kısmının altı bomboş
        //important dedimki bootstraptaki özelliği ezsin ve none özelliğini alsın
        }
        else
        {
          listItem.setAttribute("style","display: block");
        }
    });
} 


function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){
        
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo Başarıyla Silindi.");
    }

}

function deleteTodoFromStorage(deletetodo){

    let todos = getTodosFromStorage();

    todos.forEach(function(todo, index){

        if (todo === deletetodo){
            todos.splice(index,1);
        }


    });
    localStorage.setItem("todos", JSON.stringify(todos));

}

// Sayfa Yüklendiğinde Todoları Ekleme

function loadAllTodosToUI(){

    let todos = getTodosFromStorage();

    todos.forEach(function(todo){

        addTodoToUI(todo);
        
    })



}

function addTodo(e){

    const newTodo = todoInput.value.trim();

    if(newTodo === ""){

       
//         <div class="alert alert-danger">
//   <strong>Danger!</strong> Indicates a dangerous or potentially negative action.
// </div>


     showAlert("danger", "Lütfen Bir Todo Girin!");

    }
    else{

        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo Başarıyla Eklendi.");
    }


    e.preventDefault();
}

//Storagedan Todoları Alma

function getTodosFromStorage(){

    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }

    else{
        todos  = JSON.parse(localStorage.getItem("todos"));
    }
 
    return todos;

}

// Todoları Storage'a Ekleme

function addTodoToStorage(newTodo){

    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));

}

function showAlert(type, message){

    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`; // alt + 096 ile ` oluşturuyoruz.

    alert.textContent=message;
    firstCardbdy.appendChild(alert); 

    // setTimeout

    setTimeout(function(){

        alert.remove();
    }, 2000);


}




function addTodoToUI(newTodo){ // String değerini arayüze ekleyecek.
    // <li class="list-group-item d-flex justify-content-between">
    //                         Todo 1
    //                         <a href = "#" class ="delete-item">
    //                             <i class = "fa fa-remove"></i>
    //                         </a>

    //                     </li>

    const listItem = document.createElement("li");
    //Link Oluşturma
    const link = document.createElement("a");
    link.href ="#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";
    
    // Text Node Ekleme
    
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Todo Liste List Item Ekleme

    todoList.appendChild(listItem); 
    todoInput.value = ""; 

}






