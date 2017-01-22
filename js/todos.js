// still needs to be refactored big time

var ENTER_KEY = 13;
$("form").submit(function() { return false; });
var focus = {
	bindEvents:function(){
		$('#focus-input').on('keyup', this.create.bind(this));
		$('.checkbox').on('click', this.toggle.bind(this));
		$('.close').on('click', this.close.bind(this));
		$( document ).ready(this.getList.bind(this));
		$( '#new-task' ).on('keyup', this.add.bind(this));
	},
	close:function(){
		var $form = $("form.focus").toggle();
		var $form = $(".focus-list").toggle();
		var val = LS.getData('focus-storage');
		var objectStorage = {'val': val, 'isChecked': false};

		LS.setData('focus-storage',objectStorage);
		
		$('.focus-list-message').removeClass("finished");
	},
	toggle:function(){
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
	create: function(e){
		var $input = $(e.target);
		var val = $input.val().trim();

		if ((e.which != 13) || (!val)){
			return;
		}
		var objectStorage = {'val': val, 'isChecked': false};
		LS.setData('focus-storage',objectStorage);
		console.log(LS.getData('focus-storage'));
		$input.val('');
		this.render();

	},
	render: function(){
		var listMessage = LS.getData('focus-storage');
		$('.focus-list-message').text(listMessage.val);	
		var $form = $("form.focus").toggle();
		var $form = $(".focus-list").toggle();
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
			var liItem = "<li id='" + item.id + "'>" +
			    "<span class=\"check-task\"><i class=\"fa fa-square-o\" aria-hidden=\"true\"></i></span>" + 
			    item.task + 
			    "<span class=\"delete-task\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span></li>";
			$( '#taskList' ).append(liItem);
		});
	}
}
focus.bindEvents();