$(document).ready(function() {
	$(".guess_box").click(checkForCode);
	function getRandom(num) {
		return Math.floor(Math.random()*num);
	}
	var hideCode = function() {
		var numRand = getRandom(4);
		$(".guess_box").each(function(index,value){
			if(numRand == index) {
				$(this).append("<span id='has_discount'></span>");
				return false;
			}
		});
	}
	hideCode();
	function checkForCode() {
		var discount;
		if($.contains(this, document.getElementById("has_discount"))) {
			var my_num = getRandom(5);
			discount = "<p>Your Discount is "+my_num+"%</p>";
		} else {
			discount = "<p>Sorry, no discount this time!</p>";
		}
		$(this).append(discount);
		//$(".guess_box").unbind();
		$(".guess_box").each(function() {
			$(this).unbind('click');
		});
	}
});
