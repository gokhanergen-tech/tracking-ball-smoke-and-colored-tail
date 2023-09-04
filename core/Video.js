class Video{

    constructor(src,id,canvas){
       this.video=getObjectByID(id);
       this.video.src=src;
  
       this.video.onloadedmetadata=()=>{
        canvas.width=this.video.videoWidth;
        canvas.height=this.video.videoHeight;
        this.video.play()
       }
    }
   
   update(){
    this.isplaying=!!(this.video.currentTime > 0 && !this.video.paused && !this.video.ended && this.video.readyState > 2);
   }

   draw(ctx){
         ctx.save();
         ctx.drawImage(this.video,0,0);
         ctx.restore();
   }


}

