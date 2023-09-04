import "./styles.css";
import "@tldraw/tldraw/tldraw.css";
import { Tldraw } from "@tldraw/tldraw";
import { useYjsStore } from "./useYjsStore";
import { UserPresence } from "./UserPresence";

import Timer from "./Timer";
import "./Timer.css";
import Ratings from "./Ratings";

export default function App() {
  const store = useYjsStore({
    roomId: "MENTKNOW",
  });

  return (
    <>
      <div className="tldraw__editor">
        <Tldraw store={store} autoFocus shareZone={<UserPresence />} />
      </div>
      {/* <div className="Ratings">
        
        <Ratings />
      </div> */}
      <div id="Timer">
        <Timer />
      </div>
    </>
  );
}
