(function($) {
	var radius = 500,
		radius_padding = 150;
	var fireRecord = [];
	var lightTimer;

	var lightMagic = function(elem) {

		var circle = 1;
		var $container = elem;

		$container.find(".token-level").each(function(index) {

			var deg = fireRecord[circle];

			deg = Math.floor(deg);

			$(this).css('-webkit-transform', 'rotate(' + deg + 'deg)');
			$(this).css('-moz-transform', 'rotate(' + deg + 'deg)');
			$(this).css('-ms-transform', 'rotate(' + deg + 'deg)');
			$(this).css('-o-transform', 'rotate(' + deg + 'deg)');
			$(this).css('transform', 'rotate(' + deg + 'deg)');
			circle++;
		});
	}
	function addWidget(container, widget, circle) {
		var height = radius - (circle - 1) * radius_padding;
		var top = (circle - 1) * radius_padding / 2;
		widget.css('top', top + 'px');
		widget.css('left', top + 'px');
		widget.css('height', height + 'px');
		widget.css('width', height + 'px');
	}

	var makeupMagic = function(elem) {
		var circle = 1,
			circle_start = 0;
		var $container = elem,
			$widget = $('<div class="token-level"></div>');

		$container.addClass("ring");
		$widget.appendTo($container);
		fireRecord[circle] = 0;
		$container.find("span").each(function(index) {
			var deg = (Math.log(circle) * circle * circle * circle * circle / 128 + 1) * 7 * (index - circle_start);
			if (deg >= 360) {
				addWidget($container, $widget, circle);
				$widget = $('<div class="token-level"></div>');
				$widget.appendTo($container);				
				deg = 0;
				circle_start = index;
				circle++;
				fireRecord[circle] = 0;
			}

			var height = radius - (circle - 1) * radius_padding;

			$(this).css('top', '5px');
			$(this).css('height', height + 'px');
			$(this).css('left', height/2-10 + 'px');
			$(this).css('-webkit-transform', 'rotate(' + deg + 'deg)');
			$(this).css('-moz-transform', 'rotate(' + deg + 'deg)');
			$(this).css('-ms-transform', 'rotate(' + deg + 'deg)');
			$(this).css('-o-transform', 'rotate(' + deg + 'deg)');
			$(this).css('transform', 'rotate(' + deg + 'deg)');

			var text = $(this).text();
			$(this).html(text);
			$(this).addClass("token");
			$(this).appendTo($widget);
		});

		var height = radius - (circle - 1) * radius_padding;
		var top = (circle - 1) * radius_padding / 2;
		addWidget($container, $widget, circle);
		$widget = $('<div class="token-level"></div>');
		$widget.appendTo($container);
		circle++;
		$(document).find(".center-content").each(function() {
			var height = radius - (circle - 1) * radius_padding;
			$(this).css('top', height/2 + 'px');
			$(this).css('left', '10px');
			$(this).css('height', height + 'px');
			$(this).css('width', height + 'px');
			$(this).appendTo($widget);			
		});
		addWidget($container, $widget, circle);
		lightTimer = setInterval(lightMagic, 60, elem);
	}

	var runMagic = function() {
		for (var i in fireRecord) {
			var deg = (Math.log(i) * i / 6 + 1);
			if (i % 2 == 0)
				fireRecord[i] += deg;
			else
				fireRecord[i] -= deg;
		}
	}

	var runMagicRandom = function() {
		for (var i in fireRecord) {
			var deg = (Math.log(i) * i / 3 + 1);
			deg *= Math.log(i + 1);
			if (i % 2 == 0)
				fireRecord[i] += deg;
			else
				fireRecord[i] -= deg;
		}
	}

	var fireMagic = function(elem) {
		var fireTimer = setInterval(runMagicRandom, 100);
	}

	function sleep(elem, millis, callback) {
		
		var $container = elem;
		var level = $container.find('.token-level').first();
		function myAnimation(tag) {
			if(!tag)	return;
			var w = tag;
			w.addClass('animated rotateOut');
			sleepN(w, 500, function(tag) {
				myAnimation(tag.next());
			});
		}
		myAnimation(level);

		setTimeout(function() {
			callback();
		}, millis);
	}

	function sleepN(elem, millis, callback) {
		setTimeout(function() {
			callback(elem);
		}, millis);
	}

	var boomMagic = function(elem) {
		clearInterval(lightTimer);
		var $container = elem;
		sleep(elem, 3000, function() {
			var level = $container.find('.token-level').first();
			function myAnimation(tag) {
				if(!tag)	return;
				var w = tag;
				w.removeClass('rotateOut');
				w.addClass('rotateIn');
				sleepN(w, 500, function(tag) {
					myAnimation(tag.next());
				});
			}
			myAnimation(level);
			// $container.find('.token-level').each(function(index) {
			// 	$(this).removeClass('rotateOut');
			// 	$(this).addClass('rotateIn');
			// });
			lightTimer = setInterval(lightMagic, 100, elem);
			sleepN(elem, 3000, function() {
				$container.find('.token-level').each(function(index) {
					$(this).removeClass('rotateIn');
				});
			});
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
				$(this).lettering();
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