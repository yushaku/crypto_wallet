import AccountCreate from "./components/Account/AccountCreate";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Portfolio";
import { Buy } from "./components/Buy";

function App() {
  return (
    <section className="App container my-10">
      <h1 className="text-blue-500 text-3xl mb-3 font-medium">Zinza Wallet</h1>
      <article className="flex">
        <Navbar />

        <div className="w-full">
          <Routes>
            <Route path="/send" element={<AccountCreate />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </article>

      <Toaster />
    </section>
  );
}

export default App;
