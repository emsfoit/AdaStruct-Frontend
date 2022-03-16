import AuthService from "../api/services/AuthService";
import ProjectsService from "../api/services/ProjectsService";
import DatasetsService from "../api/services/DatasetsService";

export default (ctx, inject) => {
  inject("AuthService", AuthService(ctx.$api));
  inject("ProjectsService", ProjectsService(ctx.$api));
  inject("DatasetsService", DatasetsService(ctx.$api));

  // Add new api services here
};
