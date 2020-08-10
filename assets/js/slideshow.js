jQuery(document).ready(function($) {
	startSlider($('#slider'), 30); // Slide container ID, SlideShow interval 
	function startSlider(obj, timer) {
		var obj, timer;
		var id = "#" + obj.attr("id");
		var slideCount = obj.find('ul li').length;
		slideWidth = obj.attr("data-width");
		var sliderUlWidth = (slideCount + 1) * slideWidth;
		var time = 2;
		var $bar,
			isPause,
			tick,
			percentTime;
		isPause = false; //false for auto slideshow
		$bar = obj.find('.progress .bar');

		function startProgressbar() {
			resetProgressbar();
			percentTime = 0;
			tick = setInterval(interval, timer);
		}

		function interval() {
			if (isPause === false) {
				percentTime += 1 / (time + 0.1);
				$bar.css({
					width: percentTime + "%"
				});
				if (percentTime >= 100) {
					moveRight();
					startProgressbar();
				}
			}
		}

		function resetProgressbar() {
			$bar.css({
				width: 0 + '%'
			});
			clearTimeout(tick);
		}

		function startslide() {
			$(id + ' ul li:last-child').prependTo(id + ' ul');
			obj.find('ul').css({
				width: sliderUlWidth + 'vw',
				marginLeft: -slideWidth + 'vw'
			});
			obj.find('ul li:last-child').appendTo(obj.attr('id') + ' ul');
		}
		if (slideCount > 1) {
			startslide();
			startProgressbar();
		} else { // hade navigation buttons for 1 slide only
			$(id + ' button.control_prev').hide();
			$(id + ' button.control_next').hide();
		}

		function moveLeft() {
			$(id + ' ul').css({
				transition: "1s",
				transform: "translateX(" + slideWidth + "vw)"
			});
			setTimeout(function() {
				$(id + ' ul li:last-child').prependTo(id + ' ul');
				$(id + ' ul').css({
					transition: "none",
					transform: "translateX(" + 0 + "vw)"
				});
				$('li.actslide').prev().addClass('actslide').next().removeClass('actslide');
			}, 1000);
		}

		function moveRight2() { // fix for only 2 slades
			$(id + ' ul li:first-child').appendTo(id + ' ul');
			$(id + ' ul').css({
				transition: "none",
				transform: "translateX(100vw)"
			}).delay();
			setTimeout(function() {
				$(id + ' ul').css({
					transition: "1s",
					transform: "translateX(0vw)"
				});
			}, 100, setTimeout(function() {
				$(id + ' ul').css({
					transition: "none",
					transform: "translateX(0vw)"
				});
				$('li.actslide').next().addClass('actslide').prev().removeClass('actslide');
			}, 1000));
		}

		function moveRight() {
			if (slideCount > 2) {
				$(id + ' ul').css({
					transition: "1s",
					transform: "translateX(" + (-1) * slideWidth + "vw)"
				});
				setTimeout(function() {
					$(id + ' ul li:first-child').appendTo(id + ' ul');
					$(id + ' ul').css({
						transition: "none",
						transform: "translateX(" + 0 + "vw)"
					});
					$('li.actslide').next().addClass('actslide').prev().removeClass('actslide');
				}, 1000);
			} else {
				moveRight2();
			}
		}
		$(id + ' button.control_prev').click(function() {
			moveLeft();
			startProgressbar();
		});
		$(id + ' button.control_next').click(function() {
			moveRight();
			startProgressbar();
		});
		$(id + ' .progress').click(function() {
			if (isPause === false) {
				isPause = true;
			} else {
				isPause = false;
			}
		});
	};
});