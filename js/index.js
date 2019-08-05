
window.onload = function () {
  //头部效果
  $(".navbar-right > li").mouseover(function () {
    $(this).children("ul").show();//下拉框
    $(this).children("a").children("b").addClass("towardstop");//三角箭头
    $(".nav").addClass("navhover");//背景
    $(".navbar-right >li> a").css("color", "#105de1");//字体颜色
    $("#header_rates").css("color", "#fff");
    $("#logo").attr("src", "img/logohover.png");//logo颜色
  }).mouseleave(function () {
    $(this).children("ul").hide();
    $(this).children("a").children("b").removeClass("towardstop");
    $(".nav").removeClass("navhover");
    $(".navbar-right  >li> a").css("color", "#f4f4f4")
    $("#logo").attr("src", "img/logo.png");
  });
  $("button.navbar-toggle").click(function () {
    $(".nav").addClass("navhover");//背景
    $(".navbar-right >li> a").css("color", "#105de1");//字体颜色
    $("#logo").attr("src", "img/logohover.png");//logo颜色
  });
  // 可以控制鼠标悬浮轮播不暂停
  // $('#myCarousel').carousel({
  //   interval: 2500,
  //   pause: null,
  //   wrap:true
  // });
  //手机端轮播手指滑动方法
  function carousels(box) {
    var $carousels = $(box);
    var startX, endX;
    var offset = 50;
    $carousels.on('touchstart', function (e) {
      startX = e.originalEvent.touches[0].clientX;
    });
    $carousels.on('touchmove', function (e) {
      endX = e.originalEvent.touches[0].clientX;
    });
    $carousels.on('touchend', function (e) {
      var distance = Math.abs(startX - endX);
      if (distance > offset) {
        $(this).carousel(startX > endX ? 'next' : 'prev');
      }
    })
  }
  carousels('#myCarousel_one');
  carousels('#myCarousel_two');
  // 鼠标滚轮事件
  //判断鼠标滚轮滚动方向
  if (window.addEventListener)//FF,火狐浏览器会识别该方法
    window.addEventListener('DOMMouseScroll', wheel, false);
  window.onmousewheel = document.onmousewheel = wheel;//W3C
  //统一处理滚轮滚动事件
  function wheel(event) {
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {//IE、chrome浏览器使用的是wheelDelta，并且值为“正负120”
      delta = event.wheelDelta / 120;
      if (window.opera) delta = -delta;//因为IE、chrome等向下滚动是负值，FF是正值，为了处理一致性，在此取反处理
    } else if (event.detail) {//FF浏览器使用的是detail,其值为“正负3”
      delta = -event.detail / 3;
    }
    if (delta)
      handle(delta);
  }
  //上下滚动时的具体处理函数
  function handle(delta) {
    if (delta < 0) {//向下滚动
      $(".navbar-fixed-top").addClass("navhover");
      $(".navbar-right >li> a").css("color", "#105de1");//字体颜色
      $("#logo").attr("src", "img/logohover.png");//logo颜色
      $(".icon-bar").addClass("icon-bar-hd");
    } else {//向上滚动
      window.onscroll = function () {
        //变量t就是滚动条滚动时，到顶部的距离
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        if (t == 0) {
          $(".nav").removeClass("navhover");
          $(".navbar-right  >li> a").css("color", "#f4f4f4")
          $("#logo").attr("src", "img/logo.png");
          $(".icon-bar").removeClass("icon-bar-hd");
          $("#_top").hide();
        } else {
          $(".navbar-fixed-top").addClass("navhover");
          $(".navbar-right >li> a").css("color", "#105de1");//字体颜色
          $("#logo").attr("src", "img/logohover.png");//logo颜色
          $("#header_rates").css("color", "#fff");
          $(".icon-bar").addClass("icon-bar-hd");
          $("#_top").show();
        }
      }
    }
  }
  //表单
  $("#advice .advice_animate>div>div").click(function () {
    $(this).addClass("animate_mymove");
    $(this).next().children("input").focus()
  });

  //重置
  $("#reset").click(function (params) {
    $(".fromposition  input").val("");
    $('#from_select1 option:first').prop("selected", 'selected');
    $('#from_select2 option:first').prop("selected", 'selected');
    $(".otherinput").hide();
  })
  //导航栏切换
  $("#contactus_form > div").eq(0).children("div").click(function (params) {
    $(this).addClass("cibtact_bottomborder").siblings().removeClass("cibtact_bottomborder");
    let _index = $(this).index();
    $(this).parent().siblings().children("div").eq(_index).show().siblings().hide();
  });

  //模拟select
  ; jQuery.fn.selectFilter = function (options) {
    var defaults = {
      callBack: function (res) { }
    };
    var ops = $.extend({}, defaults, options);
    var selectList = $(this).find('select option');
    var that = this;
    var html = '';

    // 读取select 标签的值
    html += '<ul class="filter-list">';
    $(selectList).each(function (idx, item) {
      var val = $(item).val();
      var valText = $(item).html();
      var selected = $(item).attr('selected');
      var disabled = $(item).attr('disabled');
      var isSelected = selected ? 'filter-selected' : '';
      var isDisabled = disabled ? 'filter-disabled' : '';
      if (selected) {
        html += '<li class="' + isSelected + '" data-value="' + val + '"><a title="' + valText + '">' + valText + '</a></li>';
        $(that).find('.filter-title').val(valText);
      } else if (disabled) {
        html += '<li class="' + isDisabled + '" data-value="' + val + '"><a>' + valText + '</a></li>';
      } else {
        html += '<li data-value="' + val + '"><a title="' + valText + '">' + valText + '</a></li>';
      };
    });

    html += '</ul>';
    $(that).append(html);
    $(that).find('select').hide();

    //点击选择
    $(that).on('click', '.filter-text', function () {
      $(that).find('.filter-list').slideToggle(100);
      $(that).find('.filter-list').toggleClass('filter-open');
      $(that).find('.icon-filter-arrow').toggleClass('filter-show');
    });

    //点击选择列表
    $(that).find('.filter-list li').not('.filter-disabled').on('click', function () {
      var val = $(this).data('value');
      let self = $(this);
      if (val == "other") {
        self.parent().parent().parent().next("input").show().focus();
      } else {
        self.parent().parent().parent().next("input").hide();
      }
      var valText = $(this).find('a').html();
      $(that).find('.filter-title').val(valText);
      $(that).find('.icon-filter-arrow').toggleClass('filter-show');
      $(this).addClass('filter-selected').siblings().removeClass('filter-selected');
      $(this).parent().slideToggle(50);
      for (var i = 0; i < selectList.length; i++) {
        var selectVal = selectList.eq(i).val();
        if (val == selectVal) {
          $(that).find('select').val(val);
        };
      };
      ops.callBack(val); //返回值
    });

    //其他元素被点击则收起选择
    $(document).on('mousedown', function (e) {
      closeSelect(that, e);
    });
    $(document).on('touchstart', function (e) {
      closeSelect(that, e);
    });

    function closeSelect(that, e) {
      var filter = $(that).find('.filter-list'),
        filterEl = $(that).find('.filter-list')[0];
      var filterBoxEl = $(that)[0];
      var target = e.target;
      if (filterEl !== target && !$.contains(filterEl, target) && !$.contains(filterBoxEl, target)) {
        filter.slideUp(50);
        $(that).find('.filter-list').removeClass('filter-open');
        $(that).find('.icon-filter-arrow').removeClass('filter-show');
      };
    }
  };
  // 点击按钮滚动到指定位置
  $('.btn-box>div').click(function(e){
    let scrollEle = '#' + $(this).attr("class").split(' ')[0]
    $('.for-scroll-box').scrollTop(
        $(scrollEle).offset().top - $('.for-scroll-box').offset().top + $('.for-scroll-box').scrollTop()
    );
    // 改变按钮颜色
    $('.btn-box>div').removeClass('btn-blue')
    $(e.target).addClass('btn-blue');

  })


  //这里是初始化
  $('.box1').selectFilter({
    callBack: function (val) {
    }
  });
  $('.box2').selectFilter({
    callBack: function (val) {
    }
  });
  $('.box3').selectFilter({
    callBack: function (val) {
    }
  });
  $('.box4').selectFilter({
    callBack: function (val) {
    }
  });
  $('.box5').selectFilter({
    callBack: function (val) {
    }
  });
  $('.box6').selectFilter({
    callBack: function (val) {
    }
  });
}



