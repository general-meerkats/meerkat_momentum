// still needs to be refactored big time

var ENTER_KEY = 13;
$("form").submit(function() { return false; });
var focus = {
	bindEvents:function(){
		$('#focus-input').on('keyup', this.createDaily.bind(this));
		$('.checkbox').on('click', this.toggleDaily.bind(this));
		$('.close').on('click', this.closeDaily.bind(this));
		$( document ).ready(this.getList.bind(this));
		$( '#new-task' ).on('keyup', this.add.bind(this));
		$( document ).on('click', '.delete-task', this.removeTask);
		$( document ).on('click', '.check-task', this.toggleTask);
	},
	closeDaily:function(){
		var $form = $("form.focus").toggle();
		var $form = $(".focus-list").toggle();
		var val = LS.getData('focus-storage');
		var objectStorage = {'val': null, 'isChecked': false};

		LS.setData('focus-storage',objectStorage);
		
		$('.focus-list-message').removeClass("finished");
	},
	toggleDaily:function(){
		var focus = LS.getData('focus-storage');

		if(!focus.isChecked){
			$('.focus-list-message').addClass("finished");
			$('.checkbox').html('<i class="fa fa-check-square-o" aria-hidden="true"></i>');
			$('.close').html('<i class="fa fa-plus" aria-hidden="true"></i>');
		}
		else{
			$('.focus-list-message').removeClass("finished");
			$('.checkbox').html('<i class="fa fa-square-o" aria-hidden="true"></i>');
			$('.close').html('<i class="fa fa-times" aria-hidden="true"></i>');
		}

		var newStorage = {'val': focus.val, 'isChecked': !focus.isChecked};
		LS.setData("focus-storage", newStorage);
	},
	createDaily: function(e){
		var $input = $(e.target);
		var val = $input.val().trim();

		if ((e.which != 13) || (!val)){
			return;
		}
		var objectStorage = {'val': val, 'isChecked': false};
		LS.setData('focus-storage',objectStorage);
		$input.val('');
		this.render();

	},
	render: function(){
		var listMessage = LS.getData('focus-storage');
		if(listMessage && listMessage.val !== null){
			$('.focus-list-message').text(listMessage.val);	
			var $form = $("form.focus").toggle();
			var $form = $(".focus-list").toggle();
		}

		if(listMessage && listMessage.isChecked === true){
			$('.focus-list-message').addClass("finished");
		}
	},
	// TO-DO LIST
	add: function(e) {
		var $input = $(e.target);
		var newTask = $input.val().trim();

		if ((e.which != 13) || (!newTask)){
			return;
		}
		// save current saved tasks
		var currentTasks = LS.getData('todo-list');
		// if doesn't exist an item 'todo-list' in localStorage, 
		// an empty array is created
		if (!currentTasks) currentTasks = [];
		// getting last id
		var lastId = typeof currentTasks[0] === 'object' ? currentTasks[0].id + 1: 0;
		// the new object task
		var newTaskObj = { id: lastId, task: newTask, isChecked: false};
		// Adding the new task to the top
		currentTasks.unshift(newTaskObj);

		LS.setData('todo-list', currentTasks);

		$input.val('');
		// rendering the new new task added
		var liItem = "<li id='" + newTaskObj.id + "'>" + 
		    "<span class=\"check-task\"><i class=\"fa fa-square-o\" aria-hidden=\"true\"></i></span>" + 
		    newTaskObj.task + 
		    "<span class=\"delete-task\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span></li>"
		$( '#taskList' ).prepend(liItem);
	},
	getList: function() {
		var todoList = LS.getData('todo-list');
		var $todoListElement = $( '#taskList' );

		if (!todoList) return;

		todoList.forEach(function (item) {

			var liItemChecked = "<li class=\"finished\" id='" + item.id + "'>" +
			    "<span class=\"check-task\"><i class=\"fa fa-check-square-o\" aria-hidden=\"true\"></i></span>" + 
			    item.task + 
			    "<span class=\"delete-task\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span></li>";

			var liItemUnchecked = "<li id='" + item.id + "'>" +
			    "<span class=\"check-task\"><i class=\"fa fa-square-o\" aria-hidden=\"true\"></i></span>" + 
			    item.task + 
			    "<span class=\"delete-task\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span></li>";

			if (item.isChecked) {
				$( '#taskList' ).append(liItemChecked);
			} else {
				$( '#taskList' ).append(liItemUnchecked);
			}
		});
	},
	removeTask: function(e) {
		var todoList = LS.getData('todo-list');
		var taskSelectedElement = $(e.target).parent().parent();
		var taskSelectedId = taskSelectedElement.attr('id');

		var index = todoList.findIndex(function(x) {
			return x.id == taskSelectedId;
		});

		todoList.splice(index, 1);
		taskSelectedElement.remove();
		LS.setData('todo-list', todoList);
	},
	toggleTask: function(e) {
		var todoList = LS.getData('todo-list');
		var $target = $(e.target);
		var $taskSelected = $target.parent().parent();
		var taskId = $taskSelected.attr('id');

		var index = todoList.findIndex(function(x) {
			return x.id == taskId;
		});

		todoList[index].isChecked = !todoList[index].isChecked;

		if (todoList[index].isChecked) {
			$target.removeClass('fa-square-o').addClass('fa-check-square-o');
			$taskSelected.addClass('finished');
		} else {
			$target.removeClass('fa-check-square-o').addClass('fa-square-o');
			$taskSelected.removeClass('finished')
		}

		LS.setData('todo-list', todoList);
	},

	init: function(){
		this.bindEvents();
		this.render();
	}
}
focus.init();