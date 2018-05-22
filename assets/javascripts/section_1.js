var section_1_in = function() {
	let firstname = document.getElementById("firstname-text");
	firstname.className = firstname.className + " in-position";
	//firstname.addEventListener("transitionend", section_1_after_firstname);
	firstname.addEventListener("transitionend", function f() {
		let lastname = document.getElementById("lastname-text");
		let left = document.getElementById("firstname-text").getBoundingClientRect().left - document.getElementById("lastname-text").getBoundingClientRect().width - (window.innerWidth * 0.01);
		$(".section-1 .lastname-wrapper").css("left", left);
		lastname.className = lastname.className + " in-position";
		lastname.addEventListener("transitionend", function l() {
			$(".intro-wrapper").css("left", left);
			$(".intro-text").css("opacity", 1);
			splitText("intro-text", "intro-text-wrapper", "intro-text-char");
			let intro_word = document.getElementsByClassName("intro-text-wrapper");
			for(var i=0; i<intro_word.length; i++) {
				intro_word[i].animate([
				{
					transform: "translate3d(0, 45px, 0)",
					opacity: 0
				},
				{
					transform: "translate3d(0, 0, 0)",
					opacity: 1
				}], {
					duration: 1000,
					easing: "cubic-bezier(.215,.61,.355,1)",
					delay: (i*75),
					fill: "forwards"
				})
			};
			lastname.removeEventListener("transitionend", l);
		});
		firstname.removeEventListener("transitionend", f);
	});

	$(document).mousemove(function(e){
		var ww = $( window ).width();
		var wh = $( window ).height();
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		var traX = ( mouseX - ww/2 ) * 0.025 + 50;
		var traY = ( mouseY - wh/2 ) * 0.025;
		$(".section-1").css({"background-position": traX + "%" + traY + "%"});
	});
}

var section_1_out = function() {
	let intro_word = document.getElementsByClassName("intro-text-wrapper");
	for(var i=0; i<intro_word.length; i++) {
		intro_word[intro_word.length - (i+1)].animate([
		{
			transform: "translate3d(0, 0, 0)",
			opacity: 1
		},
		{
			transform: "translate3d(0, 45px, 0)",
			opacity: 0
		}], {
			duration: 1000,
			easing: "cubic-bezier(.215,.61,.355,1)",
			fill: "forwards"
		})
	}
	let lastname = document.getElementById("lastname-text");
	lastname.classList.remove("in-position");
	let firstname = document.getElementById("firstname-text");
	firstname.classList.remove("in-position");
};

var section_2_in = function() {

};

var section_2_out = function() {

};

var section_3_in = function() {

};

var section_3_out = function() {

};

var section_4_in = function() {

};

var section_4_out = function() {

};