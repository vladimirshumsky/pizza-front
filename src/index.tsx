// @ts-ignore
import ReactDOM from "react-dom/client";
import "./scss/app.scss";
// @ts-ignore
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";
const rootMain = document.getElementById("root");
if (rootMain) {
  const root = ReactDOM.createRoot(rootMain);
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
