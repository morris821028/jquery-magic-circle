var strlist = 'abcdefghijklmnopqrstuvwxyz1234567890p;!@#$%^&?|';

function RandString(int_x) {
  var temp="";

  for( var i = 0 ; i <= parseInt(int_x) ; i++ ){
    temp += strlist.charAt( Math.floor( Math.random() * strlist.length ) );
  }
  return temp;
}

function pt2px(original_pt){
  return (eval(original_pt) * 96 / 72);
}

function deg(h, w){
    console.log(h +' / ' +w);
  return Math.tan(w/h) * (180 / Math.PI);
}

function CreateMagicRing(ori_h, rings, h){
  for ( var i = 0 ; i < rings ; i++ ){
    $('#MagicRing').append('<div id="Ring' + i + '" class="ring">' 
          + RandString( 360 / ( deg( (ori_h+h*i), pt2px( parseInt($('#MagicRing').css('font-size')) )*4 ) ) ) 
          + '</div>');

  }
  var dege;
  var ring_id;
  $('.ring').lettering();
  
  $('.ring').each(function(index){
      var count = $('#' + this.id + ' > span').length;
      dege = 360/count;
      ring_id = index;
      $('#'+ this.id).css({'webkitanimationDuration' : (ring_id+1)*10 + 's',
                              'MozanimationDuration' : (ring_id+1)*10 + 's',
                               'msanimationDuration' : (ring_id+1)*10 + 's',
                                'OanimationDuration' : (ring_id+1)*10 + 's',
                                 'animationDuration' : (ring_id+1)*10 + 's'});
      $('#'+ this.id + ' > span').each(function(index){
          var currentdeg = dege * index;
  
          $(this).css({'webkitTransform' : 'rotate(' + currentdeg + 'deg)',
                          'MozTransform' : 'rotate(' + currentdeg + 'deg)',
                           'msTransform' : 'rotate(' + currentdeg + 'deg)',
                            'OTransform' : 'rotate(' + currentdeg + 'deg)',
                             'transform' : 'rotate(' + currentdeg + 'deg)',
                                'height' : '' + (ori_h + ring_id * h) + 'px' });
      });
  });
}