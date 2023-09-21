/**
 * UserContext
 *
 * Provides a way to pass user data down the component tree without having to
 * pass props down manually at every level. Can be used with React's Context API.
 *
 * @component
 */
import React from "react";

const UserContext = React.createContext();

export default UserContext;
