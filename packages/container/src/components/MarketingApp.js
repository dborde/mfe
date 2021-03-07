import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";
import { useHistory } from "react-router-dom";

export default () => {
  /**
   * useRef keeps coupling generic by rendering instance of
   * React MarketingApp element inside some html element
   */
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    /**
     * Destructure out object returned from marketing/src/bootstrap.js
     * for communication from marketingApp
     */
    const { onParentNavigate } = mount(ref.current, {
      /**
       * pathname comes from location argument object
       * which is in memory history from Marketing.  Here we destructure
       * pathname form location object and rename nextPathname.
       *
       * Should get intialPath for marketing.  Default is '/'.
       * Getting intialPath from auth bootstrap'
       */
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        /**
         * Now when we click pricing in marketing app, for example,
         * the url will update. Avoid infinite flow by checking whether
         * we want history object to navigate
         */
        const { pathname } = history.location; // Current path
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });
    /**
     * Memory history object has listener we can use
     * to call the mount function
     */
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
