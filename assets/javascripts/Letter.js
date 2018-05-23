/***************************************************
 * This object takes in 3 parameters
 * I.  node - The element  
 * II. animation_property - An object that determines the type of animation, the property of animation including
 *		opacity_begin (default 0) 
 *		opacity_end, x_begin (default 1) 
 *		x_end (default random generate)
 *		y_begin (default random generate)
 *		y_end (default random generate)
 *		z_begin (default random generate)
 *		z_end (default random generate)
 *		scale_begin (default random generate)
 *		scale_end (default random generate)
 *		rotate_deg_begin (default 0)
 *		rotate_deg_end (default 0)
 *		transform_type (default translate) (only except translate, translate3d, scale and rotate currently)
 *		duration (default 1000)
 *		delay (default 0)
 *		easing (default "ease-in-out")
 *		fill (default "forwards")
 *
 *		PS: animation_property is optional and all the properties in the object will be default unless specified
 *		
 *III. r_scale - An object that determines the scale for random option in this object
 *		min (default 0)
 *		max (default 500)
 *		scale_min (default 0.1)
 *		scale_max (2)
 *
 ****************************************************/
function Letter(node, animation_property = {}, r_scale = {}) {
	// Data
	this.node = node;
	this.animation_property = animation_property;
	this.r_scale = r_scale;
	this.animate_prop_set = false;

	// Function
	this.random = function(min, max) {
		return Math.random() * (max - min) + min;
	};

	this.set_random_scale = function(random_scale = {}) {
		this.min = random_scale.hasOwnProperty("min") ? random_scale.min : (this.min || 0);
		this.max = random_scale.hasOwnProperty("max") ? random_scale.max : (this.max || 500);
		this.scale_min = random_scale.hasOwnProperty("scale_min") ? random_scale.scale_min : (this.scale_min || 0.1);
		this.scale_max = random_scale.hasOwnProperty("scale_max") ? random_scale.scale_max : (this.scale_max || 2);
	}

	this.set_animate_prop = function(prop = {}, random_scale = {}) {
		this.set_random_scale(random_scale);
		this.opacity_begin = prop.hasOwnProperty("opacity_begin") ? prop.opacity_begin : 0;
		this.opacity_end = prop.hasOwnProperty("opacity_end") ? prop.opacity_end : 1;
		this.x_begin = prop.hasOwnProperty("x_begin") ? prop.x_begin : this.random(this.min, this.max);
		this.x_end = prop.hasOwnProperty("x_end") ? prop.x_end : this.random(this.min, this.max);
		this.y_begin = prop.hasOwnProperty("y_begin") ? prop.y_begin : this.random(this.min, this.max);
		this.y_end = prop.hasOwnProperty("y_end") ? prop.y_end : this.random(this.min, this.max);
		this.z_begin = prop.hasOwnProperty("z_begin") ? prop.z_begin : this.random(this.min, this.max);
		this.z_end = prop.hasOwnProperty("z_end") ? prop.z_end : this.random(this.min, this.max);
		this.scale_begin = prop.hasOwnProperty("scale_begin") ? prop.scale_begin : this.random(this.scale_min, this.scale_max);
		this.scale_end = prop.hasOwnProperty("scale_end") ? prop.scale_end : this.random(this.scale_min, this.scale_max);
		this.rotate_deg_begin = prop.hasOwnProperty("rotate_deg_begin") ? prop.rotate_deg_begin : 0;
		this.rotate_deg_end = prop.hasOwnProperty("rotate_deg_end") ? prop.rotate_deg_end : 0;
		this.animate_prop_set = true;
	}

	this.set_transform_prop = function(prop = {}) {
		this.transform_type = prop.hasOwnProperty("transform_type") ? prop.transform_type : (this.transform_type || "translate");
		this.duration = prop.hasOwnProperty("duration") ? prop.duration : (this.duration || 1000);
		this.delay = prop.hasOwnProperty("delay") ? prop.delay : (this.delay || 0);
		this.easing = prop.hasOwnProperty("easing") ? prop.easing : (this.easing || "ease-in-out");
		this.fill = prop.hasOwnProperty("fill") ? prop.fill : (this.fill || "forwards");
	}

	this.set_transform = function(prop) {
		transform = "";
		this.transform_type.split(" ").forEach(function(t){
			if(t === "translate") {
				transform = transform + t + "(" + prop.x + "px, " + prop.y + "px) ";
			}
			else if(t === "translate3d") {
				transform = transform + t + "(" + prop.x + "px, " + prop.y + "px, " + prop.z + "px) ";
			}
			else if(t === "translateX") {
				transform = transform + t + "(" + prop.x + "px) ";
			}
			else if(t === "translateY") {
				transform = transform + t + "(" + prop.y + "px) ";
			}
			else if(t === "translateZ") {
				transform = transform + t + "(" + prop.z + "px) ";
			}
			else if(t === "scale") {
				transform = transform + t + "(" + prop.scale + ") ";
			}
			else if(t === "rotate") {
				transform = transform + t + "(" + prop.rotate + "deg) ";
			}
		});
		return transform;
	}

	this.animate = function() {
		if(!this.animate_prop_set) {
			this.set_animate_prop(this.animation_property, this.r_scale);
		}
		if(this.transform_type === undefined) {
			this.set_transform_prop(this.animation_property);
		}

		t_begin = this.set_transform({ x: this.x_begin, y: this.y_begin, z: this.z_begin, scale: this.scale_begin, rotate: this.rotate_deg_begin });
		t_end = this.set_transform({ x: this.x_end, y: this.y_end, z: this.z_end, scale: this.scale_end, rotate: this.rotate_deg_end });

		return this.node.animate([
			{	// from 
				opacity: this.opacity_begin,
				transform: t_begin,
			},
			{
				// to
				opacity: this.opacity_end,
				transform: t_end,
			}], 
			{ 
				duration: this.duration,
				easing: this.easing,
				delay: this.delay,
				fill: this.fill
			}
		);
	};
}