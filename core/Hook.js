class Hook{

    #hookAlphaDecrease=1;
    #startTime=null;
    #endTime=null;
    #T=0;
    #isRight=null;

    constructor(pos){
      this.hookPos=pos;
    }

    draw(ctx,centerBall,beforeBallPos,isPlaying){
        if(isPlaying){
            if(!this.#startTime&&Math.abs(beforeBallPos?.x-centerBall?.x)<5){
                this.#startTime=Date.now();
            }
    
            if(centerBall.x-this.hookPos.x>=-100){
                if(!this.#isRight)
                  this.#startTime=null;
                this.#isRight=true;
                if(centerBall.x<=this.hookPos.x&&!this.#endTime&&this.#startTime){
              
                    this.#endTime=Date.now();
                    this.#T=(((this.#endTime-this.#startTime)/1000)*4).toFixed(2)<0.3?this.#T:(((this.#endTime-this.#startTime)/1000)*4).toFixed(2)
                    this.#endTime=null;
                    this.#startTime=null;
                }
            }else{
                if(this.#isRight){
                    this.#startTime=null;
                }
                this.#isRight=false;
            }
        }
      
        
        
       

        ctx.save();
        ctx.font = "12px serif";
        ctx.fillText("Hook length: "+((((9.8*this.#T**2)/(4*((Math.PI)**2))))*100).toFixed(2)+"cm"+" T="+this.#T+" g="+9.8, 10, 25);
        ctx.beginPath();
        /*var linearHook = ctx.createLinearGradient(0,0, 0, ctx.canvas.height);
        linearHook.addColorStop(0,"rgb(253,207,88)");
        linearHook.addColorStop(0.2, "rgb(117,118,118)");
        linearHook.addColorStop(0.4,"rgb(242,125,12)");
        linearHook.addColorStop(0.6, "yellow");
        linearHook.addColorStop(0.8,"lightgray");
    
        ctx.strokeStyle=linearHook;
        ctx.globalAlpha=0.8;
        ctx.moveTo(this.hookPos.x,this.hookPos.y);
        ctx.lineTo(centerBall.x,centerBall.y);
        ctx.stroke();
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        if(this.#hookAlphaDecrease===100){
          this.#hookAlphaDecrease=1;
        }else{
          ctx.strokeStyle=linearHook;
          ctx.lineWidth=this.#hookAlphaDecrease;
          ctx.globalAlpha=1/this.#hookAlphaDecrease;
          this.#hookAlphaDecrease+=1;
        }
     
      
        ctx.moveTo(this.hookPos.x,this.hookPos.y);
        ctx.lineTo(centerBall.x,centerBall.y);
        ctx.stroke();
        ctx.restore();*/
    }

}