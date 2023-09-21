/**
 * UserPresence
 *
 * Component that shows and manages the user's presence, allowing the user
 * to interact with the activity bar, sub-bar, and templates. It also gives the user
 * the option to change their display name and color.
 *
 * Props:
 * - pageName {string} - The name of the page or activity the user is on.
 *
 * @component
 */
import { useEditor } from "@tldraw/tldraw";
import { track } from "signia-react";
import "../Activity/NavigationBar.css";
import { createShapeId, Editor } from "@tldraw/tldraw";
import ActivityBar from "../Activity/ActivityBar";
import TemplateIcon from "../assets/Template_icon.png";
import SubBar from "../Activity/SubBar";
import { useState } from "react";

export const UserPresence = track(({ pageName }) => {
  const editor = useEditor();
  const { color, name } = editor.user;
  const [hideTemplate, setHideTemplate] = useState(false);
  const activityName = pageName;
  const problemsShape = createShapeId("s1");
  const solutionsShape = createShapeId("s2");
  /**
   * createTemplate
   *
   * Creates a visual template on the editor consisting of two areas:
   * - Problem area
   * - Solution area
   *
   * @param {Editor} editor - The current instance of the editor.
   */
  const createTemplate = (editor: Editor) => {
    // Create the "problem" shape
    editor.createShapes([
      {
        id: problemsShape,
        type: "geo",
        x: 128,
        y: 80,
        props: {
          geo: "rectangle",
          w: 500,
          h: 680,
          dash: "draw",
          color: "light-red",
          size: "m",
          text: "What's the problem?",
          fill: "solid",
        },
      },
    ]);
    // Create the "solution" shape
    editor.createShapes([
      {
        id: solutionsShape,
        type: "geo",
        x: 700,
        y: 80,
        props: {
          geo: "rectangle",
          w: 500,
          h: 680,
          dash: "draw",
          color: "light-green",
          size: "m",
          text: "What's the solution?",
          fill: "solid",
        },
      },
    ]);
  };
  /**
   * handleTemplateClick
   *
   * Handles the logic of displaying/hiding the template based on the
   * user's interaction.
   */
  const handleTemplateClick = () => {
    setHideTemplate(!hideTemplate);
    console.log("Templates clicked: " + hideTemplate);
    if (hideTemplate == false) {
      createTemplate(editor);
    } else {
      editor.deleteShapes([problemsShape, solutionsShape]);
    }
  };

  return (
    <>
      <div style={{ pointerEvents: "all", display: "flex" }}>
        <SubBar editor={editor} activityName={activityName} />
        <ActivityBar activityName={activityName} />
        <div className="nav-4">
          <div
            className={`nav-button ${hideTemplate ? "active" : ""}`}
            onClick={handleTemplateClick}
          >
            <img src={TemplateIcon} alt="TemplateIcon" className="icon" />
            Template
          </div>
        </div>

        <input
          type="color"
          value={color}
          onChange={(e) => {
            editor.user.updateUserPreferences({
              color: e.currentTarget.value,
            });
          }}
        />

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
