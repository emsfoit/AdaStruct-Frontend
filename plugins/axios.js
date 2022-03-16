import { TOKEN, SET_ALERT } from "../store/types/mutations.type";

function handle_error(error, store) {
  if (error.response && error.response.status == 401) {
    store.commit(`alerts/${SET_ALERT}`, {
      message: "Not authorised",
      variant: "warning",
    });
  } else if (error.response && error.response.status == 403) {
    store.commit(`alerts/${SET_ALERT}`, {
      message: "Not allowed",
      variant: "warning",
    });
  } else if (error.response && error.response.status == 404) {
    store.commit(`alerts/${SET_ALERT}`, {
      message: "Not found",
      variant: "warning",
    });
  } else if (error.response && error.response.status == 500) {
    store.commit(`alerts/${SET_ALERT}`, {
      message: "Internal server error",
      variant: "danger",
    });
  } else {
    store.commit(`alerts/${SET_ALERT}`);
  }
}
function get_message(method, item, i18n) {
  let text;
  let variant;
  if (method == "put" || method == "patch") {
    text = item + "updated successfully";
    variant = "info";
  } else if (method == "post") {
    text = "created successfully";
    variant = "success";
  } else if (method == "delete") {
    text = item + "removed successfully";
    variant = "warning";
  }
  return {
    text: text,
    variant: variant,
  };
}
function handle_success(url, method, store, i18n) {
  let item = "Item";
  let message = get_message(method, item, i18n);
  store.commit(`alerts/${SET_ALERT}`, {
    message: message.text,
    variant: message.variant,
  });
}
export default function (context) {
  let { $axios, $cookies, redirect, store, app } = context;
  let token = process.client
    ? window.localStorage.getItem(TOKEN)
    : $cookies.get(TOKEN);
  // $axios.setToken(token, "Bearer");
  $axios.setHeader("Authorization", token);
  $axios.onResponse((response) => {
    let url = response.config.url;
    let method = response.config.method;
    if (method != "get") {
      handle_success(url, method, store, undefined);
    }
    return Promise.resolve(response);
  });
  $axios.onResponseError(async (error) => {
    if (process.client) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        $cookies.removeAll();
        redirect("/user/login");
      }
    }
    handle_error(error, store);
    return Promise.reject(error);
  });
}
