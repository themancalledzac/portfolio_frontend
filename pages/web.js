import { useEffect } from "react";
import { usePageState } from "../lib/pageState";

function Web() {
  const { webPageState, setWebPageState } = usePageState();
  useEffect(() => {
    setWebPageState(true);
    console.log("webPageState:" + webPageState);
  }, [webPageState]);
  return (
    <div>
      <p>Our Web Page</p>
    </div>
  );
}

export default Web;
