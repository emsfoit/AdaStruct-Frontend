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
  download(resource, params) {
    resource = appendSlash(resource);
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
        let filetype = params.params.type;
        if (params.params.type == "xlsx") {
          filetype = "zip";
        }
        let full_name = `${params.params.file_name}.${filetype}`;
        fileLink.setAttribute("download", full_name);
        document.body.appendChild(fileLink);
        fileLink.click();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  query(resource, params, action = "") {
    if (action == "no_append") {
      return $axios.get(resource, params);
    } else {
      resource = appendSlash(resource);
      return $axios.get(resource, params);
    }
  },
  get(resource, slug = "") {
    resource = appendSlash(resource);
    if (slug) {
      resource += `${slug}/`;
    }
    return $axios.get(resource);
  },
  get_no_append(resource) {
    return $axios.get(resource);
  },
  get_with_params(resource, slug, params) {
    resource = appendSlash(resource);
    if (slug) {
      resource += `${slug}/`;
    }
    return $axios.get(resource, params);
  },
  post(resource, params, config = {}) {
    resource = appendSlash(resource);
    let p = params;
    return $axios.post(resource, params, config);
  },
  post_for_dub(resource, params, config = {}) {
    return $axios.post(resource, params, config);
  },
  update(resource, slug, params, config = {}) {
    resource = appendSlash(resource);
    if (slug) {
      resource += `${slug}/`;
    }
    return $axios.put(resource, params, config);
  },
  patch(resource, slug, params, config = {}) {
    resource = appendSlash(resource);
    if (slug) {
      resource += `${slug}/`;
    }
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
  download_pdf(resource) {
    return $axios({
      url: resource,
      method: "GET",
      responseType: "blob",
    });
  },
});
export default function ({ $axios }, inject) {
  const api = apiFactory($axios);
  inject("api", api);
}
