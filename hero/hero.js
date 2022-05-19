/* eslint-env browser */
document.addEventListener( "DOMContentLoaded", () => {}
)

const hero = document.getElementById( "hero" )
const villain = document.getElementById( "villain" )
const lightning = document.getElementById( "lightning" )
const body = document.body

// true means hero
let target = true

const buttonSwitchActors = document.querySelector( ".button.switch-actors" )
const buttonReverseLightning = document.querySelector( ".button.reverse-lightning" )
const buttonShoot = document.querySelector( ".button.shoot" )
const buttonShootMissed = document.querySelector( ".button.shoot-missed" )

buttonReverseLightning.addEventListener( "click", () => {
  const lightningReversed = body.classList.toggle( "lightning-reversed" )
  target = !target
} )

buttonSwitchActors.addEventListener( "click", () => {
  const actorsSwitched = body.classList.toggle( "actors-switched" )
} )

/* animation set-up */
const lightningAnimationStart = { "left": "290px" }
const lightningAnimationEnd = { "left": "900px" }

const lightningAnimationOptions = { "duration": 1000 }

buttonShoot.addEventListener( "click", () => {
  if ( buttonShoot.getAttribute( "disabled" ) )
    return
  toggleButtons()
  lightning.animate( [ getLightningPosPx(), tergetPos() ], lightningAnimationOptions ).finished.then( () => hit().then( () => { toggleButtons(); buttonShoot.removeAttribute( "disabled" ) } ) )
} )

buttonShootMissed.addEventListener( "click", () => lightning.animate( [ getLightningPosPx(), tergetPos( true ) ], lightningAnimationOptions ) )

const getLightningPosPx = () => {
  const { left, top } = getComputedStyle( lightning )
  return { left, top }
}
const getLightningPos = () => {
  const { left, top } = getComputedStyle( lightning )
  console.log( { left: parseInt( left ), top: parseInt( top ) } )
  return { left: parseInt( left ), top: parseInt( top ) }
}

const tergetPos = ( miss = false ) => {
  const currentPos = getLightningPos()
  let top = currentPos.top
  let left = currentPos.left
  if ( left < 300 )
    left = miss ? 900 * 1.3 : 900
  else
    left = miss ? 190 : 290
  if ( miss )
    top = ( top - 320 )

  top += "px"
  left += "px"

  return { top, left }
}

const hit = () => {
  return new Promise( ( resolve, reject ) => {
    const t = target ? villain : hero
    let { top, transform } = window.getComputedStyle( t )
    let topNumber = parseInt( top )
    t.animate( { top: topNumber + 25 + "px" }, { duration: 20 } ).finished.then( () =>
      t.animate( { top: topNumber - 50 + "px" }, { duration: 20 } ).finished.then( () =>
        t.animate( { top: topNumber + 50 + "px" }, { duration: 20 } ).finished.then( () =>
          t.animate( { top: topNumber - 50 + "px" }, { duration: 20 } ).finished.then( () =>
            t.animate( { top: topNumber + 50 + "px" }, { duration: 20 } ).finished.then( () =>
              t.animate( { top: topNumber - 50 + "px" }, { duration: 20 } ).finished.then( () =>
                t.animate( { top: topNumber + 50 + "px" }, { duration: 20 } ).finished.then( () =>
                  t.animate( { transform: "rotateZ(1000deg) scale(.3)", opacity: 0 }, { duration: 100, fill: "forwards" } ).finished.then( () =>
                    t.animate( [ { transform: "rotateZ(1000deg) scale(.3)", opacity: 0 }, { opacity: 1 } ], { duration: 200, fill: "forwards", delay: 200 } ).finished.then( () => resolve( 1 ) )
                  ) ) ) ) ) ) ) )
  } )
}

const toggleButtons = () => {
  const buttons = document.querySelectorAll( ".button" )
  for ( const button of buttons ) {
    button.toggleAttribute( "disabled" )
  }
}
