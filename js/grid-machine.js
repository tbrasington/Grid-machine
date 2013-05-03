// The grid

var grid_constructor = function()
{
	var that = this;
	
	this.grid_canvas = null;
	
	this.sizes = [1,2,3,4,5,6,7,8];
	
	this.max_size = 8;
	
	this.page_structure = {};
		
	this.init = function()
	{
		that.events();
		
		
	}
	
	this.events = function()
	{
		$(window).resize(function()
		{
			that.monitor_section_heights();
			that.monitor_block_heights();
		});
		
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
		
		// remove the block
		that.grid_canvas.on('click', '.option-button-delete', function(e){
			
			e.preventDefault();
			e.stopPropagation();
			$(this).data('target-block').remove();
		});
		
		// adjust the section height
		that.grid_canvas.on('click', '.input-small', function(e){
			
			e.preventDefault();
			e.stopPropagation();
			
		}).on('keyup', '.input-small', function(e){
			
			if(e.keyCode==13)
			{
				var element = $(this)
				that.adjust_section_size(element.val(),element.parents('.section'));
				
				element.remove()
			}
		});
	}
	
	this.build_a_section = function()
	{
		var section = $('<div />', { 'class' : 'section group'}).data('height', '300').appendTo(that.grid_canvas),
		settings = $('<div />', { 'class' : 'section-settings'}).appendTo(section);
		
		var pos = _.size(that.page_structure);
		that.page_structure[pos] = {'position':pos, 'height' : 300, 'blocks' : {} };
		
		console.log(that.page_structure)
	}
	
	// builds a block element 
	this.build_a_block = function(target_section)
	{
		var block_element = $('<div />', { 'class' : 'block-element span-1-'+that.max_size}).appendTo(target_section).css('height', target_section.height());
		console.log(target_section)
		var section_pos = 0;
		var pos = _.size(that.page_structure[section_pos].blocks);
		that.page_structure[section_pos].blocks[pos] = { 'position' : pos, 'spans' : 1};
		
		
		console.log(that.page_structure)

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
			$('<button />', { 'class' : 'option-button', 'text' : item  + '/'+that.max_size , 'value' : 'span-'+item+'-'+that.max_size}).data('target-block', target_block).appendTo(options_element);
		});
		
		var delete_element = $('<button />', { 'class' : 'option-button-delete', 'text' : 'Remove' }).data('target-block', target_block).appendTo(options_element);
		
		return options_element;
	}
	
	// called when inputting values into the form
	this.adjust_section_size = function(value, section)
	{
		section.data('height', value);
		
		// adjust heights
		that.monitor_section_heights();
	}
	
	// function to adjust the heights of the section. bound to data as can be a mix of percentages and pixels
	this.monitor_section_heights = function()
	{
		_.each($('.section'), function(item, index)
		{
			var data_height = $(item).data('height');
		
			// percentage detected
			if(data_height.match(/%/g))
			{	
				var target_height = $(window).height() * (parseInt (data_height.replace('%','')) /100);
			}
				else
			{
				// use pixels
				target_height = data_height.replace('px', '');
			}
			
			that.page_structure[index].height = data_height;
			
			$(item).css('height', target_height+'px');
			
		});
		
		console.log(that.page_structure)
		// now adjust block heights
		that.monitor_block_heights();
	}
	
	this.monitor_block_heights = function()
	{
		_.each($('.block-element'), function(item){
			$(item).css('height', $(item).parent().height());
		});
	}
}
