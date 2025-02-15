import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import BioData from "./pages/BioData.jsx";
import PerspectiveAnalysis from "./pages/PerspectiveAnalysis.jsx"; // Import the new page

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Homepage />} />
      <Route path="/biodata" element={<BioData />} />
      <Route path="/perspective-analysis" element={<PerspectiveAnalysis />} />
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
