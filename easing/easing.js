document.addEventListener( "DOMContentLoaded", () => {

  const car = document.querySelector( "#car" )
  const greenLight = document.querySelector( "#green-light" )
  const redLight = document.querySelector( "#red-light" )

  const interval = window.setInterval( () => {
    console.log( 'interval' )
    if ( car.complete && greenLight.complete && redLight.complete ) {
      window.clearInterval( interval )

      const carWidth = car.offsetWidth
      const carLeftPx = car.offsetLeft + "px"
      const lightLeft = redLight.offsetLeft

      console.log( `carWidth: ${ carWidth }` )
      console.log( `carLeftPx: ${ carLeftPx }` )
      console.log( `lightLeft: ${ lightLeft }` )
      console.log( `left: ${ ( lightLeft - carWidth * .75 ) + "px" }` )

      const carAnimationTo = { left: ( lightLeft - carWidth * .75 ) + "px" }
      const carAnimationOptions = {
        duration: 800,
        easing: "cubic-bezier(0,1.18,.96,.94)",
        // delay: 2000,
        fill: "forwards"
      }
      // const lightAnimationOff =
      greenLight.animate(
        [ { opacity: 1 }, { opacity: 0 } ],
        {
          duration: 1700, fill: "forwards"
        } ).finished.then( () =>
          // const carAnimationStop =
          car.animate( [ { left: carLeftPx }, carAnimationTo ],
            carAnimationOptions ).finished.then( () =>
              // const lightAnimationOn =
              greenLight.animate(
                [ { opacity: 0 }, { opacity: 1 } ],
                {
                  duration: 800, fill: "forwards"
                } ).finished.then( () =>
                  // const carAnimationStart =
                  car.animate(
                    [ carAnimationTo, { left: "100vw" } ],
                    {
                      duration: 1200,
                      easing: "cubic-bezier(1,.37,.96,.94)",
                      fill: "forwards",
                    } ) ) ) )
      // lightAnimationOff.finished.then( carAnimationStop )
      // carAnimationStop.finished.then( lightAnimationOn )
      // lightAnimationOn.finished.then( carAnimationStart )
    }
  }, 500 )

} )
