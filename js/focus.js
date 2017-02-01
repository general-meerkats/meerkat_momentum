var ENTER_KEY = 13;
$("form").submit(function() { return false; });
var dailyFocusTask = {
	bindEvents:function(){
		$('#focus-input').on('keyup', this.createDaily.bind(this));
		$('.checkbox').on('click', this.toggleDaily.bind(this));
		$('.close').on('click', this.closeDaily.bind(this));
	},
	closeDaily:function(){
		var val = LS.getData('focus-storage');
		var objectStorage = {'val': null, 'isChecked': false};
		LS.setData('focus-storage',objectStorage);
		this.render();
		
		
	},
	toggleDaily:function(){
		var focus = LS.getData('focus-storage');
		var newStorage = {'val': focus.val, 'isChecked': !focus.isChecked};
		LS.setData("focus-storage", newStorage);
		this.render();
	},
	createDaily: function(e){
		var $input = $(e.target);
		var val = $input.val().trim();

		if ((e.which !== ENTER_KEY) || (!val)){
			return;
		}
		var objectStorage = {'val': val, 'isChecked': false};
		LS.setData('focus-storage',objectStorage);
		$input.val('');
		this.render();

	},
	render: function(){

		/*
		var listMessage = LS.getData('focus-storage');
		if(listMessage && listMessage.val !== null){
			$('.focus-list-message').text(listMessage.val);	
			var $form = $("form.focus").toggle();
			var $form = $(".focus-list").toggle();
		}

		if(listMessage && listMessage.isChecked === true){
			$('.focus-list-message').addClass("finished");
		*/

		var dailyFocus = LS.getData('focus-storage'),
		    $focusListMessage = $( '.focus-list-message' ),
		    $checkbox = $( '.checkbox' ),
		    $close = $( '.close' );

		if (dailyFocus === null || dailyFocus.val === null || !dailyFocus) {
			$('#focus-input').css('display','block');
			$('.focus-list').css('display','none');
			return;
		} else{
			$('#focus-input').css('display','none');
			$('.focus-list').css('display','block');
			$('.focus-list-message').html(dailyFocus.val);
		}

		if (dailyFocus.isChecked) {
			$focusListMessage.addClass('finished');
			$checkbox.html('<i class="fa fa-check-square-o" aria-hidden="true"></i>');
			$close.html('<i class="fa fa-plus" aria-hidden="true"></i>');
			console.log("lol");
		} else {
			$focusListMessage.removeClass('finished');
			$checkbox.html('<i class="fa fa-square-o" aria-hidden="true"></i>');
			$close.html('<i class="fa fa-times" aria-hidden="true"></i>');
			console.log("lol");
		}
	},

	init: function(){
		this.bindEvents();
		this.render();
	}
}
dailyFocusTask.init();