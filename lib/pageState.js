import { useState, useContext, createContext } from "react";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function PageStateProvider({ children }) {
  // custom provider. we will store data (state) and functionality (udaters) in here and anyone can access it via the consumer.

  const [pageState, setPageState] = useState("index");

  function togglePhoto() {
    setPageState("photo");
  }

  function toggleWeb() {
    setPageState("web");
  }

  return (
    <LocalStateProvider value={{ pageState, togglePhoto, toggleWeb }}>
      {children}
    </LocalStateProvider>
  );
}

// custom hook for accessing the page local state
function usePageState() {
  const all = useContext(LocalStateContext);
  return all;
}

export { PageStateProvider, usePageState };
