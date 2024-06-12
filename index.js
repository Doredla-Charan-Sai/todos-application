let todosList = document.getElementById('todos-list');

function getTodoFromLocalStorage(){
    let todosList = localStorage.getItem('todosList');
    let parsedTodosList = JSON.parse(todosList);
    console.log(parsedTodosList);
    if(parsedTodosList===null){
        return [];
    }else{
        return parsedTodosList;
    }
}

let todosListObject = getTodoFromLocalStorage();

let saveBtnElement = document.getElementById('saveBtn');
saveBtnElement.onclick = function(){
    localStorage.setItem('todosList',JSON.stringify(todosListObject));
}

function onDeleteTodoItem(listItemId){
    let listItemCont = document.getElementById(listItemId);
    todosList.removeChild(listItemCont);

    let deleteElement = todosListObject.findIndex(function(each){
        let itemId = "todo"+each.uniqueId;
        if(itemId===listItemId){
            return true;
        } else{
            return false;
        }
    });
    todosListObject.splice(deleteElement,1);
    console.log(todosListObject);
}

function onTodoStatusChange(labelId){
    let labelElementConformed = document.getElementById(labelId);
    labelElementConformed.classList.toggle('checked');
    let labelItem = todosListObject.findIndex(function(each){
        let labelItemId = 'label'+each.uniqueId;
        if(labelItemId===labelId){
            return true;
        } else{
            return false;
        }
    });
    let todoObject = todosListObject[labelItem];
    if(todoObject.isChecked===false){
        todoObject.isChecked = true;
        console.log(todoObject);
        console.log(todosListObject);
    }else{
        todoObject.isChecked = false;
    }
}

function createAndAppendTodo(newTodo){
    let listItemContainer = document.createElement('li');
    let listItemId = "todo"+newTodo.uniqueId;
    listItemContainer.id = listItemId;
    let checkBoxInput = document.createElement('input');
    checkBoxInput.checked = newTodo.isChecked;
    let labelContainer = document.createElement('div');
    let labelElement = document.createElement('label');
    let deleteIconElement = document.createElement('i');
    deleteIconElement.classList.add("fa-sharp", "fa-solid", "fa-trash");

    labelContainer.appendChild(labelElement);
    labelContainer.appendChild(deleteIconElement);
    listItemContainer.appendChild(checkBoxInput);
    listItemContainer.appendChild(labelContainer);
    todosList.appendChild(listItemContainer);

    let deleteId = "delete"+newTodo.uniqueId;
    deleteIconElement.id = deleteId;
    deleteIconElement.onclick = function(){
        onDeleteTodoItem(listItemId);
    }

    if(newTodo.isChecked){
        labelElement.classList.add('checked');
    }

    labelContainer.classList.add('label-cont');
    listItemContainer.classList.add('list-item-cont');

    let inputId = "checkbox"+newTodo.uniqueId;
    let labelId = "label"+newTodo.uniqueId;
    checkBoxInput.type = 'checkbox';
    checkBoxInput.id = inputId;
    checkBoxInput.classList.add('checkbox','input');

    labelElement.htmlFor = inputId;
    labelElement.id = labelId;
    labelElement.textContent = newTodo.todoItem;
    labelElement.classList.add('label');
    checkBoxInput.onclick = function(){
        onTodoStatusChange(labelId);
    }    
}

for(let todo of todosListObject){
    createAndAppendTodo(todo);
}

function onGetTodo(){
    let inputElement = document.getElementById('input');
    let inputTodo = inputElement.value;
    let j = todosListObject.length;
    todosListObject.push({
        uniqueId: j,
        todoItem: inputTodo,
        isChecked: false
    });
    j++;
    console.log(todosListObject);
    createAndAppendTodo(todosListObject[todosListObject.length-1]);
    inputElement.value = "";
}