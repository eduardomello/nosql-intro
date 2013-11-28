$(document).ready(function() {

	
	var loadContent = function(datafile, template, placeholder, successfunction) {
		var request = $.get('templates.html'),
			chained = request.pipe(function( data ) {
				return $(data).filter('#'+ template).html();	
			});
		 
		chained.done(function( htmltemplate ) {
		  	$.getJSON('contents/' + datafile + '.json', function(data) {		    	  
	     		var result = Mustache.render(htmltemplate, data);	     		
	     		$('#'+ placeholder).html(result);
	     		successfunction();
			});
		});
	}

	var loadNavigation = function(datafile) {
		loadContent(datafile, 'tpl-step', 'step-nav', function(){ $("#step-nav ul li:first").addClass('active'); });
	}

     var loadExercise = function(datafile, template, id) {
     	loadContent(datafile, template, 'step-content', function(){ setStepActive(id); $('#step-content .buttons .btn-primary').click(verifyCompleteFieldExercise); });
     }

     var setStepActive = function(id) {
     	$("#nav-template ul li").each ( function(item) { $(item).removeClass('active')});
     	$("#nav-template ul li#" + id).addClass('active');
     }

     var verifyCompleteFieldExercise = function() {
     	var correctAnswers = true;     	
     	$('#step-content .questions .complete-field').each(function() {     		
     		if($(this).val() != $(this).data('answer'))
     		{
     			$(this).addClass('wrong');     		
     			correctAnswers = false;	     			
     		}
     		else
     		{
     			$(this).addClass('right');
     		}
     	});
     	if(correctAnswers) {
     		$('#step-content .result').html('Resposta correta!');
     		$('#step-content .buttons .see-answer').css('visibility','hidden');
     		$('#step-content .buttons .answer').removeClass('btn-primary')
     		.addClass('btn-success')
     		.html('Continuar!')
     		.click(function() { loadStep($(this).data('right'))});
     	}
     	else
     	{
 			$('#step-content .result').html('Resposta incorreta!');
     		$('#step-content .buttons .see-answer').css('visibility','visible')
     		.click(function() { 
     			$(this).css('visibility', 'hidden');
     			showCompleteFieldExeciseAnswers(); 
     			$('#step-content .buttons .answer').removeClass('btn-primary')
     			.addClass('btn-warning')
     			.html('Continuar...')
     			.click(function() { loadStep($(this).data('left'))});
     		});
     	}
     }

     var loadStep = function(step) {
     	//pending;
     }

    var showCompleteFieldExeciseAnswers = function() {
		$('#step-content .questions .complete-field').each(function() {     		
     		$(this).removeClass('right')
     		.removeClass('wrong')
     		.addClass('show-answer')
     		.val($(this).data('answer'));     		
     	});  	
     }

     $("#start-rdbms").click(function(){     	
     	loadNavigation('rdbms-nav');
     	loadExercise('rdbms-ex1', 'tpl-completeField', 'rdbms-ex1');     	
     	$('section#home').hide();
     	$('section#page').show();     	
     });

});