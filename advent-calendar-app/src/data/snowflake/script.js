import p5 from "p5";

export function run(){
    const container = document.getElementById("snowflake");
    if (document.getElementById("snowflakeEmbed")) return;

    const snowflakeEmbed  = document.createElement("div");
    snowflakeEmbed.id = "snowflakeEmbed"    
    container.append(snowflakeEmbed);

    const sketch = (s) => {
        let snowflakeCanvas;
        let unfoldButton, restartButton;
        let drawLines = [];
        let cutLines = [];
        let isUnfolded = false;
        let currentCut = null;
        let flakePoints;
        let windowWidth = 300;

        s.setup = () => {
            s.createCanvas(windowWidth, windowWidth);
            snowflakeCanvas = s.createGraphics(200, 200);    
            flakePoints = [{x:0,y:0, ordinal:0}, {x: s.width/2.3,y:0, ordinal:500}, {x: s.width/2.3-1,y: s.height/4, ordinal:1000}]
            snowflakeCanvas.translate(s.width / 2, s.height / 2);
            unfoldButton = s.createButton('Unfold Snowflake');
            unfoldButton.position(10, 10);
            unfoldButton.mousePressed(unfoldSnowflake);
            restartButton = s.createButton('Reset');
            restartButton.position(10, 30);
            restartButton.mousePressed(resetSnowflake);
            s.background(255);
        }
    
    s.draw = () => {
      s.translate(s.width/2, s.height/2)
      s.strokeWeight (1)
      s.stroke("#ddd5cb")
      s.background("#bc4749");
      if (!isUnfolded) {
        s.stroke("#003e1f")
        drawFoldedSnowflake();
        if (currentCut) {
          //update end position
          currentCut.endX = s.mouseX - s.width/2;
          currentCut.endY = s.mouseY - s.height/2;
          // Draw a temporary line following the mouse
          let { startX, startY, endX, endY } = currentCut;
          s.line(startX, startY, endX, endY);
          
        }
      } else {
        drawUnfoldedSnowflake();
      }
    }
    
    s.mousePressed = () => {
      if (!isUnfolded && s.mouseX > 0 && s.mouseX < s.width && s.mouseY > 0 && s.mouseY < s.height) {
        let startX = s.mouseX - s.width/2;
        let startY = s.mouseY - s.height/2;
        currentCut = { startX, startY, endX: null, endY: null };
      }
    }
    
    s.mouseReleased = () => {
      if (currentCut) {
        //find where cut intersects with shape
        let intersects = []
        for (let i = 0; i < flakePoints.length; i++){
          let flakePoint = flakePoints[i];
          let previousPoint
          if (i == 0){
            previousPoint = flakePoints[flakePoints.length-1]
          } else {
              previousPoint = flakePoints[i-1]
          }
          let intersect = findIntersection(
            previousPoint.x,
            previousPoint.y,
            flakePoint.x,
            flakePoint.y,
            currentCut.startX,
            currentCut.startY,
            currentCut.endX,
            currentCut.endY
          )
          //Check for close start or end points and snap
        //   if(!intersect){
        // 	let snapDistance = 5;
        //     if(shortestDistanceToLine(
        //     {x: currentCut.startX, y: currentCut.startY}, 
        //     {x:previousPoint.x, y:previousPoint.y},
        //     {x:flakePoint.x, y:flakePoint.y}
        //   ) < snapDistance){
        // 		console.log("snap to start")
        //       intersect = findClosestPointOnLineSegment(
        //       {x: currentCut.startX, y: currentCut.startY}, 
        //       {x:previousPoint.x, y:previousPoint.y},
        //       {x:flakePoint.x, y:flakePoint.y}
        //       )
        //       intersect.snap = "start"
        //     }
        //   else if(shortestDistanceToLine(
        //     {x: currentCut.endX, y: currentCut.endY}, 
        //     {x:previousPoint.x, y:previousPoint.y},
        //     {x:flakePoint.x, y:flakePoint.y}
        //   ) < snapDistance){
        //     //console.log("adding intersection")
        // 	console.log("snap to end")
        //       intersect = findClosestPointOnLineSegment(
        //       {x: currentCut.endX, y: currentCut.endY}, 
        //       {x:previousPoint.x, y:previousPoint.y},
        //       {x:flakePoint.x, y:flakePoint.y}
        //       )
        //       intersect.snap = "end"
        //     }
        //   }
          if(intersect){
            if(intersect.x){
            intersect.previous = flakePoint;
            intersect.flakeIndex = i;
            intersect.ordinal = middleOrdinal(previousPoint, flakePoint)
            intersects.push(intersect)
            }
          }
        }
        console.log("found " + intersects.length + " edge intersections")
        //check for intersects with cutlines
        for (let cut of cutLines) {
            let intersect = findIntersection(
            cut.startX,
            cut.startY,
            cut.endX,
            cut.endY,
            currentCut.startX,
            currentCut.startY,
            currentCut.endX,
            currentCut.endY
            )
            if(intersect){
                intersect.flakeIndex = null;
                intersect.cutLine = cut;
                intersects.push(intersect)
            }
        }
        console.log("found " + intersects.length + " edge and cutline intersections")
        let startPoint = {x: currentCut.startX, y: currentCut.startY}
        let endPoint = {x: currentCut.endX, y: currentCut.endY}
        //Check if interior
        // if(intersects.length == 0){
        // 	//check if both points are inside
        // 	startPointInside = isPointInPolygon(startPoint, flakePoints)
        // 	endPointInside = isPointInPolygon(endPoint, flakePoints)
        // 	if(startPointInside && endPointInside){
        // 		insertCut(startPoint, endPoint)
        // 	}
        // }
        //Case for a cut across the edge of the shape
        if(intersects.length == 1){
          if(!intersects[0].snap){
            createCut(intersects[0], startPoint, endPoint)
          } else if (intersects[0].snap == "start"){
            insertCut(intersects[0], endPoint)
          } else if (intersects[0].snap == "end"){
            insertCut(intersects[0], startPoint)
          }
        } else if(intersects.length == 2){
          //Cut the middle section out
          chopSection(intersects)
        } else if (intersects.length >=3){
          //filter out snaps
          //intersects = intersects.filter(intersect => !intersect.snap)
          let sortedIntersects = sortPointsByDistance(startPoint, intersects)
          //console.log(sortedIntersects)
          startPointInside = isPointInPolygon(startPoint, flakePoints)
          endPointInside = isPointInPolygon(endPoint, flakePoints)
          if(startPointInside){
            chopSection([sortedIntersects[1], sortedIntersects[2]])
          } else if (endPointInside){
              chopSection([sortedIntersects[1], sortedIntersects[0]])
          } else {
              chopSection([sortedIntersects[0], sortedIntersects[1]])
          }
        }
        s.push()
        s.fill("red")
        s.strokeWeight(20)
        s.pop()
        currentCut = null;
      }
    }
    
    function middleOrdinal(point1, point2){
        if (point1.ordinal > 0 && point2.ordinal > 0){
            return (point1.ordinal + point2.ordinal)/2;
        //case where one point is just after 0
        } else if (point1.ordinal == 0 && flakePoints.indexOf(point2) == 1 || point2.ordinal == 0 && flakePoints.indexOf(point1) == 1){
            return (point1.ordinal + point2.ordinal)/2;
        } else if (point2.ordinal > 0){
            return point2.ordinal + 500;
        } else if (point1.ordinal > 0){
            return point1.ordinal + 500;
        }
    }
    
    function createCut(intersect, startPoint, endPoint){
        let startPointInside = isPointInPolygon(startPoint, flakePoints)
        let endPointInside = isPointInPolygon(endPoint, flakePoints)
        if(startPointInside && endPointInside){
          console.log("both inside")
          insertCut(startPoint, endPoint)
        } else if(startPointInside) {
          insertCut(intersect, startPoint)
        } else if(endPointInside){
          insertCut(intersect, endPoint)
        } else {
          console.log("no point")
        }
    
    }
    
    function insertCut(intersect, dest){
        console.log("created cut at order " + intersect.ordinal)
        cutLines.push({startX: intersect.x, startY: intersect.y, endX: dest.x, endY: dest.y, ordinal: intersect.ordinal})
        //add single point at intersect
        flakePoints.splice(intersect.flakeIndex, 0, intersect)
        flakePoints.sort((a, b) => (a.ordinal > b.ordinal) ? 1 : -1)
    }
      
    function chopSection(intersects){
      //check if both points have ordinal
      if(intersects[0].ordinal == null || intersects[1].ordinal == null){
        //add points to shape
        let newPoints = [];
        //Check if both points are inside
        if(intersects[0].ordinal == null && intersects[1].ordinal == null){
            //inset cut
            console.log("interior cut")
            return
        } else {
            console.log("exterior cut")
            //Check which point is outside
            let sidePoint, cutPoint;
            if(intersects[0].ordinal == null){
                sidePoint = intersects[1]
                cutPoint = intersects[0]
            } else {
                sidePoint = intersects[0]
                cutPoint = intersects[1]
            }
            let otherLine = cutPoint.cutLine;
            //This is the edge intersect for the other line
            let otherLineStart = {x: otherLine.startX, y: otherLine.startY, ordinal: otherLine.ordinal}
            console.log("other line", otherLine)
            console.log("side point order " + sidePoint.ordinal)
            console.log("other line order " + otherLine.ordinal)
    
            //Check if cut is on the same edge as the other line
            let insideLoop = []
            let outsideLoop = []
            let higherOrdinal = Math.max(sidePoint.ordinal, otherLine.ordinal)
            let lowerOrdinal = Math.min(sidePoint.ordinal, otherLine.ordinal)
            flakePoints.forEach(point => {
                if(point.ordinal > lowerOrdinal && point.ordinal < higherOrdinal){
                    insideLoop.push(point)
                } else if (point.ordinal == lowerOrdinal || point.ordinal == higherOrdinal){
                    return;
                } else {
                    outsideLoop.push(point)
                }
            })
            //check which loop is shorter
            let removeLoop = insideLoop;
            if (insideLoop.length > outsideLoop.length){
                removeLoop = outsideLoop;
            }
            console.log("removing " + removeLoop.length + " points")
            if (removeLoop.length == 0){
                //assign ordinal to cut point
                cutPoint.ordinal = middleOrdinal(sidePoint, otherLineStart);
                console.log("cut point ordinal " + cutPoint.ordinal)
                newPoints = [cutPoint, sidePoint]
            } else {
                //assign ordinal to cut point
                cutPoint.ordinal = removeLoop[0].ordinal
                //Remove points from shortest loop
                flakePoints = flakePoints.filter(point => !removeLoop.includes(point))
                //add points
                newPoints = [cutPoint, sidePoint]
            }
            //add points
            flakePoints = flakePoints.concat(newPoints)
            //remove cut if it matches the cutline of either collision
            intersects.forEach(intersect => {
                if (intersect.cutLine){
                    cutLines = cutLines.filter(cut => cut != intersect.cutLine)
                }
            });
        }
      } else {
        //remove points on shorter side of cut
        console.log("chopping from " + intersects[0].ordinal + " to " + (intersects[1].ordinal))
        flakePoints = removeItemsInShortestPath(flakePoints, intersects[0], intersects[1])
        //add 
      }
          //Sort flakepoints by ordinal
        flakePoints.sort((a, b) => (a.ordinal > b.ordinal) ? 1 : -1)
        //Remove cuts with no point that matches a flakepoint
        cutLines = cutLines.filter(cut => flakePoints.some(point => point.x == cut.startX && point.y == cut.startY))
    }
    
    function drawFoldedSnowflake() {
      s.push();
      s.fill("#f1eeeb");
      s.beginShape()
      for (let i = 0; i < flakePoints.length; i++){
        s.vertex(flakePoints[i].x, flakePoints[i].y)
      }
      s.endShape(s.CLOSE);
      //draw cuts
      for (let cut of cutLines) {
        s.line(cut.startX, cut.startY, cut.endX, cut.endY);
      }
      s.pop();
      for(let i = 0; i < flakePoints.length; i++){
        //write index on point
        // push()
        // fill("black")
        // textSize(15)
        // text(flakePoints[i].ordinal, flakePoints[i].x, flakePoints[i].y)
        // pop()
        }
      s.image(snowflakeCanvas, 0, 0);
    }
    
    function drawUnfoldedSnowflake() {
      for (let i = 0; i < 12; i++) {
        s.push();
        s.rotate(s.PI*i / 6);
        if(i %2 == 1){
            s.scale(-1,1)
            s.rotate(s.PI*5/6);
        }
        drawFoldedSnowflake()
        // cuts.forEach(cut => {
        //   line(cut.startX, cut.startY, cut.endX, cut.endY);
        // });
        s.pop();
      }
    }
    
    function unfoldSnowflake() {
      isUnfolded = true;
    }
    
    s.keyPressed = () => {
      if (key === 'r' || key === 'R') {
        resetSnowflake();
      }
    }
    
    function resetSnowflake() {
      isUnfolded = false;
      //cuts = [];
      snowflakeCanvas.clear();
      flakePoints = [{x:0,y:0, ordinal:0}, {x:width/2.3,y:0, ordinal:500}, {x:width/2.3-1,y:height/4, ordinal:1000}]
      cutLines = []
    }
    
    function calculateSlope(x1, y1, x2, y2) {
        return (y2 - y1) / (x2 - x1);
    }
    
    function calculateYIntercept(x, y, slope) {
        return y - slope * x;
    }
    
    function isBetween(a, b, c) {
        // Check if 'c' is between 'a' and 'b'
        return Math.min(a, b) <= c && c <= Math.max(a, b);
    }
    
    function findIntersection(x1_1, y1_1, x2_1, y2_1, x1_2, y1_2, x2_2, y2_2) {
        // Calculate slopes
        let m1 = calculateSlope(x1_1, y1_1, x2_1, y2_1);
        let m2 = calculateSlope(x1_2, y1_2, x2_2, y2_2);
    
        // Check if lines are parallel
        if (m1 === m2) {
            return null; // No intersection (parallel lines)
        }
    
        // Calculate y-intercepts
        let c1 = calculateYIntercept(x1_1, y1_1, m1);
        let c2 = calculateYIntercept(x1_2, y1_2, m2);
    
        // Calculate intersection point
        let x = (c2 - c1) / (m1 - m2);
        let y = m1 * x + c1;
    
        // Check if the intersection point is within both line segments
        if (isBetween(x1_1, x2_1, x) && isBetween(y1_1, y2_1, y) &&
            isBetween(x1_2, x2_2, x) && isBetween(y1_2, y2_2, y)) {
            return { x, y };
        }
    
        return null; // Intersection point not within the line segments
    }
    
    
    function isPointInPolygon(point, polygon) {
        let x = point.x, y = point.y;
        let inside = false;
    
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            let xi = polygon[i].x, yi = polygon[i].y;
            let xj = polygon[j].x, yj = polygon[j].y;
    
            let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
    
        return inside;
    }
    
    function removeItemsInShortestPath(arr, intersect1, intersect2) {
      let index1 = intersect1.flakeIndex;
      let index2 = intersect2.flakeIndex;
      let point1 = {x: intersect1.x, y:intersect1.y, ordinal: intersect1.ordinal}
      let point2 = {x: intersect2.x, y:intersect2.y, ordinal: intersect2.ordinal}
      let newArr = [];
      console.log("removing from " + index1 + " to " + index2)
        if (index1 === index2) {
          console.log("both indexes the same")
            // If both indexes are the same, nothing to remove
            return arr;
        }
    
        let length = arr.length;
        let forwardDistance = (index2 - index1 + length) % length;
        let backwardDistance = (index1 - index2 + length) % length;
    
        if (forwardDistance < backwardDistance) {
          console.log("forward")
            // If forward path is shorter
            if (index1 < index2) {
              console.log("1 first")
                newArr =  arr.slice(0, index1)
                  .concat(point1, point2)
                  .concat(arr.slice(index2));
            } else {
              console.log("2 first")
                newArr =  arr.slice(index2, index1 + 1)
                  .concat(point2, point1);
            }
        } else {
              console.log("backward")
            // If backward path is shorter
            if (index1 < index2) {
                        console.log("1 first")
                newArr = arr.slice(index1, index2)
                  .concat(point2, point1);
            } else {
                        console.log("2 first")
                newArr = arr.slice(0, index2)
                  .concat(point2, point1)
                  .concat(arr.slice(index1));
            }
        }
        //remove duplicate points
        newArr = newArr.filter((point, index, self) =>
            index === self.findIndex((p) => (
                p.x === point.x && p.y === point.y
            ))
        )
        return newArr;
    }
    
    function calculateDistance(x1, y1, x2, y2) {
        // Calculate the Euclidean distance between two points
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    
    function sortPointsByDistance(referencePoint, points) {
        // Clone the array to avoid mutating the original array
        let sortedPoints = points.slice();
    
        sortedPoints.sort((pointA, pointB) => {
            let distanceA = calculateDistance(referencePoint.x, referencePoint.y, pointA.x, pointA.y);
            let distanceB = calculateDistance(referencePoint.x, referencePoint.y, pointB.x, pointB.y);
            return distanceA - distanceB;
        });
    
        return sortedPoints;
    }
      
      function shortestDistanceToLine(point, lineStart, lineEnd) {
        let x0 = point.x, y0 = point.y;
        let x1 = lineStart.x, y1 = lineStart.y;
        let x2 = lineEnd.x, y2 = lineEnd.y;
    
        let numerator = Math.abs((x2 - x1) * (y1 - y0) - (x1 - x0) * (y2 - y1));
        let denominator = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    
        return numerator / denominator;
    }
    
    function findClosestPointOnLineSegment(point, lineStart, lineEnd) {
        let x0 = point.x, y0 = point.y;
        let x1 = lineStart.x, y1 = lineStart.y;
        let x2 = lineEnd.x, y2 = lineEnd.y;
    
        // Convert the line segment to a vector
        let lineVecX = x2 - x1;
        let lineVecY = y2 - y1;
    
        // Convert the vector from lineStart to the point
        let pointVecX = x0 - x1;
        let pointVecY = y0 - y1;
    
        // Calculate the dot product
        let dot = pointVecX * lineVecX + pointVecY * lineVecY;
    
        // Calculate the length squared of the line segment
        let lenSq = lineVecX * lineVecX + lineVecY * lineVecY;
    
        // Calculate the parameter of the closest point on the line segment
        let param = -1;
        if (lenSq !== 0) { // In case of 0 length line
            param = dot / lenSq;
        }
    
        let closestX, closestY;
    
        if (param < 0) {
            closestX = x1;
            closestY = y1;
        } else if (param > 1) {
            closestX = x2;
            closestY = y2;
        } else {
            closestX = x1 + param * lineVecX;
            closestY = y1 + param * lineVecY;
        }
    
        return { x: closestX, y: closestY };
    }    
    }
    new p5(sketch, container);
}