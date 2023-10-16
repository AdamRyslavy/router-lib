import { useNavigate } from "react-router-dom";
import { accountPaths, appPaths } from "./paths/appPaths";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <h1 onClick={() => navigate(appPaths.articles({ id: 1, site: "idk" }))}>
        articles
      </h1>
      <h1 onClick={() => navigate(accountPaths.accountInfo())}>account</h1>
    </>
  );
}

export default App;
