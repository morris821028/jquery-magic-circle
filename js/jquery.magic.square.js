(function($) {
	var magic_circle = 1,
		circle_start = 0;
	var radius = 500,
		radius_padding = 150;
	var fireRecord = [];
	var lightTimer;

	var lightMagic = function(elem) {
		var os = magic_circle % 50;
		s = Math.floor((Math.abs(os - 25) * Math.abs(os - 25)) / 625 * 100);

		var circle = 1,
			circle_start = 0;
		elem.find("span").each(function(index) {
			var deg = (Math.log(circle) * circle / 6 + 1) * 7 * (index - circle_start);

			if (deg >= 355) {
				deg = 0;
				circle_start = index;
				circle++;
			}

			var height = radius - (circle - 1) * radius_padding;
			var top = (circle - 1) * radius_padding / 2;

			deg += fireRecord[circle];

			deg = Math.floor(deg);

			$(this).css('top', top + 'px');
			$(this).css('height', height + 'px');
			$(this).css('-webkit-transform', 'rotate(' + deg + 'deg)');
			$(this).css('-moz-transform', 'rotate(' + deg + 'deg)');
			$(this).css('-ms-transform', 'rotate(' + deg + 'deg)');
			$(this).css('-o-transform', 'rotate(' + deg + 'deg)');
			$(this).css('transform', 'rotate(' + deg + 'deg)');
		});
		elem.find(".token").each(function(index) {
			$(this).css('-webkit-box-shadow', '0px 0px ' + s + 'px rgba(177, 17, 22, 1)');
			$(this).css('-moz-box-shadow', '0px 0px ' + s + 'px rgba(177, 17, 22, 1)');
			$(this).css('box-shadow', '0px 0px ' + s + 'px rgba(177, 17, 22, 1)');
		});
		os++;
		magic_circle = os;
	}

	var makeupMagic = function(elem) {
		var circle = 1,
			circle_start = 0;

		fireRecord[circle] = 0;
		elem.find("span").each(function(index) {
			var deg = (Math.log(circle) * circle / 6 + 1) * 7 * (index - circle_start);

			if (deg >= 355) {
				deg = 0;
				circle_start = index;
				circle++;
				fireRecord[circle] = 0;
			}

			var height = radius - (circle - 1) * radius_padding;
			var top = (circle - 1) * radius_padding / 2;

			$(this).css('top', top + 'px');
			$(this).css('height', height + 'px');
			$(this).css('-webkit-transform', 'rotate(' + deg + 'deg)');
			$(this).css('-moz-transform', 'rotate(' + deg + 'deg)');
			$(this).css('-ms-transform', 'rotate(' + deg + 'deg)');
			$(this).css('-o-transform', 'rotate(' + deg + 'deg)');
			$(this).css('transform', 'rotate(' + deg + 'deg)');

			var text = $(this).text();
			$(this).html('<div class="token">' + text + '<div>');
		});
		lightTimer = setInterval(lightMagic, 50, elem);
	}

	var runMagic = function() {
		for(var i in fireRecord) {
			var deg = (Math.log(i) * i / 6 + 1);
			if(i%2 == 0)
				fireRecord[i] += deg;
			else
				fireRecord[i] -= deg;
		}
	}

	var runMagicRandom = function() {
		for(var i in fireRecord) {
			var deg = (Math.log(i) * i / 6 + 1);
			deg *= Math.log(i + 1);
			if(i%2 == 0)
				fireRecord[i] += deg;
			else
				fireRecord[i] -= deg;
		}
	}

	var fireMagic = function(elem) {
		var fireTimer = setInterval(runMagicRandom, 100);
	}

	function sleep(millis, callback) {
	    setTimeout(function()
	            { callback(); }
	    , millis);
	}
	
	var boomMagic = function(elem) {
		clearInterval(lightTimer);
		sleep(1000, function() {
			lightTimer = setInterval(lightMagic, 100, elem);
		});
	}

	var methods = {
		init: function() {
			return $(this).each(function() {
				makeupMagic($(this));
			});

		},

		fire: function() {
			return this.each(function() {
				makeupMagic($(this));
				fireMagic($(this));
			});
		},

		boom: function() {
			return this.each(function() {
				boomMagic($(this));
			});
		}
	};

	$.fn.magicsquare = function(method) {
		// Method calling logic
		if (method && methods[method]) {
			return methods[method].apply(this, [].slice.call(arguments, 1));
		} else if (method === 'test' || !method) {
			return methods.init.apply(this, [].slice.call(arguments, 0)); // always pass an array
		}
		$.error('Method ' + method + ' does not exist on jQuery.magic.square.js');
		return this;
	};

})(jQuery);