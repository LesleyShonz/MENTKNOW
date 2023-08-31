import "./styles.css";
import "@tldraw/tldraw/tldraw.css";
import { Tldraw } from "@tldraw/tldraw";
import { useYjsStore } from "./useYjsStore";
import { UserPresence } from "./UserPresence";

export default function App() {
  const store = useYjsStore({
    roomId: "codesandbox_2"
  });

  return (
    <div className="tldraw__editor">
      <Tldraw store={store} autoFocus shareZone={<UserPresence />} />
    </div>
  );
}
