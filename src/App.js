import "./App.css";
import "./App.scss";
import useHooks_Touch_event from "./useHooks_Touch_event";
import { useEffect, useRef } from "react";

function App() {
  const refTouch = useRef(null);
  const { onTouch } = useHooks_Touch_event(refTouch);

  useEffect(() => {}, [onTouch.start]);

  return (
    <div className="App">
      <section className="demo">
        <header>
          <h2>Touch is run : {`${onTouch.start}`}</h2>
        </header>

        <div className="touchZone" ref={refTouch}>
          <div>
            <h2>Touch Zone</h2>

            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>X</th>
                  <th>Y</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Screen size</td>
                  <td> {onTouch.screen_X}px </td>
                  <td>{onTouch.screen_Y}px</td>
                </tr>
                <tr>
                  <td>Touch area size</td>
                  <td> {onTouch.size_X}px </td>
                  <td>{onTouch.size_Y}px</td>
                </tr>
                <tr>
                  <td>Starting point</td>
                  <td> {onTouch.start_X}px </td>
                  <td>{onTouch.start_Y}px</td>
                </tr>
                <tr>
                  <td>translation in the touch area in pixel</td>
                  <td> {onTouch.translate_X}px </td>
                  <td>{onTouch.translate_Y}px</td>
                </tr>

                <tr>
                  <td>translation in the touch area in percentage</td>
                  <td> {onTouch.percent_X}%</td>
                  <td>{onTouch.percent_Y}%</td>
                </tr>

                <tr>
                  <td>translation in the screen area in percentage</td>
                  <td> {onTouch.percent_PageX}% </td>
                  <td>{onTouch.percent_PageY}%</td>
                </tr>

                <tr>
                  <td>Coordinate in the page</td>
                  <td> {onTouch.move_X}px </td>
                  <td>{onTouch.move_Y}px</td>
                </tr>

                <tr>
                  <td>Last move</td>
                  <td> {onTouch.direction_X}</td>
                  <td>{onTouch.direction_Y}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
