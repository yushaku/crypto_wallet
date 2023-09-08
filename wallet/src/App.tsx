import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { Accounts } from "./components/Account";
import { Buy } from "./components/Buy";
import { Exchange } from "./components/Exchange";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { SendToken } from "./components/SendToken";

function App() {
  return (
    <section className="my-10">
      <h1 className="text-blue-500 text-3xl mb-3 font-medium px-4">
        Zinza Wallet
      </h1>
      <article className="flex">
        <Navbar />

        <div className="w-full">
          <Routes>
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/send" element={<SendToken />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/portfolio" element={<Home />} />
          </Routes>
        </div>
      </article>

      <Toaster />
    </section>
  );
}

export default App;
