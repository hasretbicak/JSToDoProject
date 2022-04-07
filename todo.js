// Tüm Elementleri Seçme

const firstCardBody = document.querySelectorAll(".card-body")[0];
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const addButton = document.querySelector("#add-todo");
const secondCardBody = document.querySelectorAll(".card-body")[1]; 
const todoList = document.querySelector(".list-group");
const listItems = document.querySelectorAll(".list-group-item");
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){

    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);  // Sayfa Yüklendiğinde Todoları Ekleme
    form.addEventListener("submit", addTodo);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);

} 


// Arayüzdeki Bütün Todo'Ları Sayfa Yüklenice Gösterme

function loadAllTodosToUI(){

    let todos = getTodosFromStorage();
 
    todos.forEach(function(todo){

        addTodoToUI(todo);
    })
}

// Todo Ekleme

function addTodo(e){

    const newTodo = todoInput.value.trim();

    if(newTodo === ""){

        /*
        <div class="alert alert-danger" role="alert">
            <strong>Oh Snap!</strong> Lorem ipsum lorem ipsum
        </div>
        */

        showAlert("danger", "Lütfen Bir Todo Girin!"); 
    }

    else{

        addTodoToUI(newTodo); 
        addTodoToStorage(newTodo);
        showAlert("success", "Todo Başarıyla Eklendi.");
    }

    e.preventDefault();
}

// Storage'a Ekleme

function addTodoToStorage(newTodo){

    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));  // JSON.stringify  -> arrayi stringe çeviriyor.

}

// Todo Silme

function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){

        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

        showAlert("success", "Todo Başarıyla Silindi.");
    }
}

// Todoları Storagedan Silme

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo, index){

        if(todo === deletetodo){

            todos.splice(index, 1); // Arrayden değeri silme
        }

    })
    localStorage.setItem("todos", JSON.stringify(todos));
}

// TodoLarı Filtreleme
 

function filterTodos(e){        //js otomatik e'ye değer gönderir

    const filterValue=e.target.value.toLowerCase();
    const listItems=document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){              //listItem burada her bir li'ye eşit olacak

        const text=listItem.textContent.toLowerCase();

        if(text.indexOf(filterValue)=== -1)           //indexof her harfe göre arar -1 de bulamadı anlamına gelir.Bulamıyorsa yani.
        {
          listItem.setAttribute("style","display: none !important");              //none diyince sayfada var olduğunu bilip göstermiyoruz.Yani arama kısmının altı bomboş
                                //important dedimki bootstraptaki özelliği ezsin ve none özelliğini alsın
        }

        else
        {
          listItem.setAttribute("style","display: block");
        }

    });
}

// Tüm Todoları Sşlme

function clearAllTodos(e){

    if(confirm("Tümünü Silmek İstediğinize Emin Misiniz?")){

        //Arayüzden todoları Temizleme
       // todoList.innerHTML = "";    -> Bu tek satır yazılabilir. ama çok yavaş bir yöntem

        while(todoList.firstElementChild != null){

            todoList.removeChild(todoList.firstElementChild);

       }
       localStorage.removeItem("todos");
    } 
}

//Todo'ları Storage'dan Alma

function getTodosFromStorage(){

    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));   // JSON.parse -> stringi arraye çeviriyor.
    }

    return todos;

}


//Alert Mesajları

function showAlert(type, message){

    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;     // alt + 096 ile ` oluşturuyoruz.
    alert.textContent = message;
    
    firstCardBody.appendChild(alert);

    //setTimeout  ->  alertin zamanını belirledik

    setTimeout(function(){

        alert.remove();

    },2000);

}

function addTodoToUI(newTodo){    // String Değerini list item olarak arayüze ekleme

    /*
    <li class="list-group-item d-flex justify-content-between">
        Todo 1
        <a href = "#" class ="delete-item">
            <i class = "fa fa-remove"></i>
        </a>

   </li>
   */ 

   //List Item Oluşturma

   const listItem = document.createElement("li");
   listItem.className = "list-group-item d-flex justify-content-between";
   
   //Link OLuşturma

   const link = document.createElement("a");
   link.href="#";
   link.className = "delete-item";
   link.innerHTML = "<i class = 'fa fa-remove'></i>";

   // Text Node Oluşturma

   listItem.appendChild(document.createTextNode(newTodo));
   listItem.appendChild(link);

   // Todo List'e List Item Ekleme

   todoList.appendChild(listItem);
   todoInput.value="";

}
