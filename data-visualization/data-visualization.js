// for more info see https://www.khanacademy.org/math/cc-seventh-grade-math/cc-7th-geometry/cc-7th-area-circ-challenge/v/radius-change-impact

const delay = 5000; //number of milliseconds to wait before updating the explanation text
const vizContainer = document.querySelector("#vizContainer");
const explanationContainer = document.querySelector("#explanationContainer");
const explanationText = document.querySelector("#explanationText");
const explanationAmount = document.querySelector("#explanationAmount");
const dataset = [{"title":"live within 50mi of a nuclear plant for a year", "measurement": 0.09, "multiplier": 2180, "color": "#80ffff"}, //cyan
               {"title":"eat a single banana", "measurement": 0.1, "multiplier": 1965, "color": "#8095ff"}, //blue
               {"title":"receive a dental x-ray", "measurement": 5, "multiplier": 39, "color": "#d480ff"}, //purple
               {"title":"be on one airline flight from NY to LA", "measurement": 40, "multiplier": 4.9, "color": "#ff80bf"}, //pink
               {"title":"sleep directly ontop of a nuclear plant for a year", "measurement": 250, "multiplier": 0.78,"color": "#ffaa80"}, //orange
               {"title":"receive a single mamogram", "measurement": 400, "multiplier": 0.49, "color": "#eaff80"}, //yellow
               {"title":"receive a single chest CT scan", "measurement": 7000, "multiplier": 0.028, "color": "#80ff80"} //green
            ];
const defaultMultiplier = dataset[3].multiplier; // keeps a reference to the multiplier value of the third entry
let circles = []

dataset.forEach( ( dataLine, index ) => {
  let newCircle = document.createElement( "div" )
  let width = dataLine.measurement * defaultMultiplier
  newCircle.style.width = width + "vw"
  newCircle.style.height = width + "vw"
  newCircle.style.borderRadius = "50%"
  newCircle.style.backgroundColor = dataLine.color
  newCircle.style.zIndex = dataset.length - index
  newCircle.style.position = "absolute"
  newCircle.style.top = (width * -.5 ) + "vw"
  newCircle.style.left = ( width * -.5 ) + "vw"
  circles.push( newCircle )

  vizContainer.append( newCircle )

  const updateText = () => {
    explanationText.textContent = dataset[ index ].title
    explanationContainer.style.backgroundColor = dataset[ index ].color
    explanationAmount.textContent = ` (${dataset[ index ].measurement} micro-sieverts)`
  }

  window.setTimeout( updateText, index * delay )
} )

for ( let i = 0; i < ( dataset.length - 1 ); i++ ) {
  let multiplierFrom = dataset[i].multiplier
  let multiplierTo =dataset[i + 1].multiplier

  circles.forEach( ( circle, circleId ) => {
    let circleMeasurement = dataset[ circleId ].measurement

    let startWidth = ( circleMeasurement * multiplierFrom ) + "vw"
    let targetWidth = ( circleMeasurement * multiplierTo ) + "vw"

    let startHeight = startWidth
    let targetHeight = targetWidth

    let startTop = ( circleMeasurement * multiplierFrom * -.5 ) + "vw"
    let targetTop = ( circleMeasurement * multiplierTo * -.5 ) + "vw"

    let startLeft = startTop
    let targetLeft = targetTop

    let keyframeFrom = {width: startWidth, height: startHeight, left: startLeft, top: startTop}
    let keyframeTo = {width: targetWidth, height: targetHeight, left: targetLeft, top: targetTop}
    let animateOptions = { duration: 5000, fill: "forwards", delay: ( i * delay ) }

    circle.animate([keyframeFrom,keyframeTo],animateOptions)
  } )

}
