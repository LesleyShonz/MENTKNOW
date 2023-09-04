import { useEditor } from "@tldraw/tldraw";
import { track } from "signia-react";

export const UserPresence = track(() => {
  const editor = useEditor();

  const { color, name } = editor.user;

  return (
    <>
      <div style={{ pointerEvents: "all", display: "flex" }}>
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
