import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

/**
 * Only providiing a second argument of default history
 * if we are in development
 */
const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      /**
       * Memory history needs an initial path.  Default is '/'
       */
      initialEntries: [initialPath],
    });

  /**
   * onNavigate: callback function from container
   * whenever the path in url changes from container
   * we want to tell the memory history object to call
   * the callback function.  Listen function of onNavigate in container
   * provides for a location argument
   */
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);
  /**
   * Communicate navigation down to marketing app
   */
  return {
    /**
     * pathname comes from location argument object
     * which is in location history from Container.  Here we destructure
     * pathname form location object and rename nextPathname.
     */
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      /**
       * Avoid infinite flow by checking whether our current
       * location is different than the one we want to navigate to
       */
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) {
    /**
     * expects an options object as second argument (callback)
     * even in when running Marketing App isolation as below
     * Otherwase this error: Uncaught (in promise) TypeError: Cannot
     * read property 'onNavigate' of undefined at mount (bootstrap.js:17)
     * so adding { defaultHistory: createBrowserHistory() } as second arg.  When we run app in isolation, we will
     * use browser history instead.
     */
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };
