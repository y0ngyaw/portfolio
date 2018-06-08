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
			intro_word_array[i].style.transitionDelay = ((i*75)/1000) + "s";
			intro_word_array[i].className += " intro-text-in";
		}

		section_1.intro_loaded = true;
	},
	animate_out: function() {
		this.leaving = true;
		let intro_word_array = this.intro_word();
		for(var i=0; i<intro_word_array.length; i++) {
			intro_word_array[i].style.transitionDelay = "0s";
			intro_word_array[i].classList.remove("intro-text-in");
		}

		intro_word_array[0].addEventListener("transitionend", function intro() {
			section_1.leaving = false;
			section_1.intro_loaded = false;
		});
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

	/*
	$(document).mousemove(function(e){
		var ww = $( window ).width();
		var wh = $( window ).height();
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		var traX = ( mouseX - ww/2 ) * 0.025 + 50;
		var traY = ( mouseY - wh/2 ) * 0.025;
		$(".section-1").css({"background-position": traX + "%" + traY + "%"});
	});*/
}

var section_1_out = function() {
	section_1.remove_in_position(section_1.firstname());
	section_1.remove_in_position(section_1.lastname());
	section_1.lastname().style.transitionDelay = "0s";
	section_1.mask_cover();
	section_1.animate_out();
};

function random(min, max) {
	return Math.random() * (max - min) + min;
}

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
		let passionArray = document.getElementsByClassName("passion-text-wrapper");
		document.getElementById("passion-wrapper").style.opacity = "1";
		this.title_in_position = false;
		
		function formulatePos() {
			return "translate3d(" + random(-300, 300) + "px, " + random(-300, 300) + "px, " + random(-300, 300) + "px) scale(" + random(1.1, 4.5) + ")";
		};

		function initialPos() {
			let delay = 0;
			for(var i=0; i<passionArray.length; i++) {
				passionArray[i].childNodes.forEach(function(n) {
					n.style.transitionDelay = (delay*0.015) + "s";
					n.style.transform = formulatePos();
					delay++;
				});
			}
		};

		function animatePos() {
			for(var i=0; i<passionArray.length; i++) {
				passionArray[i].childNodes.forEach(function(n) {
					n.style.transform = "translate3d(0, 0, 0) scale(1)";
					n.style.opacity = 1;
				});
			};

			let last = passionArray[passionArray.length - 1].lastChild;
			last.addEventListener("transitionend", function p() {
				if(section_2.title_in_position == false) {
					section_2.in_position(section_2.no_goal());
					section_2.in_position(section_2.beyond());
					section_2.title_in_position = true;
				}
				last.removeEventListener("transitionend", p);
			});
		};

		initialPos();
		requestAnimationFrame(animatePos);
	},
	passion_animate_out: function() {
		this.title_in_position = true;
		let passionArray = document.getElementsByClassName("passion-text-wrapper");

		function animatePos() {
			for(var i=0; i<passionArray.length; i++) {
				passionArray[i].childNodes.forEach(function(n) {
					n.style.transitionDelay = "0s";
					n.style.transform = "translate3d(0, 45px, 0) scale(1)";
					n.style.opacity = 0;
				});
			};
		};

		requestAnimationFrame(animatePos);
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

var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

const slide_1 = {
	d_loaded: false,
	leaving: false,
	first_img: true,
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
		let img1 = document.getElementById("project-1-1");
		let initialY = 10;
		let initialOpacity = 0;

		function animate() {
			if(initialY > 0) {
				initialY = initialY - 0.2;
				initialOpacity = initialOpacity + 0.02;
				img1.style.transform = "translate3d(0, " + initialY + "%, 0)";
				img1.style.opacity = initialOpacity;
				requestAnimationFrame(animate);
			}
		};
		animate();
	},
	animate_in_img_2: function() {
		let img2 = document.getElementById("project-1-2");
		let initialY = 10;
		let initialOpacity = 0;

		function animate() {
			if(initialY > 0) {
				initialY = initialY - 0.2;

				initialOpacity = initialOpacity + 0.02;
				img2.style.transform = "translate3d(0, " + initialY + "%, 0)";
				img2.style.opacity = initialOpacity;
				requestAnimationFrame(animate);
			}
		};
		setTimeout(animate, 250);
	},
	animate_out_img_1: function() {
		let img1 = document.getElementById("project-1-1");
		let initialY = 0;
		let initialOpacity = 1;

		function animate() {
			if(initialY < 10) {
				initialY = initialY + 0.2;
				initialOpacity = initialOpacity - 0.02;
				img1.style.transform = "translate3d(0, " + initialY + "%, 0)";
				img1.style.opacity = initialOpacity;
				requestAnimationFrame(animate);
			}
		};
		animate();
	},
	animate_out_img_2: function() {
		let img2 = document.getElementById("project-1-2");
		let initialY = 0;
		let initialOpacity = 1;

		function animate() {
			if(initialY < 10) {
				initialY = initialY + 0.2;
				initialOpacity = initialOpacity - 0.02;
				img2.style.transform = "translate3d(0, " + initialY + "%, 0)";
				img2.style.opacity = initialOpacity;
				requestAnimationFrame(animate);
			}
		};
		animate();
	},
	ns_in_position: function() {
		requestAnimationFrame(function() {
			slide_1.name().style.transform = "translate3d(0, 0, 0)";
			requestAnimationFrame(function() {
				slide_1.subtitle().style.transform = "translate3d(0, 0, 0)";
			})
		});		
	},
	ns_out_position: function() {
		this.name().style.transform = null;
		this.subtitle().style.transform = null;
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
				let dArray = slide_1.description_array();

				for(var i=0; i<dArray.length; i++) {
					dArray[i].style.transitionDelay = (i*75/1000) + "s";
					dArray[i].className += " project-1-description-word-in";
				}

				dArray[dArray.length - 1].addEventListener("transitionend", function d() {
					if(slide_1.leaving === false && slide_1.d_loaded === true) {
						slide_1.animate_in_project_link();
					}
					dArray[dArray.length - 1].removeEventListener("transitionend", d);
				})
			}
			name.removeEventListener("transitionend", n);
		});		
	},
	animate_out_description: function() {
		let dArray = this.description_array();
		for(var i=0; i<dArray.length; i++) {
			dArray[i].style.transitionDelay = "0s";
			dArray[i].classList.remove("project-1-description-word-in");
		};
		this.d_loaded = false;
	},
	animate_in: function() {
		if(!this.first_img) {
			this.animate_in_img_1();
			this.first_img = true;
		}
		this.animate_in_img_2();
		this.ns_in_position();
		this.split_description();
		document.querySelector(".project-1-description").style.opacity = 1;
		this.animate_in_description();
	},
	animate_out: function() {
		this.leaving = true;
		this.first_img = false;
		this.animate_out_img_1();
		this.animate_out_img_2();
		this.animate_out_project_link();
		this.ns_out_position();
		if(this.d_loaded) {
			this.animate_out_description();
		};
	}
}

const slide_first = {
	split_project: function() {
		splitText("project-word", "project-wrapper-word", "project-wrapper-char");
	},
	animate_in: function() {
		this.split_project();
		document.getElementById("project-word").style.opacity = 1;
		document.getElementById("arrow").style.opacity = 1;
		document.getElementById("mobile-swipe").style.opacity = 1;
		let charArray = document.getElementsByClassName("project-wrapper-char");

		function animate() {
			for(var i=0; i<charArray.length; i++) {
				charArray[i].style.transitionTimingFunction = "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
				charArray[i].style.transitionDelay = i*0.1 + "s";
				charArray[i].style.transform = "translate3d(0, 0, 0)";
				charArray[i].style.opacity = 1;
			}
		};
		requestAnimationFrame(animate);
	},
	animate_out: function() {
		document.getElementById("arrow").style.opacity = 0;
		document.getElementById("mobile-swipe").style.opacity = 0;
		let charArray = document.getElementsByClassName("project-wrapper-char");

		function animate() {
			for(var i=0; i<charArray.length; i++) {
				charArray[i].style.transitionTimingFunction = "cubic-bezier(0.55, 0.055, 0.675, 0.19)";
				charArray[i].style.transform = "translate3d(0, 100%, 0)";
				charArray[i].style.opacity = 0;
			}
		};
		requestAnimationFrame(animate);
	}
}

const slide_last = {
	title: function() {
		return document.getElementById("updating");
	},
	message: function() {
		return document.getElementById("message");
	},
	animate_in_title: function() {
		requestAnimationFrame(function() {
			slide_last.title().style.transform = "translate3d(0, 0, 0)";
		});
	},
	animate_out_title: function() {
		this.title().style.transform = "translate3d(0, 100%, 0)"
	},
	split_message: function() {
		splitText("message", "message-word", "message-char");
	},
	animate_in_message: function() {
		this.split_message();
		let message_array = document.getElementsByClassName("message-word");
		
		setTimeout(function() {
			for(var i=0; i<message_array.length; i++) {
				message_array[i].style.transitionDelay = (i*75/1000) + "s";
				message_array[i].className = message_array[i].className + " message-word-in";
			}
		}, 500);	
	},
	animate_out_message: function() {
		let message_array = document.getElementsByClassName("message-word");
		for(var i=0; i<message_array.length; i++) {
			message_array[i].style.transitionDelay = "0s";
			message_array[i].classList.remove("message-word-in");
		};
	},
	animate_in: function() {
		this.animate_in_title();
		this.animate_in_message()
	},
	animate_out: function() {
		this.animate_out_title();
		this.animate_out_message();
	}
}

const section_3 = {
	scrollable: true,
	slide_function: [slide_first, slide_1, slide_last],
	slide_status: [false, false, false],
	slide_num: 1,
	check_direction: function(mouse_pos) {
		let ww = window.innerWidth;
		if(mouse_pos > (ww * 90 / 100)) {
			return "right"
		}
		else if (mouse_pos < (ww * 10 / 100)) {
			return "left"
		}
		else {
			return null
		}
	},
	slide_num_increment: function() {
		this.slide_num = this.slide_num + 1;
		if(this.slide_num > this.slide_function.length) {
			this.slide_num  = this.slide_function.length;
		}
	},
	slide_num_decrement: function() {
		this.slide_num = this.slide_num - 1;
		if(this.slide_num < 1) {
			this.slide_num  = 1;
		}
	},
	move_slide: function(mouse_pos) {
		if(this.scrollable == false) {
			return;
		};
		let direction = this.check_direction(mouse_pos);
		let all_slide = document.getElementById("all-slide");
		if (direction == null) {
			return;
		}
		else if(!(direction == "right" && this.slide_num == this.slide_function.length) && !(direction == "left" && this.slide_num == 1)) {
			if(direction == "right") {
				this.slide_num_increment();
			}
			else if(direction == "left") {
				this.slide_num_decrement();
			}

			all_slide.style.transform = "translate(-" + ((this.slide_num-1) * 80) + "%, 0)";
			this.scrollable = false;
			this.current_slide_in();

			setTimeout(function() {
				section_3.scrollable = true;
			}, 2000);
		};
	},
	current_slide_in: function() {
		if(this.slide_status[this.slide_num - 1] == false) {
			this.slide_function[this.slide_num - 1].animate_in();
			this.slide_status[this.slide_num - 1] = true;
		}
	},
	all_slide_out: function() {
		for(var i=0; i<this.slide_function.length; i++) {
			this.slide_function[i].animate_out();
			this.slide_status[i] = false;
		}
	},
	mobile_move_slide: function() {
		let touchStartX;
		let touchEndX;
		let s3 = document.getElementById("section-3");
		s3.addEventListener("touchstart", function(e){
			touchStartX = e.changedTouches[0].clientX;
		});

		s3.addEventListener("touchend", function(e){
			touchEndX = e.changedTouches[0].clientX;
			navigate();
		});

		function swipeDirection() {
			if(Math.abs(touchStartX - touchEndX) < 70) {
				return 0;
			}
			if(touchStartX > touchEndX) {
				// Goint right
				return 1;
			}
			if(touchStartX < touchEndX) {
				// Going left
				return -1;
			}
		}

		function navigate() {
			let all_slide = document.getElementById("all-slide");
			let d = swipeDirection();
			if(!(d == -1 && section_3.slide_num == 1) && !(d == 1 && section_3.slide_num == section_3.slide_function.length)) {
				if(d == 1) {
					section_3.slide_num_increment();
				}
				else if(d == -1) {
					section_3.slide_num_decrement();
				}

				all_slide.style.transform = "translate(-" + ((section_3.slide_num-1) * 80) + "%, 0)";
				section_3.current_slide_in();
			}
		}
	}
}

var section_3_in = function() {
	section_3.current_slide_in();
	let s3 = document.getElementById("section-3");
	s3.addEventListener("mousemove", function(event){
		section_3.move_slide(event.clientX);
	});	
	section_3.mobile_move_slide();
};

var section_3_out = function() {
	section_3.all_slide_out();
};

const section_4 = {
	talk: function() {
		return document.getElementById("talk-text");
	},
	whoiam: function() {
		return document.getElementById("whoiam");
	},
	item: function() {
		return document.getElementsByClassName("contact-item");
	},
	animate_in: function(elList) {
		function initialSet() {
			for(var i=0; i<elList.length; i++) {
				elList[i].style.transitionDelay = i*250/1000 + "s";
			}
		}

		function animate() {
			for(var i=0; i<elList.length; i++) {
				elList[i].className += " contact-item-visible";
			}
		}

		initialSet();
		requestAnimationFrame(animate);
	},
	animate_out: function(elList) {
		function initialSet() {
			for(var i=0; i<elList.length; i++) {
				elList[elList.length - 1 - i].style.transitionDelay = i*250/1000 + "s";
			}
		}

		function animate() {
			for(var i=0; i<elList.length; i++) {
				elList[i].classList.remove("contact-item-visible");
			}
		}

		initialSet();
		requestAnimationFrame(animate);
	},
	talk_in_position: function() {
		this.talk().className = this.talk().className + " s4-in-position";
	},
	talk_out_position: function() {
		this.talk().classList.remove("s4-in-position");
	},
	whoiam_in_position: function() {
		this.whoiam().className = this.whoiam().className + " s4-in-position";
	},
	whoiam_out_position: function() {
		this.whoiam().classList.remove("s4-in-position");
	}
}

var section_4_in = function() {
	section_4.talk_in_position();
	section_4.whoiam_in_position();
	section_4.animate_in(section_4.item());
};

var section_4_out = function() {
	section_4.talk_out_position();
	section_4.whoiam_out_position();
	section_4.animate_out(section_4.item());
};