const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

// Image 
let first_page_image = new Image();
//first_page_image.src = "assets/images/me.png";
first_page_image.onload = function() {
	c.drawImage(first_page_image, 0, 0, canvas.width, canvas.height);
}