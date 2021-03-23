import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function useIntersection(options) {
  const [observerEntry, setEntry] = useState({});
  const elRef = useRef();

  useEffect(
    () => {
      const observer = new IntersectionObserver(
        entries => setEntry(entries[0]),
        options
      );
      observer.observe(elRef.current);
      return () => observer.disconnect();
    },
    [elRef]
  );
  return { observerEntry, elRef };
}

function Box({ id, children }) {
  const { observerEntry, elRef } = useIntersection({ threshold: 1 });

  return (
    <div
      id={id}
      ref={elRef}
      data-visible={observerEntry.isIntersecting}
      className="box"
    >
      {children}
    </div>
  );
}

function App() {
  return (
    <div style={{ minHeight: "150vh" }}>
      <Box id="box-1">Box 1</Box>
      <Box id="box-2">Box 2</Box>
      <Box id="box-3">Box 3</Box>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
