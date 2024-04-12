import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/sign-up";
import DashBoards from "./pages/DashBoards";
import Signin from "./pages/sign-in";
import Navbar from "./components/Navbar";
import WishList from "./pages/WishList";
import OTPverification from "./pages/OTPverification";
import AddProduct from "./pages/AddProduct";
import { ProductInfo } from "./pages/ProductInfo";
import Chat from "./pages/Chat/Chat";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/profile" element={<DashBoards />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/verify" element={<OTPverification/>} />
          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/product-info/:id" element={<ProductInfo/>} />
          <Route path="/chats" element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
