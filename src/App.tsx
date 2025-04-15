import Main from "./components/home/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
