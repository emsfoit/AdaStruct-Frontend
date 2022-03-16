export default (ApiService) => ({
  query(params) {
    return ApiService.query("users/datasets/files", {
      params: params,
    });
  },
  create_file(params) {
    return ApiService.post("users/datasets/files", params);
  },
  destroy_file(slug) {
    return ApiService.delete(`users/datasets/files/${slug}`);
  },
});
