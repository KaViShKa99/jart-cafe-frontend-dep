import React from "react";
import { Notification, toaster } from "rsuite";

const AlertBox = (type, title, description, duration = 2000) => {
  const notification = (
    <Notification type={type} header={title} closable style={{ width: 300 }}>
      <div>{description}</div>
    </Notification>
  );

  toaster.push(notification, {
    placement: "topEnd",
    duration: duration,
  });
};

export default AlertBox;
