// still needs to be refactored big time

var ENTER_KEY = 13;
$("form").submit(function() { return false; });
var focus = {
	bindEvents:function(){
		$('#focus-input').on('keyup', this.create.bind(this));
		$('.checkbox').on('click', this.toggle.bind(this));
		$('.close').on('click', this.close.bind(this));
	},
	close:function(){
		var $form = $("form.focus").toggle();
		var $form = $(".focus-list").toggle();
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
	}
}
focus.bindEvents();