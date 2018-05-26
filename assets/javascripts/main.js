window.onresize = function(){ location.reload(); }

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
	nav_object: [{text: "intro", color: "#534178"}, {text: "passion", color: "#AB5129"}, {text: "project", color: "#2980B9"}, {text: "contact", color: "#534178"}],
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
		e.animate([
		{
			transform: "translateY(-100%)"
		},
		{
			transform: "translateY(0)"
		}], {
			duration: 800,
			easing: "ease",
			fill: "forwards",
		})
	},
	active_link: function(el, pos) {
		el.style.color = this.nav_object[pos - 1].color;
		el.style.borderColor = this.nav_object[pos - 1].color;
		el.style.width = "75px";
	},
	deactive_link: function(el, pos) {
		el.style.color = "#7A8275";
		el.style.borderColor = "#7A8275";
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
	formulate_begin: function() {
		return "translateY(-" + ((current.page - 1) * this.wh) + "px)";
	},
	formulate_end: function() {
		return "translateY(-" + ((current.next_page - 1) * this.wh) + "px)";;
	},
	scroll: function() {
		view.disable_wheel();
		let sec_out_function = window[current.get_out_function()];
		sec_out_function();

		let a = document.querySelector(".content").animate([
		{
			transform: "scale(1)"
		}, {
			transform: "scale(0.8)"
		}], {
			duration: 800,
			easing: "ease-in-out",
			fill: "forwards"
		});
		a.onfinish = function() {
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

			current.node().animate([
			{
				width: "100%",
				opacity: 1
			}, {
				width: 0,
				opacity: 0.6
			}], {
				duration: 1000,
				easing: "ease-in-out",
				fill: "forwards"
			});

			let b = current.next_node().animate([
			{
				width: 0,
				opacity: 0.6
			}, {
				width: "100%",
				opacity: 1
			}], {
				duration: 1000,
				easing: "ease-in-out",
				fill: "forwards"
			});

			b.onfinish = function() {
				let c = document.querySelector(".content").animate([
				{
					transform: "scale(0.8)"
				}, {
					transform: "scale(1)"
				}], {
					duration: 800,
					easing: "ease-in-out",
					fill: "forwards"
				});
				c.onfinish = function() {
					nav.remove_element();
					current.update_page();
					let sec_in_function = window[current.get_in_function()];
					sec_in_function();
					nav.append_element();
					num.update();
					view.enable_wheel();
				}
			}
		}
	},
	disable_wheel: function() {
		this.wheel = false;
	},
	enable_wheel: function() {
		this.wheel = true;
	}
}

let visited = false;
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
})