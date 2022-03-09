import { CHECK_AUTH } from "../store/types/actions.type";
export default async (context) => {
  await context.store.dispatch(`auth/${CHECK_AUTH}`);
};
