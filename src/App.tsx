import "./styles.css";
import "@tldraw/tldraw/tldraw.css";
import { Tldraw } from "@tldraw/tldraw";
import { useYjsStore } from "./useYjsStore";
import { UserPresence } from "./UserPresence";
import NavigationBar from "./NavigationBar";
import React, { useState } from "react";

export default function App({ showReviewBoard }) {
  const store = useYjsStore({
    roomId: "MENTKNOW",
  });

  return (
    <>
      <div className="tldraw__editor">
        <Tldraw store={store} autoFocus shareZone={<UserPresence />} />
      </div>

      <NavigationBar />
    </>
  );
}
