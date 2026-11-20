import axios from "axios";
import { toast } from "react-toastify";
import { offlineDemoAdapter } from "./features/api/offlineDemoApi";

const createBlockedApiError = () => {
  const error = new Error(
    "Direct network requests are disabled in offline demo mode."
  );
  error.code = "ERR_NETWORK_DISABLED";
  return error;
};

toast.error = () => {};

if (typeof window !== "undefined") {
  window.fetch = () => Promise.reject(createBlockedApiError());
  window.XMLHttpRequest.prototype.send = function () {
    throw createBlockedApiError();
  };
}

axios.defaults.adapter = offlineDemoAdapter;
