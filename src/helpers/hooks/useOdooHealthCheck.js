import { apiHeaders, baseApiUrl } from "@openimis/fe-core";
import { useEffect, useState } from "react";

const API_URL = `${baseApiUrl}/policyholder/odoo-health-check/`;

export const useOdooHealthCheck = () => {
  const [isOdooDown, setIsOdooDown] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkOdooHealth = async () => {
      try {
        setIsChecking(true);

        const response = await fetch(API_URL, {
          method: "GET",
          headers: apiHeaders,
          credentials: "same-origin",
        });

        const isDown = response.status !== 200;
        setIsOdooDown(isDown);

        sessionStorage.setItem("odooHealthStatus", response.status.toString());
      } catch (error) {
        console.error("Odoo health check failed:", error);
        setIsOdooDown(true);
      } finally {
        setIsChecking(false);
      }
    };

    const cachedStatus = sessionStorage.getItem("odooHealthStatus");

    if (cachedStatus) {
      setIsOdooDown(cachedStatus !== "200");
      setIsChecking(false);
    } else {
      checkOdooHealth();
    }
  }, []);

  return { isOdooDown, isChecking };
};
