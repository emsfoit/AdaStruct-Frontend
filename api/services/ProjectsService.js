export function cleanObject(obj) {
  for (var propName in obj) {
    if (typeof obj[propName] == "object") {
      cleanObject(obj[propName]);
      if (Object.keys(obj[propName]).length == 0) {
        delete obj[propName];
      }
    } else if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ""
    ) {
      delete obj[propName];
    }
  }
  return obj;
}

export default (ApiService) => ({
  query(params) {
    return ApiService.query("users/projects", {
      params: params,
    });
  },
  get(slug) {
    return ApiService.get("users/projects", slug);
  },
  create(params) {
    return ApiService.post("users/projects", params);
  },
  update(slug, payload) {
    return ApiService.update("users/projects", slug, payload);
  },
  patch(slug, payload) {
    let clean_payload = cleanObject(payload);
    return ApiService.patch(`users/projects/${slug}`, clean_payload);
  },
  destroy(slug) {
    return ApiService.delete(`users/projects/${slug}`);
  },
});
