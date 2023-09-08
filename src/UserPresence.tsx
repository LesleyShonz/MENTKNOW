import { useEditor } from "@tldraw/tldraw";
import { track } from "signia-react";
import Ratings from "./Ratings";
import { useState, useEffect } from "react";

import "./NavigationBar.css";

import { text } from "express";
import { createShapeId, Editor, Tldraw, TLGeoShape } from "@tldraw/tldraw";
import ActivityBar from "./ActivityBar";
import TemplateIcon from "./assets/Template_icon.png";
import SubBar from "./SubBar";
// Define a component wrapped with tracking functionality
export const UserPresence = track(() => {
  const editor = useEditor();
  const [isClicked, setIsClicked] = useState(false);
  const { color, name } = editor.user;
  const activityName = editor.currentPage.name;
  // Create a shape id
  const id = createShapeId("s1");
  const newShapeId = createShapeId("s2");
  const handleMount = (editor: Editor) => {
    // Create a shape
    editor.createShapes([
      {
        id,
        type: "geo",
        x: 128 + Math.random() * 0,
        y: 128 + Math.random() * 0,
        props: {
          geo: "rectangle",
          w: 500,
          h: 700,
          dash: "draw",
          color: "light-red",
          size: "m",
          text: "What's the problem?",
          fill: "solid",
        },
      },
    ]);

    // Create a new shape with the generated ID
    editor.createShapes([
      {
        id: newShapeId,
        type: "geo",
        x: 700,
        y: 128,
        props: {
          geo: "rectangle", // or any other shape type you want
          w: 500,
          h: 700,
          dash: "draw",
          color: "light-green", // Set the color for the new shape
          size: "m",
          text: "What's the solution?",
          fill: "solid",
        },
      },
    ]);
  };

  const handleTemplateClick = () => {
    setIsClicked(!isClicked);
    if (isClicked == true) {
      handleMount(editor);
    }
  };

  return (
    <>
      <div style={{ pointerEvents: "all", display: "flex" }}>
        {/* Button to toggle the review board */}
        <SubBar editor={editor} activityName={activityName} />
        <ActivityBar activityName={activityName} />
        {/* Render the Ratings component if showReviewBoard is true */}

        <div className="nav-4">
          <div className="nav-button" onClick={handleTemplateClick}>
            <img src={TemplateIcon} alt="TemplateIcon" className="icon" />
            Template
          </div>
        </div>
        {/* Input to change user color */}
        <input
          type="color"
          value={color}
          onChange={(e) => {
            editor.user.updateUserPreferences({
              color: e.currentTarget.value,
            });
          }}
        />
        {/* Input to change user name */}
        <input
          value={name}
          onChange={(e) => {
            editor.user.updateUserPreferences({
              name: e.currentTarget.value,
            });
          }}
        />
      </div>
    </>
  );
});
