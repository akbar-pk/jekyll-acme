$(document).ready(function() {

    //gallery
    $(".gallery-component .gallery-carousel:not(.slick-initialized)").slick({
        slidesToScroll: 1,
        infinite: !0,
        centerMode: !0,
        variableWidth: !0,
        adaptiveHeight: false
    });

});