$(document).ready(function() {
	$.get('templates.html', function(data) {
		alert(data);
	});
	
	var loadContent = function(datafile, template, placeholder, successfunction) {
		console.log('loadContent(' + datafile + ',' + template + ',' + placeholder + ',' + successfunction + ')');
		$.get('templates.html', function(data) { 		
			alert(data);
		  // var htmltemplate = $(content).children('#'+ template).html();
		 //  console.log(htmltemplate);
		 //   $.getJSON('contents/' + datafile + '.json', function(data) {	
		 //   		console.log(data);    
		 //    	var result = Mustache.render(htmltemplate, data);
	  //   		console.log(result);
		 //    	$('#'+ placeholder).html(result);
			// });
		});
		//.done(successfunction);
		
				
	}

	var loadNavigation = function(datafile) {
		console.log('loadNavigation ' + datafile);
		loadContent(datafile, 'tpl-step', 'nav-template', function(){$("#nav-template ul:first").addClass('active')});		
		
	}

     var loadExercise = function(id, datafile, template) {
     	loadContent(datafile, template, 'article', setStepActive(id));
     }

     var setStepActive = function(id) {
     	$("#nav-template ul li").each ( function(item) { $(item).removeClass('active')});
     	$("#nav-template #" + id).addClass('active');

     }

     $("#start-rdbms").click(function(){     	
     	loadNavigation('rdbms-nav');
     	loadExercise('rdbms-ex1', 'rdbms-ex1', 'tpl-completeField');
     	$('section#home').hide();
     })
    
});