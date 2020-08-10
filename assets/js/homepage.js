(function(window) {

    'use strict';

    $.exists = function(selector) {
        return ($(selector).length > 0);
    }

    // All Funtions
    PageTransition();
    Menu();
    HomeSlider();
    Sort();
    UniteGallery();
    ValidForm();

})(window);

/*------------------
 Page Transition
-------------------*/
function PageTransition() {
    var preload = anime({
        targets: '.ms-preloader',
        opacity: [1, 0],
        duration: 1000,
        easing: 'easeInOutCubic',
        complete: function(preload) {
            $('.ms-preloader').css('visibility', 'hidden');
        }
    });
    $('.ms-main-container').addClass('loaded');
    var cont = anime({
        targets: '.loaded',
        opacity: [0, 1],
        easing: 'easeInOutCubic',
        duration: 1000,
        delay: 300,
        complete: function(preload) {
            $('.ug-thumb-image').css({
                'opacity': '1'
            });
            $('.ms-section__block img').css({
                'opacity': '1'
            });
            $('.ug-thumb-wrapper, .post-item').css({
                'pointer-events': 'auto'
            });
        }
    });
    $(document).on('click', '[data-type="page-transition"]', function(e) {
        var url = $(this).attr('href');
        if (url != '#' && url != '') {
            e.preventDefault();
            $('.ms-preloader').css('visibility', 'visible');
            var url = $(this).attr('href');
            var preload = anime({
                targets: '.ms-preloader',
                opacity: [0, 1],
                duration: 300,
                easing: 'easeInOutQuad',
                complete: function(preload) {
                    window.location.href = url;
                }
            });
        }
    });
}

/*------------------
 Menu
-------------------*/
function Menu() {
    if ($.exists('.hamburger')) {
        $('.hamburger').on('click', function(e) {
            var burger = $(this),
                clicked = parseInt(burger.data('clicked')) || 0;
            burger.data('clicked', clicked + 1);
            if (clicked % 2 == 0) {
                var current = $(window).scrollTop();
                $(window).scroll(function() {
                    $(window).scrollTop(current);
                });
            } else {
                $(window).off('scroll');
            }
            $(burger).toggleClass('is-active');
            $('.ms-nav').toggleClass('is-visible');
            $('.ms-header').not('.navbar-white').each(function() {
                $('.logo-light').toggleClass('active');
            });
        });
    }
}

/*------------------
   Home Slider
-------------------*/
function HomeSlider() {
    if ($.exists('.swiper-container')) {
        var interleaveOffset = -.6;
        var interleaveEffect = {
            onProgress: function(swiper, progress) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slide = swiper.slides[i];
                    var translate, innerTranslate;
                    progress = slide.progress;
                    if (progress > 0) {
                        translate = progress * swiper.width;
                        innerTranslate = translate * interleaveOffset;
                    } else {
                        innerTranslate = Math.abs(progress * swiper.width) * interleaveOffset;
                        translate = 0;
                    }
                    $(slide).css({
                        transform: 'translate3d(' + translate + 'px,0,0)'
                    });
                    $(slide).find('.slide-inner').css({
                        transform: 'translate3d(' + innerTranslate + 'px,0,0)',
                    });
                }
            },
            onTouchStart: function(swiper) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    $(swiper.slides[i]).css({
                        transition: ''
                    });
                }
            },
            onSetTransition: function(swiper, speed) {
                for (var i = 0; i < swiper.slides.length; i++) {
                    $(swiper.slides[i])
                        .find('.slide-inner')
                        .addBack()
                        .css({
                            transition: speed + 'ms'
                        });
                }
            }
        };
        var swiperOptions = {
            loop: false,
            speed: 1000,
            grabCursor: false,
            watchSlidesProgress: true,
            mousewheelControl: true,
            keyboardControl: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            simulateTouch: false,
            pagination: '.swiper-pagination',
            paginationType: 'progress',
            onSlideChangeEnd: function() {
                $('.expanded-timeline__counter span:first-child').text(swiper.activeIndex + 1);
            }
        };
        swiperOptions = $.extend(swiperOptions, interleaveEffect);
        var swiper = new Swiper('.swiper-container', swiperOptions);
        $('.expanded-timeline__counter span:first-child').text('1');
        $('.expanded-timeline__counter span:last-child').text(swiper.slides.length);
    }
}

/*------------------
 Sort
-------------------*/
function Sort() {
    if ($.exists('.filtr-container')) {
        $('.filtr-container').filterizr();
        $('.filtr-btn li').on('click', function() {
            $('.filtr-btn li').removeClass('active');
            $(this).addClass('active');
        });
    }
}
/*------------------
 Unite-Gallery
-------------------*/
function UniteGallery() {
    if ($.exists('#gallery')) {
        $('#gallery').unitegallery({
            gallery_theme: 'tiles',
            tiles_type: "justified",
            tiles_col_width: 400,
            tiles_justified_row_height: 400,
            tiles_justified_space_between: 30,
            // tile_overlay_color: "#000",
            tile_overlay_opacity: 0.7,
            tile_enable_icons: false,
            tile_textpanel_position: "inside_bottom",
        });
    }
}
/*------------------
 Form Validation
-------------------*/