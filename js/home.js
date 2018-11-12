
$(function(){

    //初始化swiper
    var mySwiper = new Swiper('.swipermodel1', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 12,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChangeTransitionEnd: function () {
                var realIndex = this.realIndex;
                $(".model2-h2 >span").hide().eq(realIndex).fadeIn(200);
            },
        },
    })

    var mySwiper2 = new Swiper('.swipermodel2', {
        direction: 'horizontal',
        slidesPerView: "auto",
        spaceBetween: 20,
        freeMode: true,
        shortSwipes:false,
        on: {
            touchStart: function(event){
                sliderTitleFixed();
            },
            touchMove: function(event){
                sliderTitleFixed();
            },
            setTransition: function(){
                sliderTitleFixed();
            }, 
        },
    })

    //获取操作元素
    var slidedom = $(".model3-slide2");
    //局左显示
    function sliderTitleFixed(){
        if(!slidedom){
            return;
        }
        var left = slidedom.offset().left;               
        if(left < 10){
            $(".model3-slide2-title").css("visibility","hidden");
            $(".model3-title").css("display","block");
        }else{
            $(".model3-slide2-title").css("visibility","visible");
            $(".model3-title").css("display","none");
        }
    }

});