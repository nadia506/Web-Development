import { useState } from "react";
import { Routes, Route } from "react-router";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Confirmation from "./pages/Confirmation";
import Header from "./components/Header";
import { Container, useToast } from "@chakra-ui/react";

function App() {
  const [cart, setCart] = useState({});
  const [cartSize, setCartSize] = useState(0);
  const toast = useToast();

  const addToCart = (item, quantity) => {
    if (!cart[item.id]) {
      toast({
        title: "Item added to the cart!",
        description: "Item added to the cart successfuly",
        status: "success",
        isClosable: true,
      });
      setCartSize(cartSize + 1);
    }
    setCart((cart) => {
      const currQuantity = cart[item.id]
        ? cart[item.id].quantity + quantity
        : quantity;
      return { ...cart, [item.id]: { ...item, quantity: currQuantity } };
    });
  };

  // PRE: item is already in the cart!
  const updateCart = (item, quantity) => {
    setCart((cart) => {
      if (quantity === 0) {
        toast({
          title: "Removed from cart",
          description: "Item removed from cart successfuly",
          status: "warning",
          isClosable: true,
        });
        setCartSize(cartSize - 1);
        delete cart[item.id];
      } else {
        cart[item.id].quantity = quantity;
      }
      return { ...cart };
    });
  };

  const clearCart = () => {
    setCartSize(0);
    setCart({});
  };
  return (
    <Container>
      <Header numItems={cartSize} />
      <Routes>
        <Route
          path="/hw4-estore-nadia506/"
          element={<Shop addToCart={addToCart} />}
        />
        <Route
          path="/hw4-estore-nadia506/product/:id"
          element={<Product addToCart={addToCart} />}
        />
        <Route
          path="/hw4-estore-nadia506/cart"
          element={<Cart items={Object.values(cart)} updateCart={updateCart} />}
        />
        <Route
          path="/hw4-estore-nadia506/confirmation"
          element={<Confirmation clearCart={clearCart} />}
        />
      </Routes>
    </Container>
  );
}

export default App;
