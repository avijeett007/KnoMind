"use client"

import { useCloud } from "@/cloud/useCloud";
import React, { createContext, useState, useCallback, useContext } from "react";
import { useConfig } from "./useConfig";
import { useToast } from "@/components/toast/ToasterProvider";

export type ConnectionMode = "cloud" | "manual" | "env"

type ConnectionDetails = {
  wsUrl: string;
  token: string;
  shouldConnect: boolean;
  mode: ConnectionMode;
};

type ConnectionContextType = {
  wsUrl: string;
  token: string;
  shouldConnect: boolean;
  mode: ConnectionMode;
  connect: (mode: ConnectionMode) => Promise<void>;
  disconnect: () => Promise<void>;
};

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export const ConnectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { generateToken, wsUrl: cloudWSUrl } = useCloud();
  const { setToastMessage } = useToast();
  const { config } = useConfig();
  const [connectionDetails, setConnectionDetails] = useState<ConnectionDetails>({
    wsUrl: "",
    token: "",
    shouldConnect: false,
    mode: "manual"
  });

  const connect = useCallback(
    async (mode: ConnectionMode) => {
      let token = "";
      let url = "";
      try {
        if (mode === "cloud") {
          token = await generateToken();
          url = cloudWSUrl;
        } else if (mode === "env") {
          if (!process.env.NEXT_PUBLIC_LIVEKIT_URL) {
            throw new Error("NEXT_PUBLIC_LIVEKIT_URL is not set");
          }
          url = process.env.NEXT_PUBLIC_LIVEKIT_URL;
          const response = await fetch("/api/token");
          if (!response.ok) {
            throw new Error("Failed to fetch token");
          }
          const { accessToken } = await response.json();
          token = accessToken;
        } else {
          token = config.settings.token;
          url = config.settings.ws_url;
        }
        setConnectionDetails({ wsUrl: url, token, shouldConnect: true, mode });
      } catch (error) {
        setToastMessage({
          type: "error",
          message: `Failed to connect: ${(error as Error).message}`,
        });
      }
    },
    [cloudWSUrl, config.settings.token, config.settings.ws_url, generateToken, setToastMessage]
  );

  const disconnect = useCallback(async () => {
    setConnectionDetails((prev) => ({ ...prev, shouldConnect: false }));
  }, []);

  return (
    <ConnectionContext.Provider
      value={{
        wsUrl: connectionDetails.wsUrl,
        token: connectionDetails.token,
        shouldConnect: connectionDetails.shouldConnect,
        mode: connectionDetails.mode,
        connect,
        disconnect,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
};