import { Fragment, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const privateRoutes = [
  {
    path: "/dashboard",
    element: lazy(() => import("../modules/Learners")),
  },
  // {
  //   path: '/course-play',
  //   element: lazy(() => import('../modules/User/SingleCourse')),
  // },
  {
    path: "*",
    element: lazy(() => import("../modules/NotFound")),
  },
];

function User() {
  return (
    <Routes>
      {privateRoutes.map(({ path, element: Element }) => (
        <Fragment key={path}>
          <Route key={path} path={path} element={<Element />} />
        </Fragment>
      ))}
    </Routes>
  );
}

export default User;
