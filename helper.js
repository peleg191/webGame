function getRandomInt(max) {
   return Math.floor(Math.random() * max);
}
function getRandomIntGap(min, max) {
   let gap = max - min;
   return min + Math.floor(Math.random() * gap);
}
function getMaxNum(num,secondNum){
   return num>secondNum ? num : secondNum;
}
function detectCollisions(firstArray, secondArray) {
   //detecting collision between enteties in firstArray between secondArray
   let result = [];
   firstArray.forEach(elem => {
      secondArray.forEach(secondElem => {
         let hit = {};
         let horizontalHit = Math.abs(elem.x-secondElem.x) <= getMaxNum(elem.width,secondElem.width) / 2 ;
         let verticalHit = Math.abs(elem.y-secondElem.y) <= getMaxNum(elem.height,secondElem.height) / 2 ;
         if (horizontalHit && verticalHit) {
            hit.object = elem;
            hit.secondObject=secondElem;
            hit.position = {x:elem.x,y:elem.y};
            result.push(hit);
         }
      })
   });
   return result;
}