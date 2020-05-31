import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./config/ReactotronConfig";
import GlobalStyle from "./styles/global";
import Header from "./components/Header";
import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {<Header></Header>}
        <Routes></Routes>
        <GlobalStyle></GlobalStyle>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
