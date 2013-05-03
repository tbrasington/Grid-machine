<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Grid constructor</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">


        <link rel="stylesheet" href="/css/normalize.css">
        <link rel="stylesheet" href="/css/main.css">
        <link rel="stylesheet" href="/css/cols.css">
        <link rel="stylesheet" href="/css/colours.css">
        <script src="/js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body>
    
    	<div id="grid-canvas"></div>
    

	    
        <script src="/js/vendor/jquery-1.9.1.min.js"></script>
        <script src="/js/vendor/underscore.js"></script>
        <script src="/js/plugins.js"></script>
        <script src="/js/grid-machine.js"></script>
        

        <script>
	        $(document).ready(function()
			{
			
		        var file = <?php echo $_GET['id']; ?>;
		        
		        
		        $.ajax({
			       url : '/saved_files/'+ file +'.json',
			       dataType : 'json' 
		        }).done(function(data){
			        
			        var result = data[0];
			        
			        // build
					var i_need_a_grid = new grid_constructor();
					i_need_a_grid.grid_canvas = $('#grid-canvas');
					
					var size_array = []
					for(var i=1; i<(result.columns+1); i++)
					{
						size_array[i] =i
					}
					
					i_need_a_grid.sizes = size_array;
					i_need_a_grid.columns = result.columns;
					i_need_a_grid.page_structure = result.structure;
					
					i_need_a_grid.off_the_bat(result.structure);
					
					i_need_a_grid.init();
		        });
		        
				
			});
        </script>
        
    </body>
</html>
