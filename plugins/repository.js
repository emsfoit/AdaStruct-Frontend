import AuthService from "../api/services/AuthService";

export default (ctx, inject) => {
  inject("AuthService", AuthService(ctx.$api));

  // Add new api services here
};
