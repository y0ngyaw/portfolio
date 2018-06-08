window.onresize = function(){ location.reload(); }

var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

const current = {
	translate: 0,
	page: 1,
	next_page: null,
	in_function: ['section_1_in', 'section_2_in', 'section_3_in', 'section_4_in'],
	out_function: ['section_1_out', 'section_2_out', 'section_3_out', 'section_4_out'],
	node: function() {
		return document.querySelector(".current");
	},
	next_node: function() {
		let v = document.getElementsByClassName("viewbox");
		for(var i=0; i<v.length; i++) {
			if(v[i].dataset.section == this.next_page) {
				return v[i];
			}
		}
	},
	update_page: function() {
		this.node().classList.remove("current");
		this.page = this.next_page;
		this.next_page = null;

		let all = document.getElementsByClassName("viewbox");
		for(var i=0; i<all.length; i++) {
			if(all[i].dataset.section == this.page) {
				all[i].classList.add("current");
			}
		}
	},
	update_translate: function(translate) {
		this.translate = translate
	},
	set_next_page: function(next_page) {
		this.next_page = next_page;
	},
	difference: function() {
		return this.page - this.next_page;
	},
	get_in_function: function() {
		return this.in_function[this.page - 1];
	},
	get_out_function: function() {
		return this.out_function[this.page - 1];
	}
}

const nav = {
	nav_object: [{text: "intro", color: "#15298A"}, {text: "passion", color: "#534178"}, {text: "project", color: "#2980B9"}, {text: "contact", color: "#AB5129"}],
	current_position: function() {
		return document.querySelector(".current").dataset.section;
	},
	create_element: function(section = this.current_position()) {
		let d = document.createElement("div");
		d.className = "label";
		let d_text = document.createTextNode(this.nav_object[section - 1].text);
		d.appendChild(d_text);
		return d;
	},
	append_element: function(el = document.getElementsByClassName("nav-link")[this.current_position() - 1], pos = this.current_position(), active = true) {
		this.active_link(el, pos);
		if(active) {
			el.className = el.className + " active";
		}
		let new_e = this.create_element(pos)
		el.appendChild(new_e);
		this.animate_in(new_e);
	},
	remove_element: function(el = document.getElementsByClassName("nav-link")[this.current_position() - 1], pos = this.current_position()) {
		this.deactive_link(el, pos);
		el.classList.remove("active");
		while(el.firstChild) {
			el.removeChild(el.firstChild);
		}
	},
	animate_in: function(e) {
		let currentY = -100;
		function navIn() {
			if(currentY < 0) {
				currentY = currentY + 2.5;
				e.style.transform = "translateY(" + currentY + "%)";
				requestAnimationFrame(navIn);
			}
		}
		navIn();
	},
	active_link: function(el, pos) {
		el.style.color = this.nav_object[pos - 1].color;
		el.style.borderColor = this.nav_object[pos - 1].color;
		el.style.width = "75px";
	},
	deactive_link: function(el, pos) {
		el.style.color = "#9BA695";
		el.style.borderColor = "#9BA695";
		el.style.width = "30px";
	},
	mobile_nav_in: function() {
		let linkArray = document.getElementsByClassName("mobile-nav-link");
		for(var i=0; i<linkArray.length; i++) {
			linkArray[i].style.transitionDelay = (i*0.25) + "s";
			linkArray[i].style.transform = "translate3d(0, 0, 0)";
			linkArray[i].style.opacity = 1;
		};
	},
	mobile_nav_out: function() {
		let linkArray = document.getElementsByClassName("mobile-nav-link");
		for(var i=0; i<linkArray.length; i++) {
			linkArray[i].style.transform = "translate3d(15%, 15%, 0)";
			linkArray[i].style.opacity = 0;
		};
	}
}

const num = {
	first: function() {
		return document.querySelector("#first-num");
	},
	update: function() {
		let f = this.first();
		f.style.marginTop = "-" + ((current.page - 1)*(f.clientHeight)) + "px";
	}
}

const view = {
	wheel: true,
	wh: window.innerHeight,
	scroll: function() {
		view.disable_wheel();
		let sec_out_function = window[current.get_out_function()];
		sec_out_function();

		function animate() {
			let content = document.querySelector(".content");
			let initialScale = 1;
			let direction = current.difference();

			function shrink() {
				content.className += " content-shrink";
				content.addEventListener("transitionend", function s() {
					content.removeEventListener("transitionend", s);
					currentOut();
					nextIn();
				})
			}

			let currentParent = current.node();
			let currentChild = currentParent.childNodes[1];
			let currentChildX = 0;
			let currentChildXEnd = direction < 0 ? -10 : 10;
			let currentIncrement = direction < 0 ? -1 : 1;
			let currentChildOpac = 1;
			function currentOut() {
				if(Math.round(currentChildX) != currentChildXEnd) {
					currentChildX = currentChildX + (0.1 * currentIncrement);
					currentChildOpac -= 0.01;
					currentChild.style.transform = "translate3d(" + currentChildX + "%, 0, 0)";
					currentChild.style.opacity = currentChildOpac;
					requestAnimationFrame(currentOut);
				}
			}

			let nextParent = current.next_node();
			let nextChild = nextParent.childNodes[1];
			let nextParentX = direction < 0 ? 100 : -100;
			let nextParentXEnd = 0;
			let nextChildX = direction < 0 ? -100 : 100;
			let nexChildXEnd = 0;
			let nextIncrement = direction < 0 ? -1 : 1

			function nextIn() {
				nextParent.style.zIndex = 5;
				if(Math.round(nextParentX) != nextParentXEnd) {
					nextParentX = nextParentX + (1 * nextIncrement);
					nextChildX = nextChildX + (1 * -nextIncrement);
					nextParent.style.transform = "translate3d(" + nextParentX + "%, 0, 0)";
					nextChild.style.transform = "translate3d(" + nextChildX + "%, 0, 0)";
					requestAnimationFrame(nextIn);
				}
				else {
					zoom();
				}
			}

			function resetStructure() {
				let v = document.getElementsByClassName("viewbox");
				let newCurrent = current.next_node();
				for(var i=0; i<v.length; i++) {
					v[i].style.zIndex = "unset";
					if(v[i] == newCurrent) {
						continue;
					}
					if(v[i].dataset.section < newCurrent.dataset.section) {
						v[i].style.transform = "translate3d(-100%, 0, 0)";
						v[i].childNodes[1].style.transform = "translate3d(100%, 0, 0)";
						v[i].childNodes[1].style.opacity = 1;
					}
					if(v[i].dataset.section > newCurrent.dataset.section) {
						v[i].style.transform = "translate3d(100%, 0, 0)";
						v[i].childNodes[1].style.transform = "translate3d(-100%, 0, 0)";
						v[i].childNodes[1].style.opacity = 1;
					}
				}
			}

			function zoom() {
				content.classList.remove("content-shrink");
				content.addEventListener("transitionend", function s() {
					content.removeEventListener("transitionend", s);
					resetStructure();
					nav.remove_element();
					current.update_page();
					let sec_in_function = window[current.get_in_function()];
					sec_in_function();
					nav.append_element();
					num.update();
					view.enable_wheel();	
				})
			}
			shrink();
		}
		animate();
	},
	disable_wheel: function() {
		this.wheel = false;
	},
	enable_wheel: function() {
		this.wheel = true;
	}
}

function preloader_ready() {
	let svg_object = document.getElementById("preloader-svg");
	let svg = svg_object.contentDocument;
	let path = ["w-path", "e1-path", "l-path", "c-path", "o-path", "m-path", "e2-path"]
	for(var i=0; i<path.length; i++) {
		let p = svg.getElementById(path[i]);
		let a = "all_in 1s linear forwards " + (i*0.25) + "s";
		p.style.animation = a;
	}
	setTimeout(function() {
		let a = document.getElementById("view-screen");
		a.classList.remove("view-screen-offset");

		setTimeout(function() {
			a.style.zIndex = "unset";
			document.getElementById("preloader").remove();
			all_ready();
		}, 1500)
	}, 3000)
}

function all_ready() {
	nav.append_element();
	$(".nav-link").hover(function()	{
		if(!this.classList.contains("active")){
			nav.append_element(this, this.dataset.navigation, false);
		};
	}, function(){
		if(!this.classList.contains("active")){
			nav.remove_element(this, this.dataset.navigation);
		}
	});

	$(".nav-link").click(function() {
		if(view.wheel){
			current.set_next_page(parseInt(this.dataset.navigation));
			if(current.difference() == 0){
				current.set_next_page(null);
			}
			else{
				view.scroll();
			}
		}
	})

	$(".mobile-nav-indicator").click(function() {
		let navbar = document.getElementById("navbar");
		if(this.classList.contains("toggled") == false) {
			this.className += " toggled"
			navbar.style.transform = "translate3d(0, 0, 0)";
			setTimeout(nav.mobile_nav_in, 400);
		}
		else {
			this.classList.remove("toggled");
			navbar.style.transform = "";
			nav.mobile_nav_out();
		}
	})

	$(".mobile-nav-link").click(function() {
		let navbar = document.getElementById("navbar");
		let linkData = this.dataset.navigation;

		$(".mobile-nav-indicator").click();

		navbar.addEventListener("transitionend", function n() {
			if(view.wheel){
				current.set_next_page(parseInt(linkData));
				if(current.difference() == 0){
					current.set_next_page(null);
				}
				else{
					view.scroll();
				}
			}
		})
	})

	if(!visited){
		let sec_in_function = window[current.get_in_function()];
		sec_in_function();
		visited = true;
	}

	// Add Wheel Event Listener to <body> of the page
	let body = document.querySelector("body");
	body.addEventListener("wheel", function(){});
	body.onwheel = function(event) {
		// Check direction (1: scroll down, 2: scroll up)
		let wheel_direction = event.deltaY > 0 ? 1 : -1;

		if(view.wheel && !(current.page == 1 && wheel_direction == -1) && !(current.page == 4 && wheel_direction == 1)) {
			if(wheel_direction === 1) {
				current.set_next_page(current.page + 1);
			}
			else {
				current.set_next_page(current.page - 1);
			}
			view.scroll();
		}
		else {
			event.preventDefault();
		}
	};


	// Add Touchmove Event Listener to <body> of the page
	// Touchscreen Device
	let touchStartY;
	let touchEndY;
	body.addEventListener("touchstart", function(e){
		touchStartY = e.changedTouches[0].clientY;
	});

	body.addEventListener("touchend", function(e){
		touchEndY = e.changedTouches[0].clientY;
		move();
	});

	function d() {
		if(Math.abs(touchStartY - touchEndY) < 100) {
			return 0;
		}
		if(touchStartY > touchEndY) {
			return 1;
		}
		if(touchStartY < touchEndY) {
			return -1;
		}
	}

	function move() {
		let direction = d();
		if(view.wheel && !(current.page == 1 && direction == -1) && !(current.page == 4 && direction == 1) && !(direction == 0) ) {
			if(direction == 1) {
				current.set_next_page(current.page + 1);
			}
			if(direction == -1) {
				current.set_next_page(current.page - 1);
			}
			view.scroll();
		}
	}
	

}

let visited = false;
window.addEventListener("load", function() {
	
	preloader_ready();

})


/*

$(document).ready(function() {
	nav.append_element();
	$(".nav-link").hover(function()	{
		if(!this.classList.contains("active")){
			nav.append_element(this, this.dataset.navigation, false);
		};
	}, function(){
		if(!this.classList.contains("active")){
			nav.remove_element(this, this.dataset.navigation);
		}
	});

	$(".nav-link").click(function() {
		if(view.wheel){
			current.set_next_page(parseInt(this.dataset.navigation));
			if(current.difference() == 0){
				current.set_next_page(null);
			}
			else{
				view.scroll();
			}
		}
	})

	if(!visited){
		let sec_in_function = window[current.get_in_function()];
		sec_in_function();
		visited = true;
	}

	// Add Event Listener to <body> of the page
	let body = document.querySelector("body");
	body.addEventListener("wheel", function(){});
	body.onwheel = function(event) {
		// Check direction (1: scroll down, 2: scroll up)
		let wheel_direction = event.deltaY > 0 ? 1 : -1;

		if(view.wheel && !(current.page == 1 && wheel_direction == -1) && !(current.page == 4 && wheel_direction == 1)) {
			if(wheel_direction === 1) {
				current.set_next_page(current.page + 1);
			}
			else {
				current.set_next_page(current.page - 1);
			}
			view.scroll();
		}
		else {
			event.preventDefault();
		}
	};
})*/