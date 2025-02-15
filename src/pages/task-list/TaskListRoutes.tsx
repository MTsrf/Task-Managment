import { lazy } from "react";
import Loadable from "../../components/common/Loadable";

const TaskList = Loadable(lazy(() => import("./index")));

const TaskListRoutes = () => [
  {
    path: "/task-list",
    element: <TaskList />,
  },
];

export default TaskListRoutes;
