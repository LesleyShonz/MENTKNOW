import { useEditor } from "@tldraw/tldraw";
import { track } from "signia-react";
import Ratings from "./Ratings";
export const UserPresence = track(() => {
  const editor = useEditor();

  const { color, name } = editor.user;
  const activityName = editor.currentPage.name;

  console.log("Page ID test" + editor.currentPage.name);
  return (
    <>
      {/* ///RATINGS */}

      <div style={{ pointerEvents: "all", display: "flex" }}>
        <div className="Ratings">
          <Ratings activityName={activityName} />
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
