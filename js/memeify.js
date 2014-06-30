function Memeify( config ) {
    this.init(config);

    this.resizeCanvas( this.canvas );    
    
    this.setDefaultMeme();     
    
    this.drawToCanvas();
}

Memeify.prototype.init = function( config ) {    
    if (config == undefined) {
        this.config = {
            baseImgPath: "img/",
            outputPath: "memes/", 
            canvasId: "memeCanvas"
        };
    } else {
        this.config = config;
    }

    this.DEBUG = false;
    this.currentImageURI = null;
    this.canvas = document.getElementById(this.config.canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.img = null;
    this.imgURI = null;
    this.upperText = "";
    this.lowerText = "";
};

Memeify.prototype.setDefaultMeme = function() {
    var testImageURI = this.config.baseImgPath + "GrumpyCat.jpg";
    this.setImage(testImageURI);

    this.setText("Can haz cheezburger?", "NO");
};

Memeify.prototype.setText = function( upperText, lowerText ) {
    this.upperText = upperText;
    this.lowerText = lowerText;    
};

Memeify.prototype.resizeCanvas = function( canvas ) {

    // Scale dynamically to window size if the window is too small
    if ($(window).width() < 640) {
        var currentAspect = canvas.width / canvas.height;
        canvas.width = $(window).width();
        canvas.height = $(window).width() / currentAspect;
    }

    return canvas;
};

Memeify.prototype.setImage = function( imageURI ) {
    if (this.DEBUG) {
        // DEBUG: Turn this on to see artifacts.
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.img = new Image;    
    this.img.src = imageURI;
    this.img.onload = function() {
        this.imgURI = imageURI;
        this.drawToCanvas();
    }.bind(this);
    
};

Memeify.prototype.drawToCanvas = function() {
    if (this.imgURI == null || this.imgURI == undefined) {
        // no image set yet, exit.
        return;
    }

    // match canvas aspect to image aspect        
    var imgAspect = this.img.width / this.img.height;
    this.canvas.height = this.canvas.width / imgAspect;
    this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);

    var upperSize = this.suggestFontSize(this.upperText)
    var lowerSize = this.suggestFontSize(this.lowerText)

    var canvasCenter = this.canvas.width / 2;
    var upperBaseline = upperSize / 16;
    var lowerBaseline = this.canvas.height - (lowerSize + lowerSize / 8);

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "top";

    this.ctx.font = upperSize.toString() + "px Impact";  
    this.fillAndStrokeText(this.upperText, canvasCenter, upperBaseline);

    this.ctx.font = lowerSize.toString() + "px Impact";
    this.fillAndStrokeText(this.lowerText, canvasCenter, lowerBaseline);
};

Memeify.prototype.fillAndStrokeText = function (text, xPos, yPos) {
    this.ctx.fillStyle = "#FFF";
    this.ctx.fillText(text, xPos, yPos);

    this.ctx.fillStyle = "#000";
    this.ctx.lineWidth = 2.5;
    this.ctx.strokeText(text, xPos, yPos);
}

Memeify.prototype.suggestFontSize = function( text ) {
    var minSize = 10;
    var maxSize = this.canvas.height / 4;
    var suggestedSize = minSize;

    var imgPadding = 10;
    
    for (var i = minSize; i <= maxSize; i += 5) {
        this.ctx.font = i.toString() + "px Impact";
        var curWidth = this.ctx.measureText(text).width
        if (curWidth <= this.canvas.width - imgPadding) {
            suggestedSize = i;
        } else {
            break;
        }
    }

    return suggestedSize;
};