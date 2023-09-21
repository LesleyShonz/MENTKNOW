/**
 * UserContext
 *
 * Provides a way to pass user data down the component tree without having to
 * pass props down manually at every level. Can be used with React's Context API.
 *
 * Typical usage:
 *
 * ```javascript
 * const user = useContext(UserContext);
 * ```
 *
 * Components that are wrapped inside the `UserContext.Provider` will have access
 * to the `value` prop provided to the `UserContext.Provider`. This allows for
 * easier state management and prop distribution throughout an application.
 *
 * @see https://reactjs.org/docs/context.html for more details on Context API.
 *
 * @component
 */
import React from "react";

const UserContext = React.createContext();

export default UserContext;
