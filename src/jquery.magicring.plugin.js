(function($) {
	$.fn.extend({
		magicring: function(options){
			var defaults = {
				list         : 'abcdefghijklmnopqrstuvwxyz1234567890p;!@#$%^&?|',
				font         : 'src/MagicRing.ttf',
				baseduration : 5,
				height       : 200,
				rings        : 3,
				spacing      : 90
			};		

			var options = $.extend(defaults, options);

			return this.each(function(){
				var o = options;
				var obj = $(this);

				var lt = o.list;
				var du = o.baseduration;
				var ht = o.height;
				var ri = o.rings;
				var sl = o.spacing;
				var ft = o.font;

				$('head').append('<style>'
								+'@font-face{font-family: MagicRing;src: url(' + ft + ');}'
								+'.ring{font:24px MagicRing;color:#fff;text-shadow:-1px 1px 20px rgba(237,112,215,.7),1px 1px 20px rgba(237,112,215,.7),1px -1px 20px rgba(237,112,215,.7),-1px -1px 20px rgba(237,112,215,.7);position:absolute;top:0;bottom:0;left:0;right:0;width:100%;height:100%;margin:auto;-webkit-transform-origin:center;-moz-transform-origin:center;-ms-transform-origin:center;-o-transform-origin:center;transform-origin:center}.ring span{position:absolute;margin:auto;top:0;left:0;bottom:0;right:0;width:20px;-webkit-transform-origin:center;-moz-transform-origin:center;-ms-transform-origin:center;-o-transform-origin:center;transform-origin:center}.ring:nth-child(2n){-webkit-animation:counter-clockwise linear infinite;animation:counter-clockwise linear infinite}.ring:nth-child(2n+1){-webkit-animation:clockwise linear infinite;animation:clockwise linear infinite}@keyframes counter-clockwise{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes counter-clockwise{from{-webkit-transform:rotate(0deg);-o-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-o-transform:rotate(360deg)}}@keyframes clockwise{from{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-360deg);-moz-transform:rotate(-360deg);-ms-transform:rotate(-360deg);-o-transform:rotate(-360deg);transform:rotate(-360deg)}}@-webkit-keyframes clockwise{from{-webkit-transform:rotate(0deg);-o-transform:rotate(0deg)}to{-webkit-transform:rotate(-360deg);-o-transform:rotate(-360deg)}}'
								+'</style>');
				
				obj.css({'overflow' : 'hidden',
					     'position' : 'relative',
					     'width'    : (ht+sl*ri+20) + 'px',
					     'height'   : (ht+sl*ri+20) + 'px'});

				function RandString(int_x) {
				  	var temp="";
				  	console.log(lt.length);
				  	for( var i = 0 ; i <= parseInt(int_x) ; i++ )
				    	temp += lt.charAt( Math.floor( Math.random() * lt.length ) );
				  	return temp;
				}

				function pt2px(ori_pt){
				    return (eval(ori_pt) * 96 / 72);
				}
				//Degered
				function deg(h, w){
				  	return Math.tan(w/h) * (180 / Math.PI);
				}



				function CreateMagicRing(){
					for ( var i = 0 ; i < ri ; i++ ){
					    obj.append('<div id="Ring' + i + '" class="ring">' 
					          + RandString( 360 / ( deg( (ht+sl*i), pt2px( parseInt(obj.css('font-size')) )*4 ) ) ) 
					          + '</div>');

					}
					var dege;
					var ring_id;
					obj.find('.ring').lettering();
					
					obj.find('.ring').each(function(index){
					    var count = $('#' + this.id + ' > span').length;
					    dege = 360/count;
					    ring_id = index;
					    $('#'+ this.id).css({'webkitanimationDuration' : (ring_id+1)*du + 's',
					                            'MozanimationDuration' : (ring_id+1)*du + 's',
					                             'msanimationDuration' : (ring_id+1)*du + 's',
					                              'OanimationDuration' : (ring_id+1)*du + 's',
					                               'animationDuration' : (ring_id+1)*du + 's'});
					    $('#'+ this.id + ' > span').each(function(index){
					        var currentdeg = dege * index;
					
					        $(this).css({'webkitTransform' : 'rotate(' + currentdeg + 'deg)',
					                        'MozTransform' : 'rotate(' + currentdeg + 'deg)',
					                         'msTransform' : 'rotate(' + currentdeg + 'deg)',
					                          'OTransform' : 'rotate(' + currentdeg + 'deg)',
					                           'transform' : 'rotate(' + currentdeg + 'deg)',
					                              'height' : '' + (ht + ring_id * sl) + 'px' });
					    });
				   	});
				}

				CreateMagicRing();
			});
		}

    });
})(jQuery);
