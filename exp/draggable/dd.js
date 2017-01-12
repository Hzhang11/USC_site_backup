$(function () {
    
    var clicking = false;
    var x, y;

    var mousePos = {
        x: -1,
        y: -1
    };
    $("div.dd_item").css({
        'color': 'white',
        'width': '80px',
        'height': '50px',
        'background': 'gray',
        'display': 'inline-block'
    });

    $("div.dd_item").mousedown(function (event) {
        $(this).attr("moving", "true");
        x = $(this).offset().left;
        y = $(this).offset().top;
        mousePos.x = event.pageX;
        mousePos.y = event.pageY;
    });

    $("div.dd_item").mousemove(function (event) {
        if ($(this).attr("moving") == "true") {
            var dX = event.pageX - mousePos.x;
            var dY = event.pageY - mousePos.y;
            
            var xPos = x + dX < 0 ? 0 : x + dX;
            var yPos = y + dY < 0 ? 0 : y + dY;

            $(this).css({
                'cursor': 'none',
                'position': 'absolute',
                'left': xPos,
                'top': yPos,
                'z-index': 1
            });
        }
    })


    $(document).mouseup(function () {
        $("div.dd_item").attr("moving", "false");
        $("div.dd_item").css({
            'cursor': 'default',
            'z-index': 0
        })
    })
});