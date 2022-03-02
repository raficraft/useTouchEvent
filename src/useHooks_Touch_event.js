import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

export default function useHooks_Touch_event(ref) {
  const [onTouch, setOnTouch] = useState({
    size_X: 0,
    size_Y: 0,
    screen_X: 0,
    screen_Y: 0,
    start: false,
    start_X: 0,
    start_Y: 0,
    move_X: 0,
    move_Y: 0,
    translate_X: 0,
    translate_Y: 0,
    percent_X: 0,
    percent_Y: 0,
    percent_PageX: 0,
    percent_PageY: 0,
    direction_X: "Stand by",
    direction_Y: "Stand by",
  });

  /////////////////////////////////////
  /////////////////////////////////////

  // HELPERS FUNCTION

  /////////////////////////////////////
  /////////////////////////////////////

  function debounce(callback, delay) {
    var timer;
    return function () {
      var args = arguments;
      var context = this;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, delay);
    };
  }

  const getPointer = (e) => {
    return e.touches && e.touches.length === 1 ? e.touches[0] : e;
  };

  const getTranslate = (p1, p2) => {
    console.log(p1, p2);
    return p1 - p2;
  };

  const getTranslateByPercent = (translate, size) => {
    return (translate / size) * 100;
  };

  const getDirection = (p1, p2, axis) => {
    if (axis === "X") {
      return p1 - p2 < 0 ? "right" : "left";
    }

    if (axis === "Y") {
      return p1 - p2 < 0 ? "down" : "up";
    }

    return "stand by";
  };

  /////////////////////////////////////
  /////////////////////////////////////

  // HANDLE FUNCTION

  /////////////////////////////////////
  /////////////////////////////////////

  const handleStart = (e) => {
    e.preventDefault();
    e = getPointer(e);

    console.log("start", e);
    setOnTouch((S) => ({
      ...S,
      start: true,
      start_X: e.clientX.toFixed(2),
      start_Y: e.clientY.toFixed(2),
      move_X: 0,
      move_Y: 0,
      translate_X: 0,
      translate_Y: 0,
      percent_X: 0,
      percent_Y: 0,
      percent_PageX: 0,
      percent_PageY: 0,
    }));
  };

  const handleEnd = (event) => {
    console.log("end");

    setOnTouch((S) => ({
      ...S,
      start: false,
      direction_X: "Stand by",
      direction_Y: "Stand by",
    }));
  };

  const handleResize = () => {
    const element = ref.current;
    setOnTouch((S) => ({
      ...S,
      size_X: element.offsetWidth,
      size_Y: element.offsetHeight,
      screen_X: window.outerWidth,
      screen_Y: window.outerWidth,
    }));
  };

  const handleMove = (e) => {
    if (onTouch.start) {
      e = getPointer(e);
      console.log("move", e);

      setOnTouch((S) => ({
        ...S,
        move_X: e.clientX.toFixed(2),
        move_Y: e.clientY.toFixed(2),
        translate_X: getTranslate(onTouch.start_X, e.clientX).toFixed(0),
        translate_Y: getTranslate(onTouch.start_Y, e.clientY).toFixed(0),
        percent_X: Math.abs(
          getTranslateByPercent(
            getTranslate(onTouch.start_X, e.clientX),
            onTouch.size_X
          ).toFixed(2)
        ),
        percent_Y: Math.abs(
          getTranslateByPercent(
            getTranslate(onTouch.start_Y, e.clientY),
            onTouch.size_Y
          ).toFixed(2)
        ),
        percent_PageX: Math.abs(
          getTranslateByPercent(
            getTranslate(onTouch.start_X, e.clientX),
            onTouch.screen_X
          ).toFixed(2)
        ),
        percent_PageY: Math.abs(
          getTranslateByPercent(
            getTranslate(onTouch.start_Y, e.clientY),
            onTouch.screen_Y
          ).toFixed(2)
        ),
        direction_X: getDirection(onTouch.start_X, e.clientX, "X"),
        direction_Y: getDirection(onTouch.start_Y, e.clientY, "Y"),
      }));
    }
  };

  /////////////////////////////////////
  /////////////////////////////////////

  // GET SIZE BEFORE PRE-RENDERING

  /////////////////////////////////////
  /////////////////////////////////////

  useLayoutEffect(() => {
    const element = ref.current;

    setOnTouch((S) => ({
      ...S,
      size_X: element.offsetWidth,
      size_Y: element.offsetHeight,

      screen_X: window.outerWidth,
      screen_Y: window.outerHeight,
    }));
  }, []);

  /////////////////////////////////////
  /////////////////////////////////////

  // ADD EVENT LISTENER
  // REMOVE EVENT LISTENER

  /////////////////////////////////////
  /////////////////////////////////////

  useEffect(() => {
    const element = ref.current;
    console.log("run hooks", window);

    element.addEventListener("mousedown", handleStart, true);
    window.addEventListener("mouseup", handleEnd, true);
    window.addEventListener("mousemove", handleMove, true);

    element.addEventListener("touchstart", handleStart, true);
    window.addEventListener("touchend", handleEnd, true);
    window.addEventListener("touchmove", handleMove, true);

    window.addEventListener("resize", handleResize, true);

    return () => {
      element.removeEventListener("mousedown", handleStart, true);
      window.removeEventListener("mouseup", handleEnd, true);
      window.removeEventListener("mousemove", handleMove, true);

      element.removeEventListener("touchstart", handleStart, true);
      window.removeEventListener("touchend", handleEnd, true);
      window.removeEventListener("touchmove", handleMove, true);

      window.removeEventListener("resize", handleResize, true);
    };
  }, [handleStart, handleEnd, handleMove, handleResize]);

  return { onTouch };
}
