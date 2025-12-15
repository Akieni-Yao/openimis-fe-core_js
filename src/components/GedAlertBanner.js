import React from "react";
import { useGedHealth } from "../helpers/hooks";

export default function GedAlertBanner() {
  const { gedDown, checking } = useGedHealth();

  if (checking || !gedDown) return null;

  return (
    <>
      <div
        style={{
          backgroundColor: "#ffcccc",
          color: "#900",
          textAlign: "center",
          padding: "12px 0",
          fontWeight: "bold",
          fontSize: "14px",
          position: "fixed",
          top: "80px",
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 1200,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        ⚠️ Service GED (DMS) est actuellement indisponible. Veuillez contacter l'équipe technique.
      </div>

      <div
        style={{
          height: "48px",
          width: "100%",
        }}
      />
    </>
  );
}
