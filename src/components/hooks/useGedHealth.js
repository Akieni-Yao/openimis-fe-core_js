import { useEffect, useState } from "react";

export const useGedHealth = () => {
  const [gedDown, setGedDown] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkGedHealth = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/insuree/ged/health/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (mounted) {
          if (response.ok) {
            const data = await response.json();
            setGedDown(data.status !== "UP");
          } else {
            setGedDown(true);
          }
        }
      } catch (error) {
        console.error("GED health check error:", error);
        if (mounted) {
          setGedDown(true);
        }
      } finally {
        if (mounted) {
          setChecking(false);
        }
      }
    };

    checkGedHealth();

    const intervalId = setInterval(checkGedHealth, 30000);

  }, [gedDown]);

  return { gedDown, checking };
};
