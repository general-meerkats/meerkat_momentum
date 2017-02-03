/* jshint esversion:6 */
/* globals $, console, LS */

var Todos = (function() {
    
    var DOM = {};
    
    function cacheDom() {
        DOM.$todosPanel = $('#todos-panel');
        DOM.$newTask    = DOM.$todosPanel.find('#new-task');
        DOM.$taskList   = DOM.$todosPanel.find('#taskList');
    }

    function bindEvents() {
        DOM.$newTask.on('keyup', add);
        DOM.$taskList.on('click', newHandler);
    }
    
    function newHandler(e) {
        
        if (e.target !== e.currentTarget) {
            
            if (e.target.parentElement.className === 'check-task') {
                toggleTask(e);
            } else if (e.target.parentElement.className === 'delete-task') {
                removeTask(e);
            } else {
                return;
            }
        }
    }

    // add new todo item
    function add(e) {
        
        var $input  = $(e.target),
            newTask = $input.val().trim(),
            currentTasks,
            liItem;

        if ((e.which !== 13) || (!newTask)) {
            return;
        }
        
        // load saved todos or init empty array if no saved tasks exist
        if (LS.getData('todo-list')) {
            currentTasks = LS.getData('todo-list');
        } else {
            currentTasks = [];
        }
        
        // getting id of most recent added todo
        var lastId = typeof currentTasks[0] === 'object' ? currentTasks[0].id + 1 : 0;
        
        // create new todo object
        var newTaskObj = {
            id: lastId,
            task: newTask,
            isChecked: false
        };
        
        // Add the new task to the top
        currentTasks.unshift(newTaskObj);

        // save todos list
        LS.setData('todo-list', currentTasks);

        // clear the input
        $input.val('');
        
        // render the newly-added task
        DOM.$taskList.prepend(
            `<li id="${newTaskObj.id}">
                <span class="check-task">
                    <i class="fa fa-square-o" aria-hidden="true"></i>
                </span> ${newTaskObj.task}
                <span class="delete-task">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </span>
            </li>`
        );
        
    }
    
    // get all todos
    function getList() {
        
        var todos = LS.getData('todo-list') ? LS.getData('todo-list') : [];
        
        todos.forEach(function (item) {
            var liItemChecked = `<li class="finished" id="${item.id}"><span class="check-task"><i class="fa fa-check-square-o" aria-hidden="true"></i></span>${item.task}<span class="delete-task"><i class="fa fa-times" aria-hidden="true"></i></span></li>`;

            var liItemUnchecked = `<li id="${item.id}"><span class="check-task"><i class="fa fa-square-o" aria-hidden="true"></i></span>${item.task}<span class="delete-task"><i class="fa fa-times" aria-hidden="true"></i></span></li>`;

            if (item.isChecked) {
                DOM.$taskList.append(liItemChecked);
            } else {
                DOM.$taskList.append(liItemUnchecked);
            }
        });
    }
    
    // remove a todo item
    function removeTask(e) {
        var todos = LS.getData('todo-list'),
            taskSelectedElement = $(e.target).parent().parent(),
            taskSelectedId = taskSelectedElement.attr('id'),
            
            index = todos.findIndex(function (x) {
                return x.id === +taskSelectedId;
            });

        if (index === -1) return; // if doesn't exists

        todos.splice(index, 1);
        taskSelectedElement.remove();
        LS.setData('todo-list', todos);
    }
    
    
    // toggle completed
    function toggleTask(e) {
        var todos = LS.getData('todo-list'),
            $target = $(e.target),
            $taskSelected = $target.parent().parent(),
            taskId = $taskSelected.attr('id'),
            
            index = todos.findIndex(function (x) {
                return x.id === +taskId;
            });

        if (index === -1) return; // if doesn't exists

        todos[index].isChecked = !todos[index].isChecked;

        if (todos[index].isChecked) {
            $target.removeClass('fa-square-o').addClass('fa-check-square-o');
            $taskSelected.addClass('finished');
        } else {
            $target.removeClass('fa-check-square-o').addClass('fa-square-o');
            $taskSelected.removeClass('finished');
        }

        LS.setData('todo-list', todos);
    }
    

    function init() {
        
        $("form").submit(function () { return false; });
        
        cacheDom();        
        bindEvents();
        getList();
    }
    
    
    return {
        init: init
    };
    
}());
