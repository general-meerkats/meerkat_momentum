var ENTER_KEY = 13;
$("form").submit(function() { return false; });
var focus = {
	bindEvents:function(){
		$('#focus-input').on('keyup', this.create.bind(this));
	},

	create: function(e){
		var $input = $(e.target);
		var val = $input.val().trim();
		if ((e.which != 13) || (!val)){
			return;
		}
		
		LS.setData('focus-storage',val);
		console.log(LS.getData('focus-storage'));
		$input.val('');
		
	}
}

focus.bindEvents();