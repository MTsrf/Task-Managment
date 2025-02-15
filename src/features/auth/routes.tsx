import Header from "../../components/Layout/Header";
import HomePage from "../../pages";
import TaskListRoutes from "../../pages/task-list/TaskListRoutes";
import AuthGuard from "./AuthGuard";

const routes = [
  {
    element: (
      <AuthGuard>
        <div style={{ marginTop: "30px" }}>
          <Header />
        </div>
      </AuthGuard>
    ),
    children: [...TaskListRoutes()],
  },
  { path: "/", element: <HomePage /> },
];

export default routes;
