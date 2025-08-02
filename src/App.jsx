import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import AvailableItems from "./Components/AvailableItems";
import AvailableSoon from "./Components/AvailableSoon";
import OutOfStock from "./Components/OutOfStock";
import AddNewItems from "./Components/AddNewItems";
import WelcomePage from "./Components/WelcomePage";
import Admin from "./Components/Admin";
import { Provider } from "react-redux";
import store from "./Store/Store";
import AllItems from "./Components/AllItems";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="" element={<WelcomePage />} />
        <Route
          path="/items"
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          <Route path="availableitems" element={<AvailableItems />} />
          <Route path="allitems" element={<AllItems />} />
          <Route path="availablesoon" element={<AvailableSoon />} />
          <Route path="outofstock" element={<OutOfStock />} />
          <Route path="addnewitem" element={<AddNewItems />} />
          <Route path="edititem/:id" element={<AddNewItems />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
