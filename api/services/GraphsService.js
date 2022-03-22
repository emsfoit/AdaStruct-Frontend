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
    return ApiService.query("users/graphs", {
      params: params,
    });
  },
  get(slug) {
    return ApiService.get("users/graphs", slug);
  },
  download(slug) {
    return ApiService.download(`users/graphs/${slug}/download`);
  },
  create(params) {
    return ApiService.post("users/graphs", params);
  },
  update(slug, payload) {
    return ApiService.update("users/graphs", slug, payload);
  },
  patch(slug, payload) {
    let clean_payload = cleanObject(payload);
    return ApiService.patch(`users/graphs/${slug}`, clean_payload);
  },
  destroy(slug) {
    return ApiService.delete(`users/graphs/${slug}`);
  },
});
