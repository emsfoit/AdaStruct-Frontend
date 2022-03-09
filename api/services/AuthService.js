export default (ApiService) => ({
  login(payload) {
    return ApiService.post("/users/login", payload);
  },
  reset_password(payload) {
    return ApiService.post("/users/password/reset", payload);
  },
  update_password(token, payload) {
    return ApiService.post(`/users/password/complete_reset`, payload, {
      params: {
        token: token,
      },
    });
  },
  change_password(slug, payload) {
    return ApiService.put(`/users/${slug}/password/update`, payload);
  },
  sign_up(payload) {},
  get(slug) {
    return ApiService.get("/user", slug);
  },
  get_user_profile() {
    return ApiService.get(`/users/profile`);
  },
});
