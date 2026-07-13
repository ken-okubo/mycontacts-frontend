import { Route, Routes as ReactRouterRoutes } from "react-router-dom";
import EditContact from "./pages/EditContact";
import Home from "./pages/Home";
import NewContact from "./pages/NewContact";

export default function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewContact />} />
      <Route path="/edit/:id" element={<EditContact />} />
    </ReactRouterRoutes>
  );
}
