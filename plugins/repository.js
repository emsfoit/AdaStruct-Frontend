import AuthService from "../api/services/AuthService";
import ProjectsService from "../api/services/ProjectsService";
import DatasetsService from "../api/services/DatasetsService";
import GraphsService from "../api/services/GraphsService";
import LogsService from "../api/services/LogsService";
import InferencesService from "../api/services/InferencesService";

export default (ctx, inject) => {
  inject("AuthService", AuthService(ctx.$api));
  inject("ProjectsService", ProjectsService(ctx.$api));
  inject("DatasetsService", DatasetsService(ctx.$api));
  inject("GraphsService", GraphsService(ctx.$api));
  inject("LogsService", LogsService(ctx.$api));
  inject("InferencesService", InferencesService(ctx.$api));

  // Add new api services here
};
