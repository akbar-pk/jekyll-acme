  $(document).ready(function(){
    //Slider Left
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

    //Slider Right
      $(document).on('click', '#rightSliderOpenButton', function(){
        $("#editorRight").css("width", 300);   
        $("#sliderRightContent").delay(300).fadeIn(500);
        $(this).fadeOut();
    });
    $(document).on('click', '#closeRightSlider', function(){
        $("#sliderRightContent").fadeOut(0);
        $("#editorRight").css("width", 0);
        $("#rightSliderOpenButton").fadeIn(400);
    });
   
  });
