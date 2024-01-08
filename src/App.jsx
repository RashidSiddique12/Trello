import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DisplayBoards from "./components/boards/DisplayBoards";
import Header from "./components/headers/Header";
import "./components/style.css";
import ListPage from "./components/listPage/ListPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header />
                <DisplayBoards />
              </div>
            }
          />
          <Route path="/board/:id" element={<ListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
