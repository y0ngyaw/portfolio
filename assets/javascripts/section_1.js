var section_1_in = function() {
	let firstname = document.getElementById("firstname");
	firstname.className = firstname.className + " in-position";
	let lastname = document.getElementById("lastname");
	lastname.style.transitionDelay = "0.5s";
	lastname.className = lastname.className + " in-position";
	setTimeout(function() {
		splitText("intro-text", "intro-text-wrapper", "intro-text-char");
		$(".intro-text").css("opacity", 1);
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
				duration: 1500,
				easing: "cubic-bezier(.215,.61,.355,1)",
				delay: (i*75),
				fill: "forwards"
			})
		};

	}, 1000);

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
	let lastname = document.getElementById("lastname");
	lastname.style.transitionDelay = "0s";
	lastname.classList.remove("in-position");
	let firstname = document.getElementById("firstname");
	firstname.classList.remove("in-position");
};

var section_2_in = function() {
	splitText("passion-wrapper", "passion-text-wrapper", "passion-text-char");
	let passion_array = document.getElementsByClassName("passion-text-wrapper");
	document.getElementById("passion-wrapper").style.opacity = "1";

	let a = [];
	for(var i=0; i<passion_array.length; i++) {
		passion_array[i].childNodes.forEach(function(n) {

			animation_property = {
				x_end: "0",
				y_end: "0",
				z_end: "0",
				scale_end: 1,
				transform_type: "translate3d scale",
				duration: 1500,
				delay: i*50,
			}

			random_scale = {
				min: -300,
				max: 300,
				scale_min: 1.1,
				scale_max: 4.5
			}

			let l = new Letter(n, animation_property, random_scale);
			a.push(l.animate());
		});
	};

	a[a.length - 1].onfinish = function() {
		let no_goal = document.getElementById("no-goal-text");
		no_goal.classList = no_goal.classList + " in-position";
		let beyond = document.getElementById("beyond-text");
		beyond.classList = beyond.classList + " in-position";
	};
};

var section_2_out = function() {
	let no_goal = document.getElementById("no-goal-text");
	no_goal.classList.remove("in-position");
	let beyond = document.getElementById("beyond-text");
	beyond.classList.remove("in-position");
	let passion_array = document.getElementsByClassName("passion-text-wrapper");
	for(var i=0; i<passion_array.length; i++) {
		passion_array[i].animate([
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

};	

var section_3_in = function() {

};

var section_3_out = function() {

};

var section_4_in = function() {

};

var section_4_out = function() {

};