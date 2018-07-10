function mag(show, bigshow, smallshow, mask, bigitem) {
  this.show = show;
  this.bigshow = bigshow;
  this.smallshow = smallshow;
  this.mask = mask;
  this.bigitem = bigitem;
  this.obj = {
    prev: '.prev',
    next: '.next',
    middle: '.middle',
    middleBox: '.middle_box'
  }
}

mag.prototype = {
  init: function () {
    this.start();
    this.showHover();
    this.smallImgHover();
    this.showMove();
    this.prevHover();
    this.prevClick();
    this.nextClick();
    this.nextHover();
  },
  start: function () {
    var that = this;
    var buil = $(that.show).width() / $(that.mask).width() * $(that.bigshow).width();
    $(that.bigitem).css("width", buil);

    $(that.smallshow + ' .img-mask').eq(0).show();

    var middleUl = $(that.obj.middle + ' li').innerWidth() * $(that.obj.middle + ' li').length;

    $(that.obj.middle).width(middleUl).height($(that.obj.middle + ' li').innerHeight());

  },
  showHover: function () {
    var that = this;
    $(this.show).hover(function () {
      $(that.bigshow).show();
      $(that.mask).show();
      $('.detail-header-right').hide();
    }, function () {
      $(that.bigshow).hide();
      $(that.mask).hide();
      $('.detail-header-right').show();
    });
  },
  smallImgHover: function () {
    var that = this;
    $(this.smallshow).hover(function () {
      $(that.obj.prev).css("left", "0");
      $(that.obj.next).css("right", "0");
    }, function () {
      $(that.obj.prev).css("left", "-38px");
      $(that.obj.next).css("right", "-38px");
    });

    $(that.smallshow + ' img').click(function () {
      var src = $(this).attr("src");
      $(that.smallshow + ' .img-mask').hide();
      $(this).siblings('.img-mask').show();
      $(that.show + '>img').attr("src", src);
      $(that.bigitem + '>img').attr("src", src);
    });
  },
  showMove: function () {
    var that = this;
    $(that.show).mousemove(function (e) {
      var bigx = $(this).offset().left;
      var bigy = $(this).offset().top;
      var x = e.clientX;
      var y = e.clientY;
      var scrollx = window.scrollX;
      var scrolly = window.scrollY;
      var ox = x + scrollx - bigx - $(that.mask).width() / 2;
      var oy = y + scrolly - bigy - $(that.mask).height() / 2;
      if (ox <= 0) {
        ox = 0
      }
      if (ox > $(that.show).width() - $(that.mask).width()) {
        ox = $(that.show).width() - $(that.mask).width();
      }
      if (oy <= 0) {
        oy = 0
      }
      if (oy > $(that.show).height() - $(that.mask).height()) {
        oy = $(that.show).height() - $(that.mask).height();
      }
      $(that.mask).css({left: ox});
      $(that.mask).css({top: oy});
      var bei = $(that.show).width() / $(that.mask).width();
      $(that.bigitem + '>img').css(
        {
          marginLeft: -bei * ox,
          marginTop: -bei * oy
        })
    });
  },
  prevClick: function () {
    var that = this;
    $(that.obj.prev).click(function () {
      var marginLeft = parseInt($(that.obj.middle).css("marginLeft"));
      var middleBoxWidth = $(that.obj.middleBox).width();
      var middleWidth = $(that.obj.middle).width();

      if (marginLeft == 0) {
        return;
      }

      if (middleWidth - middleBoxWidth > 0) {
        if (Math.abs(marginLeft) > middleBoxWidth) {
          $(that.obj.middle).css("marginLeft", marginLeft + middleBoxWidth);
          $(that.obj.prev).removeClass('layui-disabled');
          $(that.obj.next).removeClass('layui-disabled');
        }
        if (Math.abs(marginLeft) <= middleBoxWidth) {
          $(that.obj.middle).css("marginLeft", 0);
          $(that.obj.next).removeClass('layui-disabled');
          $(that.obj.prev).addClass('layui-disabled');
        }
      } else {
        $(that.obj.next).addClass('layui-disabled');
        $(that.obj.prev).addClass('layui-disabled');
        return;
      }
    });
  },
  prevHover: function () {
    var that = this;
    $(that.obj.prev).hover(function () {
      var marginLeft = parseInt($(that.obj.middle).css("marginLeft"));
      if (marginLeft === 0) {
        $(that.obj.prev).addClass('layui-disabled');
      }
    })
  },
  nextClick: function () {
    var that = this;
    $(that.obj.next).click(function () {
      var marginLeft = parseInt($(that.obj.middle).css("marginLeft"));
      var middleBoxWidth = $(that.obj.middleBox).width();
      var middleWidth = $(that.obj.middle).width();

      if ( Math.abs(marginLeft) + middleBoxWidth == middleWidth ) {
        return;
      }

      if (middleWidth - middleBoxWidth > 0) {
        var theRight = middleWidth - Math.abs(marginLeft) - middleBoxWidth;
        if (theRight > middleBoxWidth) {
          $(that.obj.middle).css("marginLeft", -middleBoxWidth + marginLeft);
          $(that.obj.prev).removeClass('layui-disabled');
          $(that.obj.next).removeClass('layui-disabled');
        }
        if (theRight <= middleBoxWidth) {
          $(that.obj.middle).css("marginLeft", -(middleWidth - middleBoxWidth));
          $(that.obj.prev).removeClass('layui-disabled');
          $(that.obj.next).addClass('layui-disabled');
        }
      } else {
        $(that.obj.next).addClass('layui-disabled');
        $(that.obj.prev).addClass('layui-disabled');
        return;
      }

    });
  },
  nextHover: function () {
    var that = this;
    $(that.obj.next).hover(function () {
      var marginleft = parseInt($(that.obj.middle).css("marginLeft"));
      var middleBoxWidth = $(that.obj.middleBox).width();
      var middleWidth = $(that.obj.middle).width();

      if ((Math.abs(marginleft) + middleBoxWidth) == middleWidth) {
        $(that.obj.next).addClass('layui-disabled');
      }
    })
  }

}




