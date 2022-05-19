document.addEventListener( "DOMContentLoaded", () => {
  let counter = 0

  const modal = document.querySelector( ".modal" )
  const modalSuccess = document.querySelector( ".modal-image--success" )
  const modalFail = document.querySelector( ".modal-image--fail" )

  modal.classList.add( "hidden" )
  modalSuccess.classList.add( "hidden" )
  modalFail.classList.add( "hidden" )

  modal.addEventListener( "click", e => {
    e.currentTarget.classList.add( "hidden" )
    window.location.reload()
  } )

  const checkCounter = () => {
    if ( n == 0 ) {
      if ( counter === 3 ) {
        console.log( "win" )
        modalSuccess.classList.remove( "hidden" )
      }
      if ( counter === -3 ) {
        console.log( "lose" )
        modalFail.classList.remove( "hidden" )
      }
      else if ( counter < 3 ) {
        console.log( "do better" )
        modalFail.classList.remove( "hidden" )
      }
      modal.classList.remove( "hidden" )
    }
  }

  const balloons = document.querySelectorAll( ".balloon" )
  let n = balloons.length
  const balloonSpeeds = [ 6000, 10000, 8000 ]
  balloons.forEach( ( balloon, balloonIndex ) => {
    const { top: balloonTop } = window.getComputedStyle( balloon )

    balloon.animation = balloon.animate(
      [
        { top: balloonTop },
        { top: "25px" }
      ],
      {
        duration: balloonSpeeds[ balloonIndex ],
        delay: 100,
        fill: "forwards"
      } )

    balloon.animation.onfinish = () => {
      balloon.animate(
        { opacity: 0 },
        {
          duration: 20,
          easing: "cubic-bezier(.67,1.05,0,.98)",
          fill: "forwards"
        } )
      counter--
      n--
      checkCounter()
    }

    balloon.addEventListener( "click", e => {
      e.currentTarget.animation.pause()
      // e.currentTarget.animate(
      //   { opacity: 0 },
      //   {
      //     duration: 20,
      //     easing: "cubic-bezier(.67,1.05,0,.98)",
      //     fill: "forwards"
      //   } )
      counter++
      n--
      checkCounter()
    } )

  } )

} )
