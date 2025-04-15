import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./components/page/mainpage/MainPage";
import AdminPage from "./components/page/adminpage/AdminPage";
import Header from "./components/include/Header/Header";
import ModelPage from "./components/page/adminpage/ModelPage/ModelPage";
import CarPage from "./components/page/adminpage/CarPage/CarPage";
<<<<<<< HEAD
import PostBoard from "./components/page/CommunitePage/PostBoard";
import NoticePage from "./components/page/NotionPage/NoticePage";
=======
import CarRentPage from "./components/page/carrentpage/CarRentPage";
>>>>>>> 6fdc6141b8d4085701dbd53c7bb06f781489079e

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/c" element={<PostBoard />} />

<<<<<<< HEAD
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Navigate to="model" replace />} />

          <Route path="model" element={<ModelPage />} />
          <Route path="car" element={<CarPage />} />
          <Route path="notice" element={<NoticePage />} />
        </Route>
      </Routes>
    </>
  );
=======
               <Route path="model" element={<ModelPage />} />
               <Route path="car" element={<CarPage />} />
            </Route>
            <Route path="/rent" element={<CarRentPage />} />
         </Routes>
      </>
   );
>>>>>>> 6fdc6141b8d4085701dbd53c7bb06f781489079e
}

export default App;
