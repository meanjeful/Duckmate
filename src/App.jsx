import Main from "./pages/Main";
import MakePlayList from "./pages/MakePlayList";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MakePlayList />} />
          {/* <Route path="/" element={<Main />} />
          <Route path="/makeplaylist" element={<MakePlayList />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
