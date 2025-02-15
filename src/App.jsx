import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Homepage from "./pages/Homepage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import BioData from "./pages/BioData.jsx";
import History from "./pages/History.jsx";
import PickupLines from "./pages/PickupLines.jsx";
import GiftIdeas from "./pages/GiftIdeas.jsx";
import DateIdeas from "./pages/DateIdeas.jsx";
import RedFlags from "./pages/PerspectiveAnalysis.jsx"; // Renamed PerspectiveAnalysis to RedFlags
import TextAnalyzer from "./pages/Textananalyser.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Homepage />} />
      <Route path="/biodata" element={<BioData />} />
      <Route path="/red-flags" element={<RedFlags />} />{" "}
      {/* Red Flags Section */}
      <Route path="/history" element={<History />} />
      <Route path="/pickup-lines" element={<PickupLines />} />
      <Route path="/gift-ideas" element={<GiftIdeas />} />
      <Route path="/date-ideas" element={<DateIdeas />} />
      <Route path="/text-analyse" element={<TextAnalyzer />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
