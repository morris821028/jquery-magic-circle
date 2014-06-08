(function($) {
	var radius = 600,
		radius_padding = 150,
		radius_center = 250;
	var magic_circle = 0;
	var lightTimer;

	var lightMagic = function(elem) {
		var os = magic_circle % 50;
		var $container = elem;
		os = Math.floor((Math.abs(os - 25) * Math.abs(os - 25)) / 625 * 100);

		$container.find(".token-level").each(function(index) {
			$(this).css('text-shadow', '-1px 1px ' + os + 'px rgba(237, 112, 215, 0.7),' + '1px 1px ' + os + 'px rgba(237, 112, 215, 0.7),' + '1px -1px ' + os + 'px rgba(237, 112, 215, 0.7),' + '-1px -1px ' + os + 'px rgba(237, 112, 215, 0.7);');
			if (Math.random() < 0.01) {
				modifyDuration($(this), 5);
				var level = $(this).find('.token').first();
				var recover = level;
				myAnimation2(level, function() {
					
				});
				sleepN($(this), 3000, function(tag) {
					modifyDuration(tag, 10);
					myAnimation3(level);
				});
			}
		});
		magic_circle++;
	}

		function addWidget(container, widget, circle, attrHeight) {
			var height = radius;
			widget.css('top', attrHeight + 'px');
			widget.css('left', '0px');
			widget.css('height', height + 'px');
			widget.css('width', height + 'px');
			return attrHeight - height;
		}

		function addAnimation(widget, circle, duration) {
			widget.css({
				'webkitanimationDuration': duration + 's',
				'MozanimationDuration': duration + 's',
				'msanimationDuration': duration + 's',
				'OanimationDuration': duration + 's',
				'animationDuration': duration + 's'
			});
			if (circle % 2 == 0)
				widget.addClass('counter-clockwise');
			else
				widget.addClass('clockwise');
		}

		function modifyDuration(tag, duration) {
			tag.css({
				'webkitanimationDuration': duration + 's',
				'MozanimationDuration': duration + 's',
				'msanimationDuration': duration + 's',
				'OanimationDuration': duration + 's',
				'animationDuration': duration + 's'
			});
		}
	var makeupMagic = function(elem) {
		var circle = 5;
		circle_start = 0;
		var $container = elem,
			$widget = $('<div class="token-level-const"></div>');
		var attrHeight = radius_padding;
		var du = 5;

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
		addAnimation($widget, circle, du);
		circle--;
		$container.find("span").each(function(index) {
			var currentdeg = (Math.log(circle) * circle * circle * circle * circle / 128 + 1) * 8 * (index - circle_start);
			if (currentdeg >= 360) {
				attrHeight = addWidget($container, $widget, circle, attrHeight);

				$widget = $('<div class="token-level"></div>');
				$widget.appendTo($container);
				addAnimation($widget, circle, du);

				circle_start = index;
				circle--;
			}

			var height = radius - (circle - 1) * radius_padding + radius_center,
				distTop = (radius - height) / 2,
				distLeft = radius / 2 - 10;
			$(this).css({
				'top': distTop + 'px',
				'left': distLeft + 'px',
				'height': height + 'px'
			});
			$(this).css({
				'webkitTransform': 'rotate(' + currentdeg + 'deg)',
				'MozTransform': 'rotate(' + currentdeg + 'deg)',
				'msTransform': 'rotate(' + currentdeg + 'deg)',
				'OTransform': 'rotate(' + currentdeg + 'deg)',
				'transform': 'rotate(' + currentdeg + 'deg)'
			});
			$(this).addClass("token");
			$(this).appendTo($widget);
		});
		attrHeight = addWidget($container, $widget, circle, attrHeight);
		lightTimer = setInterval(lightMagic, 500, elem);
	}

		function rotateInAndOut(tag, millis, callback) {
			tag.addClass('animated flash');
			sleepN(tag, millis, function(tag) {
				tag.removeClass('flash');
				callback(tag);
			});
		}

		function fadeOut(tag, millis, callback) {
			tag.addClass('animated fadeOut');
			sleepN(tag, millis, function(tag) {
				tag.fadeOut();
				callback(tag);
			});
		}

		function fadeIn(tag, millis, callback) {
			tag.addClass('animated fadeIn');
			sleepN(tag, millis, function(tag) {
				tag.fadeIn();
				callback(tag);
			});
		}

		function myAnimation(tag) {
			if (!tag) return;
			rotateInAndOut(tag, 3000, function(tag) {
				myAnimation(tag.next());
			});
		}

		function myAnimation2(tag, callback) {
			if (!tag) {
				callback(tag);
				return;
			}
			fadeOut(tag, 100, function(tag) {
				myAnimation2(tag.next());
				tag.removeClass('fadeOut');
			});
		}

		function myAnimation3(tag, callback) {
			if (!tag) {
				callback(tag);
				return;
			}
			console.log(tag);
			fadeIn(tag, 100, function(tag) {
				myAnimation3(tag.next());
				tag.removeClass('fadeIn');
			});
		}

		function sleepN(elem, millis, callback) {
			setTimeout(function() {
				callback(elem);
			}, millis);
		}

	var boomMagic = function(elem) {
		clearInterval(lightTimer);
		var $container = elem;
		var level = $container.find('.token-level').first();
		myAnimation(level);
		sleepN(elem, 10000, function() {
			lightTimer = setInterval(lightMagic, 500, elem);
			$container.find('.token-level').each(function(index) {
				modifyDuration($(this), 10);
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