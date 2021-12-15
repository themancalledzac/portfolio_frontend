import { useEffect } from "react";
import { usePageState } from "../lib/pageState";

function Web() {
  const { webPageState, setWebPageState, toggleWeb } = usePageState();
  useEffect(() => {
    toggleWeb();
    console.log("webPageState:" + webPageState);
  }, []);
  return (
    <div>
      <p>Our Web Page</p>
    </div>
  );
}

export default Web;
