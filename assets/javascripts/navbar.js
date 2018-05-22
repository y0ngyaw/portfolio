/*
let animate_navbar = function(node) {
	let nav = node || document.getElementsByClassName("nav-link-button-wrapper");

	for(var i=0; i<nav.length; i++) {
		for(var j=0; j<nav[i].childNodes.length; j++) {
			animation_property = {
				y_begin: -nav[i].childNodes[j].clientHeight ,
				y_end: 0,
				opacity_begin: 0,
				transform_type: "translateY",
				duration: 500,
				delay: (i+1)*j*100,
				easing: "cubic-bezier(0.175, 0.8, 0, 2)"
			}

			let l = new Letter(nav[i].childNodes[j], animation_property);
			l.animate();
		}
	}
}*/