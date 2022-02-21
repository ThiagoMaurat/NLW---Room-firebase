import { Home } from "../src/pages/Home";
import { NewRoom } from "./pages/NewRoom";
import "./styles/global.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContextProvider";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

export function App(){

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
          <Route path="/rooms/:id" element={<Room />} />
          <Route path="/admin/rooms/:id" element={<AdminRoom />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}


export default App;
