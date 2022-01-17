import { notification } from "antd";
import axios from "axios";
import { host } from "../../server/host";

export let openNotificationSuccess = (description) => {
  notification.success({
    message: `Done!`,
    description,
  });
};

export let onFinishFailed = (errorInfo) => {
  notification.error({
    message: "Failed!",
    description: errorInfo,
  });
};
