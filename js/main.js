// The grid

var grid_constructor = function()
{
	var that = this;
	
	this.grid_canvas = null;
	
	this.sizes = [1,2,3,4,5,6,7,8];
	
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
			
			var block_adjusment = that.build_a_block($(this));
		});
		
		// adjusting the spans for a block
		that.grid_canvas.on('contextmenu', '.block-element', function(e)
		{
			e.preventDefault();
			that.spawn_block_adjustment($(this));
		});
		
		// settings for a section
		that.grid_canvas.on('click', '.section-settings', function(e){
			
			e.preventDefault();
			e.stopPropagation();
			
			that.spawn_section_adjustment($(this));
		});
		
		// setting the size
		that.grid_canvas.on('click', '.option-button', function(e){
			
			e.preventDefault();
			e.stopPropagation();
			var block = $(this).data('target-block');
				block.attr('class', 'block-element '+ $(this).attr('value'));
			
			$(this).parent().remove();
		});
		
		// adjust the section height
		that.grid_canvas.on('keyup', '.input-small', function(e){
			
			var element = $(this)
			that.adjust_section_size(element.val(),element.parents('.section'));
		});
	}
	
	this.build_a_section = function()
	{
		var section = $('<div />', { 'class' : 'section group'}).appendTo(that.grid_canvas),
		settings = $('<div />', { 'class' : 'section-settings'}).appendTo(section);
		//return section;
	}
	
	// builds a block element 
	this.build_a_block = function(target_section)
	{
		var block_element = $('<div />', { 'class' : 'block-element span-1-8'}).appendTo(target_section);
	}
	
	// options for the section
	this.spawn_section_adjustment = function(settings_element)
	{
		var options_element = $('<div />', {'class' : 'section-options-element'}).appendTo(settings_element.parent());
		
		var input_form = $('<input />', { 'class' : 'input-small', 'name': 'section-size'}).appendTo(options_element);
		input_form.focus();
	}
	
	// contextual menu
	this.spawn_block_adjustment = function(target_block)
	{
		var options_element = $('<div />', {'class' : 'options-element'}).appendTo(target_block);
		_.each(that.sizes, function(item){
			$('<button />', { 'class' : 'option-button', 'text' : item  + ' of 8' , 'value' : 'span-'+item+'-8'}).data('target-block', target_block).appendTo(options_element);
		});
		return options_element;
	}
	
	this.adjust_section_size = function(value, section)
	{
		console.log(value)
		console.log(section)
		section.css('height', value);
	}
	
}


$(document).ready(function()
{
	
	// build
	var i_need_a_grid = new grid_constructor();
		i_need_a_grid.grid_canvas = $('#grid-canvas');
		i_need_a_grid.init();

});