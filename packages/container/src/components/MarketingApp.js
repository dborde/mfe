import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";

export default () => {
  /**
   * useRef keeps coupling generic by rendering instance of
   * React MarketingApp element inside some html element
   */
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  });

  return <div ref={ref} />;
};
