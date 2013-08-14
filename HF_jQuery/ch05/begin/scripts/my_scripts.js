$(document).ready(function() {
	var headclix = 0,eyeclix = 0,noseclix = 0,mouthclix = 0;
	lightning_one();
	lightning_two();
	lightning_three();
	
	$("#head").click(function() {
		if(headclix < 9) {
			$(this).animate({left:"-=367px"},500);
			headclix += 1;
		} else {
			$(this).animate({left:"0px"},500);
			headclix = 0;
		}
	});	
	$("#eyes").click(function() {
		if(eyeclix < 9) {
			$(this).animate({left:"-=367px"},500);
			eyeclix += 1;
		} else {
			$(this).animate({left:"0px"},500);
			eyeclix = 0;
		}
	});		
	$("#nose").click(function() {
		if(noseclix < 9) {
			$(this).animate({left:"-=367px"},500);
			noseclix += 1;
		} else {
			$(this).animate({left:"0px"},500);
			noseclix = 0;
		}
	});		
	$("#mouth").click(function() {
		if(mouthclix < 9) {
			$(this).animate({left:"-=367px"},500);
			mouthclix += 1;
		} else {
			$(this).animate({left:"0px"},500);
			mouthclix = 0;
		}
	});	
});

function lightning_one(t) {
	$("#lightning1").fadeIn(250).fadeOut(250);
	setTimeout("lightning_one()",4000);
};	
function lightning_two(t) {
	$("#lightning2").fadeIn("fast").fadeOut("fast");
	setTimeout("lightning_two()",5000);
};	
function lightning_three(t) {
	$("#lightning3").fadeIn("fast").fadeOut("fast");
	setTimeout("lightning_three()",7000);
};
