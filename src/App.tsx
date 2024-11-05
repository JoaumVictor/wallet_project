import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { AuthProvider } from "./context/auth-context";
import { PortfolioProvider } from "./context/assets-context";
import "./i18n";

function App() {
  return (
    <PortfolioProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </PortfolioProvider>
  );
}

export default App;
