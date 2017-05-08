define(['jquery'], function($) {


    return {

        init: function() {
            //这里的路径是以js文件夹为基准的
            // 1、主页加载头部
            $('header').load('../src/html/index_top.html', function() {

                //设置下拉微信
                $(".uu").hover(function() {

                        $(".wx").stop(true).slideDown();

                    }, function() {

                        $('.wx').slideUp();
                    })
                    //设置下拉我的小锅
                $(".home").hover(function() {

                        $(".xg").stop(true).slideDown();

                    }, function() {

                        $('.xg').slideUp();
                    })
                    //设置我的下拉服务
                $(".server").hover(function() {

                    $(".myserver").stop(true).slideDown();

                }, function() {

                    $('.myserver').slideUp();
                })

                // 设置切换gif动态图

                $(".sz").hover(function() {

                    $(this).find("img").attr("src", "../src/img/header/home_overseas_current.gif")
                }, function() {

                    $(this).find("img").attr("src", "../src/img/header/home_overseas.gif")
                })


                //设置下拉菜单             
                $(".na").hover(function() {
                    $(this).addClass('top_f_active');
                    $(".navlist").stop(true).slideDown();
                }, function() {
                    $(this).removeClass('top_f_active');
                    $(".navlist").slideUp();
                })



                //设置导航条右侧
                $('.top_f_r').find("li").hover(function() {

                    $(this).stop(true).animate({
                        "width": 130
                    })
                }, function() {
                    $(this).stop(true).animate({
                        "width": 27
                    })
                }) 
            })

			// 2、加载内容
			$('main').load('../src/html/index_main.html',function(){				 
                var currentIndex = 0,
                    time = 3000,
                    hasStarted = false,

                    length = $('.images').length;
                    console.log(length)
                $('.images:not(:first)').hide();

                function next() {
                    var preIndex = currentIndex;
                    currentIndex = ++currentIndex % length;
                    play(preIndex, currentIndex);
                 
                }

                function play(preIndex, currentIndex) {
                    $('.images').eq(preIndex).fadeOut(500).parent().children().eq(currentIndex).fadeIn(1000);
                    $('.round span').eq(preIndex).attr("id","lb_active").siblings().attr("id","");
                }    
                   
                  setInterval(next, time);
          
             
			})


        }
    }
})
