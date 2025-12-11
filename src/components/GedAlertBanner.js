import { Alert } from "@material-ui/lab";
import React, { useState } from "react";

export default function GedAlertBanner({ gedDown }) {
  const [visible, setVisible] = useState(true);

  if (!gedDown) return null;

  if (!visible) return null;

  return (
    <Alert
      severity="error"
      onClose={() => setVisible(false)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2000,
      }}
    >
      ⚠️ Service GED indisponible.
    </Alert>
  );
}
