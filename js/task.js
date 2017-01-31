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

		if ((e.which != 13) || (!val)){
			return;
		}
		var objectStorage = {'val': val, 'isChecked': false};
		LS.setData('focus-storage',objectStorage);
		$input.val('');
		this.render();

	},
	render: function(){

		var dailyFocus = LS.getData('focus-storage');

		if(dailyFocus === null || dailyFocus.val === null || !dailyFocus){
			$('#focus-input').css('display','block');
			$('.focus-list').css('display','none');
			return;
		}
		else{
			$('#focus-input').css('display','none');
			$('.focus-list').css('display','block');
			$('.focus-list-message').html(dailyFocus.val);
		}

		if(dailyFocus.isChecked){
			$('.focus-list-message').addClass('finished');
			$('.checkbox').html('<i class="fa fa-check-square-o" aria-hidden="true"></i>');
			$('.close').html('<i class="fa fa-plus" aria-hidden="true"></i>');
		}
		else{
			$('.focus-list-message').removeClass('finished');
			$('.checkbox').html('<i class="fa fa-square-o" aria-hidden="true"></i>');
			$('.close').html('<i class="fa fa-times" aria-hidden="true"></i>');
		}



	},