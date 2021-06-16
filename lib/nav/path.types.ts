export interface Path {
  // "react-router" compatible exact path
  path: string;

  // Static Displayable name for this path.
  // Used for displaying the title of the page in the navigation bar.
  displayName: string | null;

  // Set to True to allow the user to go "back" to the previous page from this path.
  // Set to False to disallow
  allowGoBackInHistory: boolean;
}

export interface AppPaths {
  [key: string]: Path;
}
