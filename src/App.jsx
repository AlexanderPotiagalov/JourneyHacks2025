import {
  Route,
  CreateBrowserRouter,
  CreateRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";

import MainLayout from "./layouts/MainLayout.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Homepage />} />
    </Route>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
