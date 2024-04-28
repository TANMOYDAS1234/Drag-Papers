let docTitle = document.title;

window.addEventListener("blur", () => {
    document.title = "Come Back Please 🥺";
})

window.addEventListener("focus", () => {
    document.title = docTitle;
})


let highestZ = 1;

class Paper {
    holdingPaper = false;
    //   mouseTouchX = 0;
    //   mouseTouchY = 0;
    mouseX = 0;
    mouseY = 0;
    prevMouseX = 0;
    prevMouseY = 0;
    velX = 0;
    velY = 0;
    rotation = Math.random() * 50 - 20;
    currentPaperX = 0;
    currentPaperY = 0;
    rotating = false;

    init(paper) {
        // Mouse events
        paper.addEventListener('mousedown', (e) => {

            this.holdingPaper = true;

            paper.style.zIndex = highestZ;
            highestZ += 1;

            if (e.button === 0) {
                //   this.mouseTouchX = this.mouseX;
                //   this.mouseTouchY = this.mouseY;
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;
            }
            // if(e.button === 2) {
            //   this.rotating = true;
            // }
            paper.style.cursor = "grabbing";
        });
        document.addEventListener('mousemove', (e) => {
            if (!this.rotating) {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;

                this.velX = this.mouseX - this.prevMouseX;
                this.velY = this.mouseY - this.prevMouseY;
            }

            const dirX = e.clientX - this.mouseTouchX;
            const dirY = e.clientY - this.mouseTouchY;
            const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
            const dirNormalizedX = dirX / dirLength;
            const dirNormalizedY = dirY / dirLength;

            const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
            let degrees = 180 * angle / Math.PI;
            degrees = (360 + Math.round(degrees)) % 360;
            if (this.rotating) {
                this.rotation = degrees;
            }

            if (this.holdingPaper) {
                if (!this.rotating) {
                    this.currentPaperX += this.velX;
                    this.currentPaperY += this.velY;
                }
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;

                // Extra add on for mobile
                if (this.currentPaperX<0) {
                    this.currentPaperX=0;
                }
                if (this.currentPaperY<0) {
                    this.currentPaperY=0;
                }
                // Extra add on end
                
                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
            }
        })


        window.addEventListener('mouseup', () => {
            this.holdingPaper = false;
            this.rotating = false;
            paper.style.cursor = "grab";
        });




        // Touch events
        paper.addEventListener("touchstart", (e) => {
            // console.log("touchstart performed");

            this.holdingPaper = true;

            paper.style.zIndex = highestZ;
            highestZ += 1;


            //   this.mouseTouchX = this.mouseX;
            //   this.mouseTouchY = this.mouseY;
            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;
        })
        document.addEventListener("touchmove", (e) => {
            // console.log("mtouchmove performed");

            if (e.touches.length == 1) {
                var touch = e.touches[0];
                this.mouseX = touch.clientX;
                this.mouseY = touch.clientY;
            }

            this.velX = Math.floor(this.mouseX - this.prevMouseX);
            this.velY = Math.floor(this.mouseY - this.prevMouseY);
            //   const dirX = e.clientX - this.mouseTouchX;
            //   const dirY = e.clientY - this.mouseTouchY;
            //   const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
            //   const dirNormalizedX = dirX / dirLength;
            //   const dirNormalizedY = dirY / dirLength;

            //   const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
            //   let degrees = 180 * angle / Math.PI;
            //   degrees = (360 + Math.round(degrees)) % 360;
            //   if(this.rotating) {
            // this.rotation = degrees;
            //   }

            if (this.holdingPaper) {
                // if(!this.rotating) {
                this.currentPaperX += this.velX;
                this.currentPaperY += this.velY;
                //   console.log(this.currentPaperX,this.currentPaperY);
                // }
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;

                paper.style.transform = `translateX(${this.currentPaperX+200}px) translateY(${this.currentPaperY}px)`;
            }
        })
        window.addEventListener("touchend", (e) => {
            // console.log("touchend performed");
            this.holdingPaper = false;
            // this.rotating = false;
        })
    }
}

const paper = Array.from(document.querySelectorAll(".paper"));

paper.forEach(paper => {
    const p = new Paper();
    p.init(paper);
})
