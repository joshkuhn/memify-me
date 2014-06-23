function Memeify( config ) {
    
    if (config == undefined) {
        config = {
            baseImgPath: "img/",
            outputPath: "memes/", 
            canvasId: "memeCanvas"
        };
    } 

    this.DEBUG = false;
    this.currentImageURI = null;
    this.canvas = document.getElementById(config.canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.img = null;
    this.imgURI = null;
    this.upperText = "";
    this.lowerText = "";

    this.resizeCanvas( this.canvas );    
    
    var testImageURI = config.baseImgPath + "GrumpyCat.jpg";
    this.setImage(testImageURI);
    this.setText("2AM Coding Session", "Not drunk");     
    
    this.drawToCanvas();
}

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

    this.ctx.font = "60px Arial";
    this.ctx.strokeText(this.upperText, 40, 40);
    this.ctx.strokeText(this.lowerText, 40, this.canvas.height - 100);

};

