(function() {

	var width, height, largeHeader, canvas, ctx, circles, animateHeader = true;

	// Main
	initHeader();
	addListeners();

	function initHeader() {
		width = window.innerWidth;
		height = window.innerHeight;

		largeHeader = document.createElement('div');
		largeHeader.id = 'large-header';
		largeHeader.style.position = 'fixed';
		largeHeader.style.zIndex = '0';
		largeHeader.style.width = width + 'px';
		largeHeader.style.height = height + 'px';
		largeHeader.style.backgroundImage = 'URL('+baseDir+'/static/img/bg-normal.jpg)';
		largeHeader.style.backgroundPosition = 'center bottom';
		largeHeader.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=50,finishOpacity=50)";
		largeHeader.style.opacity = "0.5";
		document.body.appendChild(largeHeader);

		canvas = document.createElement('canvas');
		canvas.id = 'bg-canvas';
		canvas.width = width;
		canvas.height = height;
		largeHeader.appendChild(canvas);
		ctx = canvas.getContext('2d');

		// create particles
		circles = [];
		for (var x = 0; x < width * 0.5; x++) {
			var c = new Circle();
			circles.push(c);
		}
		animate();
	}

	// Event handling
	function addListeners() {
		window.addEventListener('scroll', scrollCheck);
		window.addEventListener('resize', resize);
	}

	function scrollCheck() {
		if (document.body.scrollTop > height)
			animateHeader = false;
		else
			animateHeader = true;
	}

	function resize() {
		width = window.innerWidth;
		height = window.innerHeight;
		largeHeader.style.height = height + 'px';
		canvas.width = width;
		canvas.height = height;
	}

	function animate() {
		if (animateHeader) {
			ctx.clearRect(0, 0, width, height);
			for ( var i in circles) {
				circles[i].draw();
			}
		}
		requestAnimationFrame(animate);
	}

	// Canvas manipulation
	function Circle() {
		var _this = this;

		// constructor
		(function() {
			_this.pos = {};
			init();
			console.log(_this);
		})();

		function init() {
			_this.pos.x = Math.random() * width;
			_this.pos.y = height + Math.random() * 100;
			_this.alpha = 0.1 + Math.random() * 0.3;
			_this.scale = 0.1 + Math.random() * 0.3;
			_this.velocity = Math.random();
		}

		this.draw = function() {
			if (_this.alpha <= 0) {
				init();
			}
			_this.pos.y -= _this.velocity;
			_this.alpha -= 0.0005;
			ctx.beginPath();
			ctx.arc(_this.pos.x, _this.pos.y, _this.scale * 10, 0, 2 * Math.PI,
					false);
			ctx.fillStyle = 'rgba(255,255,255,' + _this.alpha + ')';
			ctx.fill();
		};
	}

})();