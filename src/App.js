import "./App.css";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import GlobalLoader from "./components/GlobalLoader";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { logout } from "./redux/auth/authSlice";

function App() {

  useEffect(() => {
  const interval = setInterval(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        store.dispatch(logout());
        window.location.href = "/login";
      }
    }
  }, 60000); // check every 60 sec

  return () => clearInterval(interval);
}, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          
          {/* Global Loader shows when any Redux slice sets loading=true */}
          <GlobalLoader />

          {/* All application routes */}
          <AppRouter />

        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
