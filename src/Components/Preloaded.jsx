import React, { useEffect, useState } from "react";

const MIN_VISIBLE_TIME = 350; // milisegundos

const Preloaded = ({ visible }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [showTimestamp, setShowTimestamp] = useState(0);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setShowTimestamp(Date.now());
    } else {
      const elapsed = Date.now() - showTimestamp;
      const remainingTime = MIN_VISIBLE_TIME - elapsed;

      if (remainingTime > 0) {
        const timeout = setTimeout(() => setShouldRender(false), remainingTime);
        return () => clearTimeout(timeout);
      } else {
        setShouldRender(false);
      }
    }
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-amber-500 border-t-transparent"></div>
    </div>
  );
};

export default Preloaded;
