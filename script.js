let docTitle = document.title;

window.addEventListener("blur", () => {
    document.title = "Come Back Please 🥺";
})

window.addEventListener("focus", () => {
    document.title = docTitle;
})


let highestZ = 1;
const sound = new Audio;

class Paper {
    songs = ["Tum mere 2.mp3","Tum Hi Ho.mp3", "Tera Ban Jaunga.mp3", "Tum Se Hi.mp3", "Janam Janam.mp3", "Muskurane Ki Wajah Tum Ho.mp3"]
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
        shuffle(this.songs);
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
            paper.querySelector("img").style.transform = "scale(1.1)";
            paper.querySelector("img").style.transition = "all 2s ease-in-out";

            // if (document.body.lastElementChild != paper) {
                sound.src=this.songs[Math.ceil (Math.random() * (this.songs.length-1))];
                // let random = Math.ceil(Math.random() * 100);
                // if (random <= 16 && random >= 0) {
                //     sound.src = this.songs[0];
                // }
                // else if (random <= 56 && random > 32) {
                //     sound.src = this.songs[1];
                // }
                // else if (random <= 60 && random > 56) {
                //     sound.src = this.songs[2];
                // }
                // else if (random <= 88 && random > 72) {
                //     sound.src = this.songs[3];
                // }
                // else if (random <= 94 && random > 88) {
                //     sound.src = this.songs[4];
                // }
                // else if (random <= 100 && random > 94) {
                //     sound.src = this.songs[5];
                // }

                document.body.lastElementChild.innerText = "Drag the paper to move 😁";
                document.body.lastElementChild.style.fontSize = "2rem";
                document.body.lastElementChild.style.fontFamily = 'Zeyada';
                document.body.lastElementChild.style.textAlign = "center";
                document.body.lastElementChild.style.padding = "10px";
            // }

            // if (document.body.firstElementChild == paper) {
            //     sound.src = "heartbeatSound.mp3"
            //     sound.playbackRate = 1.0;
            //     sound.loop = true;
            //     sound.volume=1.0;
            // }

            // if (document.body.lastElementChild == paper) {
            //     document.body.lastElementChild.innerText = "Drag the paper to move 😁";
            //     document.body.lastElementChild.style.fontSize = "2rem";
            //     document.body.lastElementChild.style.fontFamily = 'Zeyada';
            //     document.body.lastElementChild.style.textAlign = "center";
            //     document.body.lastElementChild.style.padding = "10px";
                
            // }
            sound.play();
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

                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;

                // if (document.body.firstElementChild == paper) {
                //     sound.src = "heartbeatSound.mp3"
                //     sound.playbackRate = 2.0;
                //     sound.loop = true;
                //     sound.volume=1.0;
                // }

                if (document.body.lastElementChild == paper) {
                    document.body.lastElementChild.innerText = "Drag the paper to move 😄";
                    document.body.lastElementChild.style.fontSize = "2rem";
                    document.body.lastElementChild.style.fontFamily = 'Zeyada';
                    document.body.lastElementChild.style.textAlign = "center";
                    document.body.lastElementChild.style.padding = "10px";
                }
                // sound.play();
            }
        })


        window.addEventListener('mouseup', () => {
            this.holdingPaper = false;
            this.rotating = false;
            paper.style.cursor = "grab";
            paper.querySelector("img").style.transform = "scale(1)";

            // if (document.body.firstElementChild == paper) {
            //     sound.src = "heartbeatSound.mp3";
            //     sound.loop = false;
            //     sound.volume=0.1;
            // }

            // if (document.body.lastElementChild == paper) {
            //     document.body.lastElementChild.innerHTML = "Drag the paper to move 😊";
            //     document.body.lastElementChild.style.fontSize = "2rem";
            //     document.body.lastElementChild.style.fontFamily = 'Zeyada';
            //     document.body.lastElementChild.style.textAlign = "center";
            //     document.body.lastElementChild.style.padding = "10px";
            // }
            // sound.pause();
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

            paper.querySelector("img").style.transform = "scale(1.1)";
            paper.querySelector("img").style.transition = "all 2s ease-in-out";

            // if (document.body.lastElementChild != paper) {
                
                sound.src=this.songs[Math.ceil (Math.random() * (this.songs.length-1))];
                // let random = Math.ceil(Math.random() * 100);
                // if (random <= 16 && random >= 0) {
                //     sound.src = this.songs[0];
                // }
                // else if (random <= 56 && random > 32) {
                //     sound.src = this.songs[1];
                // }
                // else if (random <= 60 && random > 56) {
                //     sound.src = this.songs[2];
                // }
                // else if (random <= 88 && random > 72) {
                //     sound.src = this.songs[3];
                // }
                // else if (random <= 94 && random > 88) {
                //     sound.src = this.songs[4];
                // }
                // else if (random <= 100 && random > 94) {
                //     sound.src = this.songs[5];
                // }

                document.body.lastElementChild.innerText = "Drag the paper to move 😁";
                document.body.lastElementChild.style.fontSize = "2rem";
                document.body.lastElementChild.style.fontFamily = 'Zeyada';
                document.body.lastElementChild.style.textAlign = "center";
                document.body.lastElementChild.style.padding = "10px";
            // }

            // if (document.body.firstElementChild == paper) {
            //     sound.src = "heartbeatSound.mp3"
            //     sound.loop = true;
            //     sound.playbackRate = 1.0;
            //     sound.volume=1.0;
            // }

            // if (document.body.lastElementChild == paper) {
            //     document.body.lastElementChild.innerText = "Drag the paper to move 😁";
            //     document.body.lastElementChild.style.fontSize = "2rem";
            //     document.body.lastElementChild.style.fontFamily = 'Zeyada';
            //     document.body.lastElementChild.style.textAlign = "center";
            //     document.body.lastElementChild.style.padding = "10px";
            // }
            sound.play();
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
                if (this.currentPaperX <= 0) {
                    this.currentPaperX = 0 + 5;
                }
                if (this.currentPaperY <= 0) {
                    this.currentPaperY = 0 + 5;
                }else if(this.currentPaperY >= 400){
                    // this.currentPaperY -= 500;
                    this.currentPaperY -= 50;
                }
                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;

                // if (document.body.firstElementChild == paper) {
                //     sound.src = "heartbeatSound.mp3"
                //     sound.loop = true;
                //     sound.playbackRate = 2.0;
                //     sound.volume=1.0;
                // }

                if (document.body.lastElementChild == paper) {
                    document.body.lastElementChild.innerText = "Drag the paper to move 😄";
                    document.body.lastElementChild.style.fontSize = "2rem";
                    document.body.lastElementChild.style.fontFamily = 'Zeyada';
                    document.body.lastElementChild.style.textAlign = "center";
                    document.body.lastElementChild.style.padding = "10px";
                }
                // sound.play();
            }
        })
        window.addEventListener("touchend", (e) => {
            // console.log("touchend performed");
            this.holdingPaper = false;
            // this.rotating = false;

            paper.querySelector("img").style.transform = "scale(1)";
            paper.querySelector("img").style.transition = "normal";

            // if (document.body.firstElementChild == paper) {
            //     sound.src = "heartbeatSound.mp3";
            //     sound.loop = false;
            //     sound.volume=0.1;
            // }

            // if (document.body.lastElementChild == paper) {
            //     document.body.lastElementChild.innerHTML = "Drag the paper to move 😊";
            //     document.body.lastElementChild.style.fontSize = "2rem";
            //     document.body.lastElementChild.style.fontFamily = 'Zeyada';
            //     document.body.lastElementChild.style.textAlign = "center";
            //     document.body.lastElementChild.style.padding = "10px";
            // }
            // sound.pause();
        })
    }
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

const paper = Array.from(document.querySelectorAll(".paper"));

paper.forEach(paper => {
    const p = new Paper();
    p.init(paper);
})
