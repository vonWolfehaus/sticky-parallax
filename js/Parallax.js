(function(){
var root = this;

var Parallax = function(element) {
	this.speed = parseFloat(element.dataset.speed);
	this.height = parseInt(element.dataset.height);
	
	var rect = element.getBoundingClientRect();
	// take into account case where the user refreshed after scrolling a bit by adding scroll offset
	this.top = rect.top + (window.pageYOffset === undefined ? document.documentElement.scrollTop : window.pageYOffset);
	this.posY = 0;
	
	this.container = document.createElement('span');
	
	this.img = new Image();
	this.img.classList.add('parallaxed-mirror');
	this.img.style.top = this.top+'px'; // since they're positioned absolutely, place them where the containers are
	
	var clip = this.height + (this.height * this.speed);
	this.img.style.clip = 'rect(0px, auto, '+clip+'px, 0px)';
	this.img.src = element.dataset.src;
	
	this.container.appendChild(this.img);
	document.body.insertBefore(this.container, document.body.firstChild);
};

Parallax.prototype = {
	update: function(scroll) {
		// only update position while image is on screen
		if (scroll + window.innerHeight < this.top) return;
		if (scroll > this.top + this.height) return;
		
		this.posY = -(scroll * this.speed);
		this.img.style.transform = 'translate3d(0px, '+this.posY+'px, 0)'; // translate relative to current position
	}
};

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Parallax;
    }
    exports.Parallax = Parallax;
} else if (typeof define !== 'undefined' && define.amd) {
    define(Parallax);
} else {
    root.Parallax = Parallax;
}
}).call(this);
