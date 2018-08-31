var sliderEditor = (function(){

    var sliderEditData = [];

    // Catch DOM
    var $el = $("#sliderEditor");
    var $inputContactEmail = $el.find('input#ContactEmail');
    var $inputFacebookUrl = $el.find('input#FacebookUrl');
    var $sliderEditorSave = $el.find('button#sliderEditorSave');

    //Bind events
    $sliderEditorSave.on('click', saveSliderData);

    function saveSliderData (value) {
        var email = $inputContactEmail.val();
        var facebook = $inputFacebookUrl.val();
        sliderEditData.push({
            email: email,
            facebook: facebook
        });

        console.log(sliderEditData);
    }

    return {
        saveSliderData: saveSliderData
    }
})();

/* Left slider (show/hide) */
$(document).on('click', '#leftSliderOpenButton', function(){
    $("#editor").css("width", 300);   
    $("#sliderContent").delay(300).fadeIn(500);
    $(this).fadeOut();
});
$(document).on('click', '#closeLeftSlider', function(){
    $("#sliderContent").fadeOut(0);
    $("#editor").css("width", 0);
    $("#leftSliderOpenButton").fadeIn(400);
});
