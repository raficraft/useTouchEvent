# Hooks React useTouchEvent 
[Live demo, hosting with Netlify](https://usetouchevent.netlify.app/)

# About

UseTouchEvents est un hooks pour vos composant React. Il permet de récuperer les différentes coordonnées et valeur lorsque l'utilisateur intérargie avec son périphérique aussi bien avec le doigt sur un smartphone ou bien avec la souris pour un pc de bureau.

Axe d'améliorer :

- Detecter des formes dessinés determiner (cercle, carré, triangle...)


# Features

- Detect touch event
- Define X and Y position of the touch event (origin and movement)
- Know the direction of the movement made by the user
- Know the distance traveled
- Know the distance traveled in percent in the element targeted and the screen
- Disabled when two fingers touch the screen
- Mouse compatibility.

# Documentation

This hooks return an object contenant there value.

```javascript

    //Dimension of target element in PX
    size_X: 0,
    size_Y: 0,

    //Dimension of screen in PX
    screen_X: 0,
    screen_Y: 0,
    // Define if the toucheEvent is trigger
    start: false,
    //Coordinate when the touch event beging.
    start_X: 0,
    start_Y: 0,

    //Coordinate of user movement
    move_X: 0,
    move_Y: 0,

    //Distance traveled in the target in pixels
    translate_X: 0,
    translate_Y: 0,

    //Distance traveled in the target in percent
    percent_X: 0,
    percent_Y: 0,

    //Distance traveled in the screnn
    percent_PageX: 0,
    percent_PageY: 0,

    // Direction of movement : left && top || left && bottom || right && top || right && bottom
    direction_X: "Stand by",
    direction_Y: "Stand by",

```

# Utilisation

Import, call the hooks in your component , instantiate a ref and bind dom element to hooks

```javascript

function Component(){
    const refTouch = useRef(null);
    const { onTouch } = useHooks_Touch_event(refTouch);


    //bind dom element to hooks
    <div ref={reTouch}>
        {...}
    </div>
}

```