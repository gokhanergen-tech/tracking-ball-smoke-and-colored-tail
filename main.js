
const canvas=getObjectByID("canvas");


if(canvas.getContext){
    const ctx=canvas.getContext("2d",{
        willReadFrequently:true
    });
    const video=new Video("footage.mp4","video",canvas);
    const ballDetector=new BallDetector();
    const hook=new Hook(HOOKPOS);
    const ball=new Ball(25,hook);
  

    const render=()=>{

        ctx.clearRect(0,0,canvas.height,canvas.width);
   

        video.update();
        video.draw(ctx);

        const locs=ballDetector.findLocs(ctx,COLOR,THRESHOLD);
        ball.drawWithLocs(ctx,locs,video.isplaying);
        
        window.requestAnimationFrame(render);
    }

    render();
}

