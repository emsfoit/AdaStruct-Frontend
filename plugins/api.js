function appendSlash(str, append = false) {
  if (append) {
    if (str.endsWith("/")) {
      return str;
    }
    return str + "/";
  } else {
    if (str.endsWith("/")) {
      return str.slice(0, str.length - 1);
    }
    return str;
  }
}
const apiFactory = ($axios) => ({
  download(resource, slug = "", params = {}, save_as = "file") {
    resource = appendSlash(resource);
    if (slug) {
      resource += `${slug}/`;
    }
    return $axios({
      url: resource,
      method: "GET",
      responseType: "blob",
      params: params.params,
    })
      .then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute("download", save_as);
        document.body.appendChild(fileLink);
        fileLink.click();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  query(resource, params, action = "") {
    resource = appendSlash(resource);
    return $axios.get(resource, params);
  },
  get(resource, slug = "") {
    resource = appendSlash(resource);
    if (slug) {
      resource = appendSlash(resource, true);
      resource += `${slug}/`;
    }
    return $axios.get(resource);
  },
  post(resource, params, config = {}) {
    resource = appendSlash(resource);
    return $axios.post(resource, params, config);
  },
  update(resource, params, config = {}) {
    resource = appendSlash(resource);
    return $axios.put(resource, params, config);
  },
  patch(resource, slug, params, config = {}) {
    resource = appendSlash(resource);
    return $axios.patch(resource, params, config);
  },
  put(resource, params) {
    resource = appendSlash(resource);
    return $axios.put(resource, params);
  },
  patch(resource, params) {
    resource = appendSlash(resource);
    return $axios.patch(resource, params);
  },
  delete(resource) {
    resource = appendSlash(resource);
    return $axios.delete(resource);
  },
});
export default function ({ $axios }, inject) {
  const api = apiFactory($axios);
  inject("api", api);
}
