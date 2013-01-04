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
});
