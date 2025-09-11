/* eslint-disable react-refresh/only-export-components */
import { Button } from "antd";
import { useState, useContext, createContext } from "react";

const ImpersonationContext = createContext();

export const ImpersonationProvider = ({ children }) => {
  const [impersonationState, setImpersonationState] = useState(null);

  const startImpersonation = (user) => {
    setImpersonationState({
      name: user.name,
      role: user.designation,
      id: user.id,
    });
  };

  const exitImpersonation = () => {
    setImpersonationState(null);
  };

  return (
    <ImpersonationContext.Provider
      value={{
        impersonationState,
        startImpersonation,
        exitImpersonation,
        isImpersonating: !!impersonationState,
      }}
    >
      {children}
    </ImpersonationContext.Provider>
  );
};

export const useImpersonation = () => {
  const context = useContext(ImpersonationContext);
  if (!context) {
    throw new Error("useImpersonation must be used within ImpersonationProvider");
  }
  return context;
};

export const ImpersonationBanner = () => {
  const { impersonationState, exitImpersonation, isImpersonating } = useImpersonation();

  if (!isImpersonating) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: "#ff4d4f",
        color: "white",
        padding: "8px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <span>
        🔑 Impersonating {impersonationState.name} ({impersonationState.role}) — All actions are logged
      </span>
      <Button type="primary" danger size="small" onClick={exitImpersonation}>
        Exit Impersonation
      </Button>
    </div>
  );
};