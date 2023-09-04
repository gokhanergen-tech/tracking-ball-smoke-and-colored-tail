class Ball{
    #queue=[];
    #maxQueueSize=10;
    #changeColorAfterThisFrameCount=120;
    #frame=0;
    #colors=[]
    #drops=[]
    #ballSize;
    #sizeAnimation=0;
    #sizeAnimationMaxToggle=-1;
    #toggleFrameWhenItIsMax=true


    #hook=null;

    constructor(ballSize=25,hook){
      for(let i=0;i<this.#maxQueueSize;i++)
        this.#colors.push(generateColor())
      this.#ballSize=ballSize;
      this.#hook=hook;
    }

    drawDrops(ctx){
      this.#drops.forEach(drop=>{
        ctx.save();
        var linear = ctx.createLinearGradient(0,drop.y-this.#ballSize, 0, drop.y+this.#ballSize);
        linear.addColorStop(0, "black");
        linear.addColorStop(0.8, "gray");
         ctx.globalAlpha=(500-drop.times)/(15000);
         drop.increaseY=drop.times%100===0?(Math.random()<0.5?-1:1):drop.increaseY||0
         drop.y+=drop.increaseY;
         drop.increaseX=drop.times%100===0?(Math.random()<0.5?-1:1):drop.increaseX||0
         drop.x+=drop.increaseX;
         drop.times++;

         ctx.fillStyle=linear;
         ctx.beginPath();
         ctx.arc(drop.x,drop.y,this.#ballSize+drop.times/5,0,Math.PI*2);
         ctx.fill();
         ctx.restore();
     });
    }
  

    drawWithLocs(ctx,locs,isPlaying){
       const locsForBall=locs||[];
       ctx.save(); 
       if(locs.length>0){
        const centerPos=this.getCenter(locsForBall);
        this.#hook.draw(ctx,centerPos,this.#queue[this.#queue.length-1],isPlaying)

        if(this.#maxQueueSize!==this.#queue.length){
            this.#queue.unshift(centerPos);
        }else{
          this.#drops.push({
            ...this.#queue.pop(),
            times:0
          });
          this.#queue.unshift(centerPos);
          
         this.drawDrops(ctx)
      
         if(this.#frame%30===0)
           this.#sizeAnimationMaxToggle=this.#sizeAnimationMaxToggle===1?-1:1;
       
         this.#sizeAnimation+=this.#sizeAnimationMaxToggle;

         this.#drops=this.#drops.filter(drop=>drop.times<500);

          [...this.#queue].reverse().forEach((center,index)=>{

            ctx.save();
            if(index===this.#maxQueueSize-1){
             ctx.globalAlpha=1;
            }else{
                ctx.globalAlpha=((index)/(this.#maxQueueSize*3)).toFixed(2);
            }
             

            var linear = ctx.createLinearGradient(0,center.y-this.#ballSize, 0, center.y+this.#ballSize);
           
            if(this.#frame===this.#changeColorAfterThisFrameCount){
                this.#colors[index]=generateColor();
            }
            
            if(index===this.#maxQueueSize-1){
              if(this.#toggleFrameWhenItIsMax){
                linear.addColorStop(0, `rgb(49, 166, ${247-this.#frame})`);
                linear.addColorStop(0.6, `rgb(27, 89, ${133+this.#frame})`);
              }else{
                linear.addColorStop(0, `rgb(49, 166, ${(247-this.#changeColorAfterThisFrameCount)+this.#frame})`);
                linear.addColorStop(0.6, `rgb(27, 89, ${(133+this.#changeColorAfterThisFrameCount)-this.#frame})`);
              }
             
            }else{
                linear.addColorStop(0,this.#colors[index]);
                linear.addColorStop(0.6, this.#colors[index]);
            }
         
           
             ctx.fillStyle=linear;
             ctx.beginPath();
            
             if(index===this.#maxQueueSize-1)
               ctx.arc(center.x,center.y,this.#ballSize+this.#sizeAnimation/5,0,Math.PI*2);

             ctx.arc(center.x,center.y,this.#ballSize,0,Math.PI*2);
             ctx.fill();
             ctx.restore();
             
          })
          if(this.#frame>this.#changeColorAfterThisFrameCount){
            this.#colors[9]=generateColor()
            this.#colors[8]=generateColor()
            this.#colors[7]=generateColor()
            this.#frame=0;
            this.#toggleFrameWhenItIsMax=!this.#toggleFrameWhenItIsMax
          }else{
            this.#frame++;
          }
        }
        ctx.restore();
       }
      
    }
    

    getCenter(locs){
        let sumOfX=0;
        let sumOfY=0;
        for(let loc of locs){
            sumOfX+=loc.x;
            sumOfY+=loc.y;
        }

        return {
            x:Math.round(sumOfX/locs.length),
            y:Math.round(sumOfY/locs.length)
        }
    }
}