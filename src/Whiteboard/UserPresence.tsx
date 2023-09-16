/**
 * Whiteboard user Presence Component for MentKnow Application.
 * This component serves as a way of saving the user details which they
 * can modify on the whiteboard.
 *
 * @author: Lesley Shonhiwa
 * @colaborators :Chloe Walt and Sizwe Nkosi
 * @version: 1.1
 * @license: University of Cape Town, School of IT license
 */

import { useEditor } from "@tldraw/tldraw";
import { track } from "signia-react";
import "../Activity/NavigationBar.css";
import { createShapeId, Editor } from "@tldraw/tldraw";
import ActivityBar from "../Activity/ActivityBar";
import TemplateIcon from "../assets/Template_icon.png";
import SubBar from "../Activity/SubBar";

// Define a component wrapped with tracking functionality
export const UserPresence = track(({ pageName }) => {
  const editor = useEditor();
  const { color, name } = editor.user;

  //Get current Page/Activity name
  const activityName = pageName;
  // Create Template shape id's
  const problemsShape = createShapeId("s1");
  const solutionsShape = createShapeId("s2");
  //Create Template
  const createTemplate = (editor: Editor) => {
    // Create "problems" template
    editor.createShapes([
      {
        id: problemsShape,
        type: "geo",
        x: 128,
        y: 128,
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
    // Create "solutions" template
    editor.createShapes([
      {
        id: solutionsShape,
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

  //OnClick even for the "Templates" button
  const handleTemplateClick = () => {
    createTemplate(editor); //create the templates
  };

  return (
    <>
      <div style={{ pointerEvents: "all", display: "flex" }}>
        {/* Add the Dashboard bar to the main bar */}
        <SubBar editor={editor} activityName={activityName} />
        <ActivityBar activityName={activityName} />
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
