import { useState, useContext, createContext } from "react";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function PageStateProvider({ children }) {
  // custom provider. we will store data (state) and functionality (udaters) in here and anyone can access it via the consumer.

  const [indexPageState, setIndexPageState] = useState(true);
  const [photoPageState, setPhotoPageState] = useState(false);
  const [webPageState, setWebPageState] = useState(false);

  function togglePhoto() {
    setIndexPageState(false);
    setPhotoPageState(true);
    setWebPageState(false);
  }

  function toggleWeb() {
    setIndexPageState(false);
    setPhotoPageState(false);
    setWebPageState(true);
  }

  return (
    <LocalStateProvider
      value={{
        pageSindexPageState,
        photoPageState,
        webPageState,
        togglePhoto,
        toggleWeb,
      }}
    >
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
