$(document).ready(function() {
	$('.main-background').on('click', function (e) {
		showMosaic();
	});
});

$(window).on("load", function(){
	doMosaic();
});

function buildMosaic(target, maxCols = 20, maxRows = 14) {
	$(".mosaic-container").remove();
	var source = $(target);
	var image = $(target).attr("src");
	var container = $("<div class='mosaic-container'>");
	var clone_source = $(source).clone(true);

	$(clone_source).addClass("mosaic-photo");
	$(clone_source).css({
		position: "absolute",
		opacity: 0.1,
		zIndex: 1,
	});

	var boxRatio = maxCols / maxRows;

	var sWidth = window.innerWidth;
	var sHeight = window.innerHeight;

	var pWidth = sWidth / maxCols * 100 / sWidth;
	var pHeight = sHeight / maxRows * 100 / sHeight;

	$(source).after(container);
	$(source).hide();

	var photo = $("<img class='mosaic-image'>");
	$(photo).attr("src", image);

	var posX = 0, posY = 0, posC = 0, posR = 0;
	for(i = 1; i <= maxCols * maxRows; i++) {
		var div = $("<div class='mosaic-piece'>");

		posX = posC * pWidth * -1;
		posY = posR * pHeight * -1;

		$(photo).css({
			left: posX + "vw",
			top: posY + "vh",
		});

		$(div).append($(photo).clone(true));

		$(div).css({
			width: pWidth + "vw",
			height: pHeight + "vh",
		});
		$(container).append(div);


		posC++;
		if( posC >= maxCols) {
			posC = 0;

			posR++;
			if( posR >= maxRows) posR = 0;
		}

	}

	$(".mosaic-piece").off("mouseenter");
	$(".mosaic-piece").off("mouseleave");
	$(".mosaic-piece").off("click");
	$(".mosaic-piece").on("mouseenter", function() { $("img", this).stop( true, true ).hide(); });
	$(".mosaic-piece").on("mouseleave", function() { $("img", this).fadeIn(2000); });
	$(".mosaic-piece").on("click", hideMosaic);

}

var mousePosition = {x: 0, y: 0};

function findObject() {
	$(".mosaic-piece").each(function() {
		var getPosition = $(this).position();
		var objPosition = {x1: getPosition.top, y1: getPosition.left, x2: getPosition.top + $(this).width(), y2: getPosition.left + $(this).height()};

		if(mousePosition.x >= objPosition.y1 && mousePosition.x <= objPosition.y2 && mousePosition.y >= objPosition.x1 && mousePosition.y <= objPosition.x2) {
			$("img", this).stop( true, true ).hide();
		} else {
			$("img", this).fadeIn(2000);
		}
	});
}

window.addEventListener('touchend', function(e) {
	$("img", ".mosaic-piece").fadeIn(2000);
}, false);

window.addEventListener('touchmove', function(e) {
	mousePosition.x = e.touches[0].clientX;
	mousePosition.y = e.touches[0].clientY;
	findObject();
	// console.log(mousePosition);
}, false);


window.addEventListener('resize', doMosaic, false);

function doMosaic() {
	var sWidth = window.innerWidth;
	var sHeight = window.innerHeight;
	var mCols = 26;
	var mRows = 14;

	if(sWidth < 600) {
		mCols = 6;
	} else if(sWidth < 1024) {
		mCols = 10;
	}

	if(sHeight < 600) {
		mRows = 10;
	} else if(sHeight < 800) {
		mRows = 10;
	}


	console.log("doMosaic");
	buildMosaic(".main-photo", mCols, mRows);
};

function hideMosaic() {
	console.log("hideMosaic");
	var minTime = 500;
	var maxTime = 2000;

	$(".mosaic-piece").off("mouseenter");
	$(".mosaic-piece").off("mouseleave");
	$(".mosaic-piece").off("click");

	var maxPiece = $(".mosaic-piece").length;
	$(".mosaic-piece").stop( true, true );

	for( var i = 0; i < maxPiece; i++ ){
		var randTime = Math.floor((Math.random() * maxTime) + minTime);
		$("img", ".mosaic-piece:eq("+i+")").fadeOut(randTime);
	}

	 setTimeout(function() {
		$(".mosaic-container").hide();
	}, maxTime);
}

function showMosaic() {
	console.log("showMosaic");
	var minTime = 500;
	var maxTime = 1000;

	$(".mosaic-container").show();

	var maxPiece = $(".mosaic-piece").length;
	$(".mosaic-piece").stop( true, true );

	for( var i = 0; i < maxPiece; i++ ){
		var randTime = Math.floor((Math.random() * maxTime) + minTime);
		$("img", ".mosaic-piece:eq("+i+")").fadeIn(randTime);
	}

	 setTimeout(function() {
		$(".mosaic-piece").on("mouseenter", function() { $("img", this).stop( true, true ).hide(); });
		$(".mosaic-piece").on("mouseleave", function() { $("img", this).fadeIn(2000); });
		$(".mosaic-piece").on("click", hideMosaic);
	}, maxTime);
}
