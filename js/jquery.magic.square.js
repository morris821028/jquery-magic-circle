(function($) {
	var radius = 500,
		radius_padding = 150;
	var fireRecord = [],
		magic_circle = 0;
	var lightTimer;

	var lightMagic = function(elem) {
		var os = magic_circle % 50,
			s = Math.floor((Math.abs(os - 25) * Math.abs(os - 25)) / 625 * 100),
			circle = 1;
		var $container = elem;

		$container.find(".token-level").each(function(index) {

			var deg = fireRecord[circle] % 720;

			deg = Math.floor(deg);

			$(this).css('-webkit-transform', 'rotate(' + deg + 'deg)');
			$(this).css('-moz-transform', 'rotate(' + deg + 'deg)');
			$(this).css('-ms-transform', 'rotate(' + deg + 'deg)');
			$(this).css('-o-transform', 'rotate(' + deg + 'deg)');
			$(this).css('transform', 'rotate(' + deg + 'deg)');

			$(this).css('text-shadow', '-1px 1px ' + s + 'px rgba(237, 112, 215, 0.7),' + '1px 1px ' + s + 'px rgba(237, 112, 215, 0.7),' + '1px -1px ' + s + 'px rgba(237, 112, 215, 0.7),' + '-1px -1px ' + s + 'px rgba(237, 112, 215, 0.7);');

			circle++;
		});
		magic_circle++;
	}

		function addWidget(container, widget, circle, attrHeight) {
			var height = radius - (circle - 1) * radius_padding;
			var top = (circle - 1) * radius_padding / 2;
			widget.css('top', attrHeight + radius_padding + 'px');
			widget.css('left', top + 'px');
			widget.css('height', height + 'px');
			widget.css('width', height + 'px');
			return attrHeight - height - radius_padding/2;
		}

	var makeupMagic = function(elem) {
		var circle = 4;
			circle_start = 0;
		var $container = elem,
			$widget = $('<div class="token-level-const"></div>');
		var attrHeight = radius_padding;

		$container.addClass("ring");
		$widget.appendTo($container);
		
		$(document).find(".center-content").each(function() {
			$(this).css('top', '32px');
			$(this).css('left', '-10px');
			$(this).appendTo($widget);
		});
		attrHeight = addWidget($container, $widget, circle, attrHeight);
		$widget = $('<div class="token-level"></div>');
		$widget.appendTo($container);

		circle--;
		fireRecord[circle] = 0;
		$container.find("span").each(function(index) {
			var deg = (Math.log(circle) * circle * circle * circle * circle / 128 + 1) * 7 * (index - circle_start);
			if (deg >= 360) {
				attrHeight = addWidget($container, $widget, circle, attrHeight);
				$widget = $('<div class="token-level"></div>');
				$widget.appendTo($container);
				deg = 0;
				circle_start = index;
				circle--;
				fireRecord[circle] = 0;
			}

			var height = radius - (circle - 1) * radius_padding;

			$(this).css('top', '0px');
			$(this).css('height', height + 'px');
			$(this).css('left', height / 2 - 10 + 'px');
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
		attrHeight = addWidget($container, $widget, circle, attrHeight);
		circle--;
		fireRecord[circle] = 0;
		lightTimer = setInterval(lightMagic, 80, elem);
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
				if (!tag) return;
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
				if (!tag) return;
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