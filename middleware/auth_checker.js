import { TOKEN, USER_TYPE } from "../store/types/mutations.type";
export default async (context) => {
  if (context.app.$cookies.get(TOKEN)) {
    if (context.app.$cookies.get(USER_TYPE) == "user")
      return context.redirect("/user/projects");
  }
};
