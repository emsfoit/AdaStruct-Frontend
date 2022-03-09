import { TOKEN, USER_TYPE } from "../store/types/mutations.type";
export default (context) => {
  if (
    !context.app.context.app.$cookies.get(TOKEN) ||
    context.app.context.app.$cookies.get(USER_TYPE) != "user"
  ) {
    return context.redirect("/user/login");
  }
};
