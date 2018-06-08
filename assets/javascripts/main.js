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
			let a = document.querySelector(".content");
			let initialScale = 1;
			let currentWidth = 100;
			let currentOpacity = 1;
			let nextWidth = 0;
			let nextOpacity = 0;

			function shrink() {
				if(initialScale > 0.8) {
					initialScale = initialScale - 0.005;
					a.style.transform = "scale(" + initialScale + ")";
					requestAnimationFrame(shrink);
				}
				else {
					if(current.difference() < 0 ) {
						current.node().style.right = "unset";
						current.node().style.left = 0;
						current.node().childNodes[1].style.float = "left";

						current.next_node().style.right = 0;
						current.next_node().style.left = "unset";
						current.next_node().childNodes[1].style.float = "right";
					}
					else {
						current.node().style.right = 0;
						current.node().style.left = "unset";
						current.node().childNodes[1].style.float = "right";

						current.next_node().style.right = "unset";
						current.next_node().style.left = 0;
						current.next_node().childNodes[1].style.float = "left";
					}
					currentOut();
					nextIn();
				}
			}

			function currentOut() {
				if(currentWidth > 0) {
					currentWidth = currentWidth - 1.25;
					currentOpacity = currentOpacity - 0.0125;
					current.node().style.width = currentWidth + "%";
					current.node().style.opacity = currentOpacity;
					requestAnimationFrame(currentOut);
				}
			}

			function nextIn() {
				if(nextWidth < 100) {
					nextWidth = nextWidth + 1.25;
					nextOpacity = nextOpacity + 0.0125;
					current.next_node().style.width = nextWidth + "%";
					current.next_node().style.opacity = nextOpacity;
					requestAnimationFrame(nextIn);
				}
				else {
					zoom();
				}
			}

			function zoom() {
				if(initialScale < 1) {
					initialScale = initialScale + 0.005;
					a.style.transform = "scale(" + initialScale + ")";
					requestAnimationFrame(zoom);
				}
				else {
					nav.remove_element();
					current.update_page();
					let sec_in_function = window[current.get_in_function()];
					sec_in_function();
					nav.append_element();
					num.update();
					view.enable_wheel();
				}
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