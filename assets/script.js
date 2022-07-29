/*
 * Plugin intialization
 */
$('#pagepiling').pagepiling({
    verticalCentered: false,
    css3: false,
    sectionsColor: ['white', 'white', 'white', '#000'],
    onLeave: function (index, nextIndex, direction) {

        //fading out the txt of the leaving section
        $('.section').eq(index - 1).find('h1, p').fadeOut(1000, 'easeInQuart');

        //fading in the text of the destination (in case it was fadedOut)
        $('.section').eq(nextIndex - 1).find('h1, p').fadeIn(1000, 'easeInQuart');


        //reaching our last section? The one with our normal site?
        if (nextIndex == 4) {
            $('#arrow').hide();

            //fading out navigation bullets
            $('#pp-nav').fadeOut();

            $('#section4').find('.content').animate({
                top: '0%'
            }, 1000, 'easeInQuart');
        }

        //leaving our last section? The one with our normal site?
        if (index == 4) {
            $('#arrow').show();

            //fadding in navigation bullets
            $('#pp-nav').fadeIn();

            $('#section4 .content').animate({
                top: '100%'
            }, 1000, 'easeInQuart');
        }
    },
});

$('#arrow').click(function () {
    $.fn.pagepiling.moveSectionDown();
});