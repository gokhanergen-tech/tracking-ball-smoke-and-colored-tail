class BallDetector{

   /**
    * 
    * @param {CanvasRenderingContext2D} ctx 
    * @param {number[]} COLOR Example: [255,255,255]
    * @returns 
    */
    findLocs(ctx,COLOR,threshold){
    
      const {height,width}=ctx.canvas;
      const {data}=ctx.getImageData(0,0,width,height);

      const locs=[]
      for(let i=0;i<data.length;i+=4){
        const r=data[i];
        const g=data[i+1];
        const b=data[i+2];
        
        if(this.distance([r,g,b],COLOR)<threshold){
         const x=(i/4)%width;
         const y=Math.floor((i/4)/width);
    
         locs.push({x,y})
        }
      }
 
      return locs;
    }

    /**
     * 
     * @param {number[]} v1 
     * @param {number[]} v2 
     * @returns 
     */
    distance(v1,v2){
        if(v1.length===3&&v2.length===3){
           return Math.sqrt(
            (v1[0]-v2[0])**2+(v1[1]-v2[1])**2+(v1[2]-v2[2])**2
            )
        }
        return 1000;
    }
}