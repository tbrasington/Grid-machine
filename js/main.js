// The grid

var grid_constructor = function()
{
	var that = this;
	
	this.init = function()
	{
		this.events();
	}
	
	this.events = function()
	{
		$('#grid-canvas').on('click', that.build_a_section);
	}
	
	this.build_a_section = function()
	{
		var section = $('<div />', { 'class' : 'section group'});
		
		return section;
	}
	
	this.build_a_block = function()
	{
		
	}
}


$(document).ready(function()
{
	
	// build
	var i_need_a_grid = new grid_constructor();
		i_need_a_grid.init();

});