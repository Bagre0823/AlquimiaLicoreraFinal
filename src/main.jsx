
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";
import App from "./App.jsx";

import { CarritoProvider } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <HelmetProvider>
                <AuthProvider>
                    <CarritoProvider>
                        <App />
                    </CarritoProvider>
                </AuthProvider>
            </HelmetProvider>
        </BrowserRouter>
    </StrictMode>
);

