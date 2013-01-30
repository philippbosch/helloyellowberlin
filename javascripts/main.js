$.fn.sticky = function() {
    var $stickyElements = $();

    $(this).each(function(i, el) {
        var $el = $(el);
        var offsetTop = $el.offset().top;

        $el.data('offsetTop', offsetTop);
        $stickyElements.push($el);
    });

    $(window).bind('scroll', function(e) {
        var scrollTop = $(window).scrollTop();
        $stickyElements.each(function(i, el) {
            var $el = $(el);
            $el.toggleClass('fixed', scrollTop >= $el.data('offsetTop'));
        });
    });
};

$(document).ready(function() {
    $('#nav').onePageNav({
        currentClass: 'current',
        changeHash: true
    });

    $('#nav').sticky();


    $.fn.qa = function() {
        var $elems = $(this),
            $qa = $('#qa'),
            $dls = $('dl', $qa),
            previousQA;

        $dls.each(function() {
            var $dl = $(this);
            $dl.data('height', $dl.outerHeight(true));
        });

        $elems.on('click', function(e) {
            e.preventDefault();

            var $link = $(this),
                href = $link.attr('href').substr($link.attr('href').indexOf('#')),
                $target = $(href);

            if ($qa.is('.open')) {
                $qa.animate({height: 0}, 250, function() {
                    $qa.removeClass('open');
                    $dls.hide();
                    $target.show();
                });
            } else {
                $dls.hide();
                $target.show();
            }

            $elems.closest('li').removeClass('inactive');

            if (href != previousQA) {
                $elems.not($link).closest('li').addClass('inactive');
                $qa.animate({height: $target.data('height') + 'px'}, 250, function() {
                    $qa.addClass('open');
                    previousQA = href;
                    $.scrollTo('#team', 250);
                });
            } else {
                previousQA = null;
            }

        });
    }

    $('a.qa').qa();
});
