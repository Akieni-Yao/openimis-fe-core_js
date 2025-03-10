import React from "react";
import { useLocation } from "react-router-dom";
import { routePages } from "../hooks/routes";

function UsePageTitle() {
  const location = useLocation();
  const { pathname } = location;
  const [page, setPage] = React.useState({});

  React.useEffect(() => {
    const routes = routePages.find((item) => {
      if (item.path === pathname) {
        return item;
      }

      if (pathname.startsWith(item.path)) {
        return item;
      }

      return null;
    });
    if (routes) {
      setPage((prev) => ({ ...routes }));
    }
  }, [pathname]);

  return page;
}

export default UsePageTitle;
