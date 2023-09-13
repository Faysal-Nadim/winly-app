import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

const reduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

registerRootComponent(reduxApp);
