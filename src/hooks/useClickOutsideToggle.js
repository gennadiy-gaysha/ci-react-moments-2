import { useEffect, useRef, useState } from "react";

const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // 2) Whenever a user performs the specified action (in this case, releasing a mouse button anywhere on the document), the browser generates an event object. This object contains details about the event, such as the type of event, the target element (where the event occurred), the time of the event, and more.
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
        //  Inside handleClickOutside(event), you can access the event object to find out information about the event and react accordingly. For example, you can check event.target to see which element was interacted with.
        // console.log(event.target);
      }
    };
    // 1) You're telling the browser to listen for "mouseup" events on the entire document. You can replace "mouseup" with other event types (like "click", "mousedown", "mousemove", etc.) depending on what kind of user interaction you want to respond to.

    // 3) The browser then automatically calls the handleClickOutside function and passes the generated event object as an argument. This happens behind the scenes; you don't need to manually pass the event object.
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;
