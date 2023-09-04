
/**
 * 
 * @param {string} id 
 * @returns 
 */
function getObjectByID(id){
  return document.getElementById(id)
}

/**
 * 
 * @returns void
 */
function generateColor(){
  return `rgb(${generateNumber(0,255)},${generateNumber(0,255)},${generateNumber(0,255)})`
}

/**
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns 
 */
function generateNumber(min,max){
  if(max<min){
    throw new Error("Max number is greater than mi number or equal with it ")
  }
  return Math.round(min+Math.random()*(max-min))
}
