$(function(){
    // LEFT PANEL
    $("#extruderLeft").buildMbExtruder({
        position: "left",
        width: 300,
        extruderOpacity: 1,

        hidePanelsOnClose: false,
        accordionPanels: false,
        onExtOpen:function(){
            $("#extruderLeft .flap").hide();
        },
        onExtContentLoad:function()
            {$("#extruderLeft").openPanel();
        },
        onExtClose:function(){
            $("#extruderLeft .flap").show();
        }
    });    

    // CLOSE BUTTON
    $(document).on("click", ".close-panel", function(){
        var panelId = $(this).attr("data-id");
        console.log($(this).attr("data-id"));
        $("#" + panelId).closeMbExtruder();
    });

});