// Constructor for TextArea objects
function TextArea() {
    this.t = "Placeholder";
    this.x = 0;
    this.y = 0;
}

// TextArea functions
TextArea.prototype.draw = function (ctx, ratio) {
    ctx.font = 1.6 * ratio + "em serif";
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillText(this.t, this.x * ratio, this.y * ratio);
}

TextArea.prototype.setText = function (text) {
    this.t = text;
}

TextArea.prototype.setPos = function (x, y) {
    this.x = x;
    this.y = y;
}

function iEmoji() {
    this.t = new TextArea();
    this.x = 0;
    this.y = 0;
}

iEmoji.prototype.setImgPos = function(x, y) {
    this.x = x;
    this.y = y;
}

iEmoji.prototype.setImage = function (i) {
    this.i = i;
}

iEmoji.prototype.setTextPos = function (x, y) {
    this.t.setPos(x, y);
}

iEmoji.prototype.setText = function (t) {
    this.t.setText(t);
}

iEmoji.prototype.draw = function(canvas, ctx, ratio) {
    this.clear(canvas, ctx);
    // Draw Image
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.drawImage(this.i, this.x*ratio, this.y*ratio, this.i.naturalWidth*ratio, this.i.naturalHeight*ratio);
    // Draw Text
    this.t.draw(ctx, ratio);
}


iEmoji.prototype.clear = function(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// On page load
$(function () {
    var canvas = $('#myCanvas')[0];
    var context = canvas.getContext('2d');
    var canvasWidth = 0,
        canvasHeight = 0;
    var ratio = 1.0;
    var emoji = new iEmoji();


    var clear = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };
    
    function redraw(ratio) {
        // Adjust canvas size
        canvas.width = canvasWidth * ratio;
        canvas.height = canvasHeight * ratio;
        emoji.draw(canvas, context, ratio);
        var dataURL = canvas.toDataURL();
        $("#final").attr("src", dataURL);
    }
    
    function enable() {
        // Initialize slider and button
        $("#width_slider").val(100);
        $("#width_slider").removeAttr("disabled")
        $("button").removeAttr("disabled");
    }

    // On template image click
    $('.template').click(function () {
        // Initialize ratio and canvas size
        ratio = 1.0;
        canvasWidth = this.naturalWidth;
        canvasHeight = this.naturalHeight + 30;
        enable();
        
        // Initialize image and text position
        var img = $("<img>", {src: $(this).attr("src")})[0];
        emoji.setImage(img);
        emoji.setTextPos(this.naturalWidth / 2, this.naturalHeight);
        
        redraw(1.0);
    });
    // On text input, redraw the whole canvas
    $("#myText").on("input", function () {
        emoji.setText($(this).val());
        redraw(ratio);
    });
    
    // On position select, change img and text positions based on selection
    $("#pos").on("change", function () {
        if ($(this).val() === "top") {
            imgY = 30;
            textY = 0;
        } else if ($(this).val() === "bot") {
            imgY = 0;
            textY = canvasHeight - 30;
        }
        emoji.setImgPos(0, imgY);
        emoji.setTextPos(canvasWidth / 2, textY);
        redraw(ratio);
    });
    
    // On canvas ratio select, resize the image
    $("#width_slider").on("input change", function () {
        ratio = $(this).val() / 100;
        redraw(ratio);
    });
    
    
    /* Image uploader */
    $("#imgUploader").change(function(e) {
        var file = e.target.files[0], imageType = /image.*/;
        if (file==null || !file.type.match(imageType))
            return;
        
        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);
    });
    
    function fileOnload(e) {
        background = $("<img>", {src: e.target.result});
        background.on('load', function() {
            clear();
            canvasWidth = this.naturalWidth;
            canvasHeight = this.naturalHeight + 30;
            console.log(this);
            emoji.setImage(this);
            emoji.setTextPos(this.naturalWidth / 2, this.naturalHeight);
/*
            console.log(canvas);
            console.log(context);
*/
            enable();
            redraw(1.0);
            //$("body").append(this);
        });
    }
});