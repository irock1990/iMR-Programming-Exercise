$(document).ready(function() {
	/* TODO: MAKE A RANDOMIZER */

	var slideState = -1,
		slideArray = new Array(),
		choices = ["A", "B"],
		rows = ["color", "taste", "nuts", "price"],
		questionState = 0,
		answerArray = new Array();

	slideArray[0] = [
						["Milk", "Chewy", "No Nuts", "$3.99"],
						["Dark", "Soft", "Nuts", "$5.99"]
					];
	slideArray[1] = [
						["Milk", "Chewy", "Nuts", "$3.99"],
						["Dark", "Soft", "No Nuts", "$4.99"]
					];
	slideArray[2] = [
						["Milk", "Soft", "No Nuts", "$5.99"],
						["Dark", "Chewy", "Nuts", "$3.99"]
					];
	slideArray[3] = [
						["Milk", "Soft", "Nuts", "$4.99"],
						["Dark", "Chewy", "No Nuts", "$5.99"]
					];	


	function nullCheck(arr) {
		var notAllNull = 0;

		for(var i = 0; i < arr.length; i++) {
			if(arr[i] !== null) {
				notAllNull++;
			}
		}

		return notAllNull;
	}

	function resetButtons() {
		$("#choice1").show();
		$("#choice2").show();
		$("#nopurchase").show();
	}

	$("#begin").click(function() {
		$("#introSlide").fadeOut(1000, function() {
			slideState = Math.floor(Math.random()*slideArray.length);
			//console.log(slideState);
			$("#surveySlide").fadeIn(1000);
			$("#slideHeader").html("Question "+(slideState+1)+":");
			for(var j = 0; j < choices.length; j++) {
				for(var i = 0; i < slideArray.length; i++) {
					$("#"+rows[i]+choices[j]).html(slideArray[slideState][j][i]);
					//console.log(rows[i]+choices[j]+"  "+slideArray[slideState][j][i]);
				}
			}
			slideArray[slideState] = null;
			questionState = 1;
			//console.log(slideArray);
		});
		return false;
	});

	$(".actionButton").click(function() {
		var notAllNull = nullCheck(slideArray);
		//console.log("question state " + questionState);
		
		if(questionState === 1) {
			answerArray[0] = $(this).text();
			var id = $(this).attr('id');
			$("#"+id).fadeOut();
			questionState = 2;
		} else if(questionState === 2) { // record data and change slide
			answerArray[1] = $(this).text();
			$.jStorage.set(slideState, answerArray);
			//console.log(slideState+" "+answerArray);
			answerArray = new Array();	

			if(notAllNull) {
				while(slideArray[slideState] === null) {
					slideState = Math.floor(Math.random()*slideArray.length);
				}
				//console.log(slideState);							
				$("#surveySlide").fadeOut(1000, function() {
					$("#surveySlide").fadeIn(1000);
					$("#slideHeader").html("Question "+(slideState+1)+":");

					for(var j = 0; j < choices.length; j++) {
						for(var i = 0; i < slideArray[slideState].length; i++) {
							$("#"+rows[i]+choices[j]).html(slideArray[slideState][j][i]);
							//console.log(rows[i]+choices[j]+"  "+slideArray[slideState][j][i]);
						}
					}
					slideArray[slideState] = null;
					//console.log(slideArray);
					questionState = 1;
					resetButtons();	
				});					
				questionState = 1;
			} else { // results slide
				$("#surveySlide").fadeOut(1000, function() {
					$("#resultsSlide").fadeIn(1000);
					var str = "";
					for(var i = 0; i < slideArray.length; i++) {
						arr = $.jStorage.get(i);
						$("#fchoice"+(i+1)).html(arr[0]);
						$("#schoice"+(i+1)).html(arr[1]);
					}
				});
			}
		} 
		return false;
	});
});		