// The grid

var grid_constructor = function()
{
	var that = this;
	
	this.grid_canvas = null;
	
	this.init = function()
	{
		that.events();
	}
	
	this.events = function()
	{
		that.grid_canvas.on('click', function(e){
			
			e.preventDefault();
			e.stopPropagation();
			that.build_a_section();
		});
		
		that.grid_canvas.on('click', '.section', function(e){
			
			e.preventDefault();
			e.stopPropagation();
			that.build_a_block($(this));
		});
	}
	
	this.build_a_section = function()
	{
	
		var section = $('<div />', { 'class' : 'section group'}).appendTo(that.grid_canvas);
		
		//return section;
	}
	
	this.build_a_block = function(target_section)
	{
		console.log('block');
		var block_element = $('<div />', { 'class' : 'block-element span-2-8'}).appendTo(target_section);
	}
}


$(document).ready(function()
{
	
	// build
	var i_need_a_grid = new grid_constructor();
		i_need_a_grid.grid_canvas = $('#grid-canvas');
		i_need_a_grid.init();

});