/* jshint esversion:6 */
/* globals $, console, LS */

var focus = {
    
    cacheDom: function() {
        this.$todosPanel = $('#todos-panel');
        this.$newTask    = this.$todosPanel.find('#new-task');
        this.$taskList   = this.$todosPanel.find('#taskList');
    },

    bindEvents: function () {
        this.$newTask.on('keyup', this.add.bind(this));
        this.$taskList.on('click', this.newHandler.bind(this));
    },
    
    newHandler: function(e) {
        
        if (e.target !== e.currentTarget) {
            
            console.log(e.target.parentElement.className);
            
            if (e.target.parentElement.className === 'check-task') {
                this.toggleTask(e);
            } else if (e.target.parentElement.className === 'delete-task') {
                this.removeTask(e);
            } else {
                return;
            }
        }
    },

    add: function (e) {
        
        var $input  = $(e.target),
            newTask = $input.val().trim(),
            currentTasks;

        if ((e.which !== 13) || (!newTask)) {
            return;
        }
        
        // load saved tasks, or create empty array if no saved tasks exist
        if (!currentTasks) {
            currentTasks = [];
        } else {
            currentTasks = LS.getData('todo-list');
        }
        
        console.log(currentTasks);
        
        // getting id of most recent added task
        var lastId = typeof currentTasks[0] === 'object' ? currentTasks[0].id + 1 : 0;
        
        // the new object task
        var newTaskObj = {
            id: lastId,
            task: newTask,
            isChecked: false
        };
        // Adding the new task to the top
        currentTasks.unshift(newTaskObj);

        LS.setData('todo-list', currentTasks);

        $input.val('');
        // rendering the new new task added
        var liItem = "<li id='" + newTaskObj.id + "'>" +
            "<span class=\"check-task\"><i class=\"fa fa-square-o\" aria-hidden=\"true\"></i></span>" +
            newTaskObj.task +
            "<span class=\"delete-task\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span></li>";
        $('#taskList').prepend(liItem);
    },
    
    getList: function () {
        var todos = LS.getData('todo-list');

        if (!todos) return;

        todos.forEach(function (item) {
            var liItemChecked = "<li class=\"finished\" id='" + item.id + "'>" +
                "<span class=\"check-task\"><i class=\"fa fa-check-square-o\" aria-hidden=\"true\"></i></span>" +
                item.task +
                "<span class=\"delete-task\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span></li>";

            var liItemUnchecked = "<li id='" + item.id + "'>" +
                "<span class=\"check-task\"><i class=\"fa fa-square-o\" aria-hidden=\"true\"></i></span>" +
                item.task +
                "<span class=\"delete-task\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span></li>";

            if (item.isChecked) {
                $('#taskList').append(liItemChecked);
            } else {
                $('#taskList').append(liItemUnchecked);
            }
        });
    },
    
    removeTask: function (e) {
        var todos = LS.getData('todo-list');
        var taskSelectedElement = $(e.target).parent().parent();
        var taskSelectedId = taskSelectedElement.attr('id');

        var index = todos.findIndex(function (x) {
            return x.id === +taskSelectedId;
        });

        if (index === -1) return; // if doesn't exists

        todos.splice(index, 1);
        taskSelectedElement.remove();
        LS.setData('todo-list', todos);
    },
    
    toggleTask: function (e) {
        var todos = LS.getData('todo-list');
        var $target = $(e.target);
        var $taskSelected = $target.parent().parent();
        var taskId = $taskSelected.attr('id');

        var index = todos.findIndex(function (x) {
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
    },

    init: function () {
        
        $("form").submit(function () { return false; });
        
        this.cacheDom();        
        this.getList();
        this.bindEvents();
//        this.render();
    }
};
focus.init();