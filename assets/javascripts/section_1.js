const section_1 = {
	intro_loaded: false,
	leaving: false,
	firstname: function() {
		return document.getElementById("firstname")
	},
	lastname: function() {
		return document.getElementById("lastname")
	},
	intro_word: function() {
		return document.getElementsByClassName("intro-text-wrapper")
	},
	in_position: function(el) {
		el.className = el.className + " in-position";
	},
	remove_in_position: function(el) {
		el.classList.remove("in-position");
	},
	intro_split: function() {
		splitText("intro-text", "intro-text-wrapper", "intro-text-char");
	},
	intro_opacity: function(val) {
		$(".intro-text").css("opacity", val);
	},
	animate_in: function() {
		this.intro_opacity(1);
		let intro_word_array = this.intro_word();
		for(var i=0; i<intro_word_array.length; i++) {
			intro_word_array[i].animate([
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
			});
		};
		section_1.intro_loaded = true;
	},
	animate_out: function() {
		this.leaving = true;
		let intro_word_array = this.intro_word();
		let a = [];
		for(var i=0; i<intro_word_array.length; i++) {
			b = intro_word_array[intro_word_array.length - (i+1)].animate([
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
			a.push(b);
		};
		a[0].onfinish = function() {
			section_1.leaving = false;
			section_1.intro_loaded = false;
		}
	},
	mask_remove: function() {
		let mask = document.getElementById("mask");
		mask.style.transform = "translate3d(0, -100%, 0)";
		let img = document.getElementById("img-1");
		img.style.opacity = 1;
	},
	mask_cover: function() {
		let mask = document.getElementById("mask");
		mask.style.transform = "translate3d(0, 0, 0)";
		let img = document.getElementById("img-1");
		img.style.opacity = 0.5;
	}
}

var section_1_in = function() {
	section_1.mask_remove();
	section_1.in_position(section_1.firstname());
	section_1.in_position(section_1.lastname());
	section_1.lastname().style.transitionDelay = "0.5s";
	section_1.intro_split();
	setTimeout(function() {
		if(section_1.intro_loaded === false && section_1.leaving === false){
			section_1.animate_in();
		}
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
	section_1.remove_in_position(section_1.firstname());
	section_1.remove_in_position(section_1.lastname());
	section_1.lastname().style.transitionDelay = "0s";
	section_1.mask_cover();
	section_1.animate_out();
};

const section_2 = {
	title_in_position: false,
	no_goal: function() {
		return document.getElementById("no-goal-text");
	},
	beyond: function() {
		return document.getElementById("beyond-text");
	},
	in_position: function(el) {
		el.className = el.className + " in-position";
	},
	remove_in_position: function(el) {
		el.classList.remove("in-position");
	},
	passion_split: function() {
		splitText("passion-wrapper", "passion-text-wrapper", "passion-text-char");
	},
	passion_animate_in: function() {
		let passion_array = document.getElementsByClassName("passion-text-wrapper");
		document.getElementById("passion-wrapper").style.opacity = "1";
		this.title_in_position = false;
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
			if(section_2.title_in_position === false) {
				section_2.in_position(section_2.no_goal());
				section_2.in_position(section_2.beyond());
				section_2.title_in_position = true;
			}
		};
	},
	passion_animate_out: function() {
		this.title_in_position = true;
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
		};
	}
}

var section_2_in = function() {
	section_2.passion_split();
	section_2.passion_animate_in();
};

var section_2_out = function() {
	section_2.passion_animate_out();
	section_2.remove_in_position(section_2.no_goal());
	section_2.remove_in_position(section_2.beyond());
};	

const slide_1 = {
	d_loaded: false,
	leaving: false,
	img_1: function() {
		return document.getElementById("project-1-1");
	},
	img_2: function() {
		return document.getElementById("project-1-2");
	},
	name: function() {
		return document.getElementById("project-1-name");
	},
	subtitle: function() {
		return document.getElementById("project-1-subtitle");
	},
	split_description: function() {
		splitText("project-1-description", "project-1-description-word", "project-1-description-char")
	},
	description_array: function() {
		return document.getElementsByClassName("project-1-description-word");
	},
	animate_in_img_1: function() {
		this.img_1().animate([
		{
			opacity: 0,
			transform: "translate3d(0, 10%, 0)"
		}, {
			opacity: 1,
			transform: "translate3d(0, 0, 0)"
		}], {
			duration: 1000,
			easing: "ease-in-out", 
			fill: "forwards"
		});
	},
	animate_in_img_2: function() {
		this.img_2().animate([
		{
			opacity: 0,
			transform: "translate3d(0, 10%, 0)"
		}, {
			opacity: 1,
			transform: "translate3d(0, 0, 0)"
		}], {
			duration: 1000,
			easing: "ease-in-out", 
			fill: "forwards",
			delay: 500
		});
	},
	animate_out_img_1: function() {
		this.img_1().animate([
		{
			opacity: 1,
			transform: "translate3d(0, 0, 0)"
		}, {
			opacity: 0,
			transform: "translate3d(0, -10%, 0)"
		}], {
			duration: 1000,
			easing: "ease-in-out", 
			fill: "forwards"
		});
	},
	animate_out_img_2: function() {
		this.img_2().animate([
		{
			opacity: 1,
			transform: "translate3d(0, 0, 0)"
		}, {
			opacity: 0,
			transform: "translate3d(0, -10%, 0)"
		}], {
			duration: 1000,
			easing: "ease-in-out", 
			fill: "forwards"
		});
	},
	ns_in_position: function() {
		this.name().style.transform = "translate3d(0, 0, 0)";
		this.subtitle().style.transform = "translate3d(0, 0, 0)";
	},
	ns_out_position: function() {
		this.name().style.transform = "translate3d(0, 100%, 0)";
		this.subtitle().style.transform = "translate3d(0, 100%, 0)";
		let name = this.name();
		name.addEventListener("transitionend", function ns() {
			slide_1.leaving = false;
			name.removeEventListener("transitionend", ns);
		});
	},
	animate_in_project_link: function() {
		document.getElementById("project-1-link-list").style.opacity = 1;
	},
	animate_out_project_link: function() {
		document.getElementById("project-1-link-list").style.opacity = 0;
	},
	animate_in_description: function() {
		let name = this.name();
		name.addEventListener("transitionend", function n() {
			if(slide_1.leaving === false) {
				slide_1.d_loaded = true;
				let d_array = slide_1.description_array();
				let a = [];
				for(var i=0; i<d_array.length; i++) {
					let b = d_array[i].animate([
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
					});
					a.push(b);
				}
				a[a.length - 1].onfinish = function() {
					if(slide_1.leaving === false && slide_1.d_loaded === true) {
						slide_1.animate_in_project_link();
					}
				}
			}
			name.removeEventListener("transitionend", n);
		});		
	},
	animate_out_description: function() {
		let d_array = this.description_array();
		for(var i=0; i<d_array.length; i++) {
			d_array[i].animate([
			{
				transform: "translate3d(0, 0, 0)",
				opacity: 1
			}, {
				transform: "translate3d(0, 10px, 0)",
				opacity: 0
			}], {
				duration: 1000,
				easing: "cubic-bezier(.215,.61,.355,1)",
				fill: "forwards"
			});
		};
		this.d_loaded = false;
	},
	animate_in: function() {
		this.animate_in_img_1();
		this.animate_in_img_2();
		this.ns_in_position();
		this.split_description();
		document.querySelector(".project-1-description").style.opacity = 1;
		this.animate_in_description();
	},
	animate_out: function() {
		this.leaving = true;
		this.animate_out_img_1();
		this.animate_out_img_2();
		this.animate_out_project_link();
		this.ns_out_position();
		if(this.d_loaded) {
			this.animate_out_description();
		}
	}
}

const section_3 = {

}

var section_3_in = function() {
	slide_1.animate_in();
};

var section_3_out = function() {
	slide_1.animate_out();
};

const section_4 = {
	talk: function() {
		return document.getElementById("talk-text");
	},
	item: function() {
		return document.getElementsByClassName("contact-item");
	},
	animate_in: function(el_list) {
		for(var i=0; i<el_list.length; i++) {
			let a = el_list[i].animate([
			{
				opacity: 0
			}, {
				opacity: 1
			}], {
				duration: 2000,
				delay: i*250,
				easing: "ease",
				fill: "forwards"
			})
		};
	},
	animate_out: function(el_list) {
		for(var i=0; i<el_list.length; i++) {
			el_list[el_list.length -1 -i].animate([
			{
				opacity: 1
			}, {
				opacity: 0
			}], {
				duration: 1000,
				delay: i*100,
				easing: "ease",
				fill: "forwards"
			})
		};
	},
	talk_in_position: function() {
		this.talk().className = this.talk().className + " talk-in-position";
	},
	talk_out_position: function() {
		this.talk().classList.remove("talk-in-position");
	}
}

var section_4_in = function() {
	section_4.talk_in_position();
	section_4.animate_in(section_4.item());
};

var section_4_out = function() {
	section_4.talk_out_position();
	section_4.animate_out(section_4.item());
};