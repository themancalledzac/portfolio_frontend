import { useState, useContext, createContext } from "react";

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function PageStateProvider({ children }) {
  // custom provider. we will store data (state) and functionality (udaters) in here and anyone can access it via the consumer.

  const [indexPageState, setIndexPageState] = useState(true);
  const [photoPageState, setPhotoPageState] = useState(false);
  const [webPageState, setWebPageState] = useState(false);

  function togglePhoto() {
    if (indexPageState) {
      setIndexPageState(false);
    }
    if (webPageState) {
      setWebPageState(false);
    }
    if (!photoPageState) {
      setPhotoPageState(true);
    }
  }

  function toggleWeb() {
    if (indexPageState) {
      setIndexPageState(false);
    }
    if (photoPageState) {
      setPhotoPageState(false);
    }
    if (!webPageState) {
      setWebPageState(true);
    }
    console.log(
      "index:" +
        indexPageState +
        "photo: " +
        photoPageState +
        "web: " +
        webPageState
    );
  }

  return (
    <LocalStateProvider
      value={{
        indexPageState,
        setIndexPageState,
        photoPageState,
        setPhotoPageState,
        webPageState,
        setWebPageState,
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
