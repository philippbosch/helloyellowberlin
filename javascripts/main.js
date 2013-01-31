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
    // NAVIGATION
    $('#nav').onePageNav({
        currentClass: 'current',
        changeHash: true
    });

    $('#nav').sticky();

    setTimeout(function() {
        if (location.hash.length && $(location.hash).length) {
            $.scrollTo(location.hash, 750);
        }
    },100);


    // Q&A
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


    // MAP
    $(window).on('load', function() {
        var mapOptions = {
            center: new google.maps.LatLng(52.493364,13.442381),
            zoom: 15,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            styles: [
              {
                "stylers": [
                  { "gamma": 0.20 },
                  { "hue": "#000000" },
                  { "saturation": -100 },
                  { "lightness": -58 }
                ]
              },{
                "featureType": "poi.business",
                "stylers": [
                  { "visibility": "off" }
                ]
              },{
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                  { "color": "#ffffff" },
                  { "lightness": -21 }
                ]
              },{
                "featureType": "poi.park",
                "stylers": [
                  { "visibility": "on" },
                  { "lightness": 14 }
                ]
              },{
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                  { "visibility": "on" },
                  { "color": "#ffffff" },
                  { "lightness": -21 }
                ]
              },{
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [
                  { "hue": "#6eff00" },
                  { "lightness": 40 },
                  { "visibility": "off" }
                ]
              }
            ]
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var studioLatLng = new google.maps.LatLng(52.493264,13.447681);
        var studioMarker = new google.maps.Marker({
            position: studioLatLng,
            map: map,
            title: "hello yellow studio berlin",
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 5,
                strokeColor: '#ffed00',
                fillColor: '#ffed00',
                fillOpacity: 1.0
            }
        })
    });


    // GALLERY
    $('.fancybox').fancybox({
        "loop": false
    });

});
