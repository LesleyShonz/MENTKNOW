import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useYjsStore } from "./useYjsStore";
import { UserPresence } from "./UserPresence";
import { useLocation } from "react-router-dom";
// The main Whiteboard component
export default function Whiteboard() {
  const location = useLocation();
  const pageName = location.state.pageName;
  /**  Initialize the Y.js store using the custom hook.
   * This store will keep track of the shared state for collaborative drawing.
   * The roomId is based on the pageName with an appended "1234" for
   * differentiation
   */
  const store = useYjsStore({
    roomId: pageName + "1234",
  });

  return (
    <>
      <div className="tldraw__editor">
        <Tldraw
          store={store}
          autoFocus
          shareZone={<UserPresence pageName={pageName} />}
        />
      </div>
    </>
  );
}
