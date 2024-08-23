import React, { useState, useEffect,useRef } from "react";
import {
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotification, markNotificationAsRead } from "../../actions";
import { historyPush, useHistory } from "../../helpers/history";
import { useTranslations, formatMessage } from "../../helpers/i18n";
import { useIntl } from "react-intl";
import { parseData } from "../../helpers/api";

const useStyles = makeStyles((theme) => ({
  popover: {
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: -8,
      left: "calc(50% - 8px)", // Center the arrow horizontally
      width: 0,
      height: 0,
      borderLeft: "8px solid transparent",
      borderRight: "8px solid transparent",
      borderBottom: `8px solid ${theme.palette.background.paper}`,
      zIndex: 1,
    },
  },
  arrow: {
    position: "absolute",
    top: "-8px",
    left: "calc(50% - 8px)",
    width: 0,
    height: 0,
    borderLeft: "8px solid transparent",
    borderRight: "8px solid transparent",
    borderBottom: `8px solid ${theme.palette.background.paper}`,
    zIndex: 1,
  },
  clearAllButton: {
    padding: 0,
    minHeight: "auto",
    minWidth: "auto",
    color: theme.palette.primary.main,
  },
}));

const NotificationDialog = ({ anchorEl, onClose, open, id, notificationData, modulesManager }) => {
  const [notifications, setNotifications] = useState([]);
  const [hasFetchedMore, setHasFetchedMore] = useState(false);
  const intl = useIntl();
  const { formatDateFromISO } = useTranslations("core", modulesManager);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userid = localStorage.getItem("userId");
  const userLanguage = localStorage.getItem("userLanguage");
  const checkRes = useSelector((store) => store.core);
  const listRef = useRef(null);

  useEffect(() => {
    // if (open) {
    dispatch(fetchNotification(userid));
    // }
  }, [open]);

  useEffect(() => {
    if (notificationData) {
      setNotifications(notificationData);
    }
  }, [notificationData]);

  const handleClearAll = () => {
    const res = dispatch(markNotificationAsRead({ readAll: true, userId: userid }, "label"));
    if (!!res) {
      dispatch(fetchNotification(userid));
      setNotifications([]);
    }
  };

  const handleListItemClick = (notification) => {
    if (!!notification.redirectUrl) {
      history.push(notification.redirectUrl);
      const res = dispatch(markNotificationAsRead({ ...notification, userId: userid }, "label"));
      if (!!res) {
        dispatch(fetchNotification(userid));
      }
      onClose();
    }
  };

  const getNotificationMessage = (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      return parsedMessage[userLanguage] || parsedMessage["en"];
    } catch (error) {
      console.error("Failed to parse notification message:", error);
      return message; // Fallback to the original message if parsing fails
    }
  };

  const handleScroll = () => {
    const threshold = 1;
    const isBottom = listRef.current.scrollHeight - listRef.current.scrollTop <= listRef.current.clientHeight + threshold;
    if (isBottom && !hasFetchedMore) {
      dispatch(fetchNotification(userid,checkRes.notificationListTotalCount));
      setHasFetchedMore(true); // Set to true to prevent further API calls
    }
  };

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={classes.popover}
      >
        {/* <div className={classes.arrow}></div> */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16 }}>
          <Typography variant="h6">{formatMessage(intl, "core", "title")}</Typography>
          <Button className={classes.clearAllButton} onClick={handleClearAll} disabled={notifications.length === 0}>
            {formatMessage(intl, "core", "clearAll")}
          </Button>
        </div>
        <Divider />
        <List ref={listRef} style={{ width: 300, maxHeight: 200, overflowY: "auto" }} onScroll={handleScroll}>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <React.Fragment key={index}>
                {/* <ListItem> */}
                <ListItem button onClick={() => handleListItemClick(notification)}>
                  <ListItemIcon>
                    <CheckCircleIcon style={{ color: "green" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${getNotificationMessage(notification.message)}`}
                    secondary={formatDateFromISO(notification.createdAt)}
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))
          ) : (
            <Typography style={{ padding: 16 }} align="center">
              {formatMessage(intl, "core", "emptyNotification")}
            </Typography>
          )}
        </List>
      </Popover>
    </div>
  );
};

export default NotificationDialog;
