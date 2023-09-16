/**
 * Whiteboard  Component for MentKnow Application.
 * This component creates and displays the collaborative whiteboard.
 
 * @author: Lesley Shonhiwa
 * @colaborators :Chloe Walt and Sizwe Nkosi
 * @version: 1.1
 * @license: University of Cape Town, School of IT license
 */

import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useYjsStore } from "./useYjsStore";
import { UserPresence } from "./UserPresence";
import { useLocation } from "react-router-dom";
export default function Whiteboard() {
  //Obtain page name from previous interface
  const location = useLocation();
  const pageName = location.state.pageName;
  //Create a store to store data
  const store = useYjsStore({
    roomId: pageName + "1234",
  });
  //Display the Whiteboard
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
