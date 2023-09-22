/**
 * Whiteboard Component
 *
 * This component provides an interactive whiteboard using the Tldraw library.
 * Users can draw on the whiteboard and collaborate with others in real-time.
 * The component is enhanced with collaborative capabilities through the use
 * of Y.js, a real-time collaboration framework.
 *
 * Features:
 * - Uses Tldraw for the main drawing functionality.
 * - Uses Y.js for real-time collaboration.
 * - Extracts the `pageName` from the current route using React Router's
 *  `useLocation` hook.
 * - Initializes the Y.js store with a `roomId` based on the `pageName`.
 * - Uses the `UserPresence` component to display the users currently
 * collaborating on the whiteboard.
 *
 */

// Import the main Tldraw component for whiteboard functionality and its styling
import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";

// Import custom hooks and components for additional functionality
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
  // Render the Tldraw whiteboard and UserPresence components
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
