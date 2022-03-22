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
    return ApiService.query("users/inferences", {
      params: params,
    });
  },
  get(slug) {
    return ApiService.get(`users/inferences/${slug}`);
  },
  create(params) {
    return ApiService.post("users/inferences", params);
  },
  update(slug, payload) {
    return ApiService.update("users/inferences", slug, payload);
  },
  patch(slug, payload) {
    let clean_payload = cleanObject(payload);
    return ApiService.patch(`users/inferences/${slug}`, clean_payload);
  },
  destroy(slug) {
    return ApiService.delete(`users/inferences/${slug}`);
  },
  download(slug) {
    return ApiService.download(`users/inferences/${slug}/download`);
  },
  train(slug) {
    return ApiService.get(`users/inferences/${slug}/train`);
  },
  kill(slug, params) {
    return ApiService.post(`users/inferences/${slug}/kill`, params);
  },
});
