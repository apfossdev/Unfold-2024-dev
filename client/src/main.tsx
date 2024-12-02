import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EnokiFlowProvider } from "@mysten/enoki/react";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl("testnet") },
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <EnokiFlowProvider apiKey={import.meta.env.VITE_ENOKI_API}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </WalletProvider>
        </SuiClientProvider>
      </EnokiFlowProvider>
    </QueryClientProvider>
  </StrictMode>
);
