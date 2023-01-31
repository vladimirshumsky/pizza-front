import "./scss/app.scss";
import { Header } from "./components/header";
import { createContext, useState } from "react";
import Home from "./pages/home";
import { Routes, Route, Link } from "react-router-dom";
import Empty from "./pages/empty";
import Card from "./pages/card";
import Danger from "./pages/danger";
// @ts-ignore
import PizzaItem from "./components/PizzaItem.tsx";
// export const TotalsParams = createContext();
export const pizzaArr = createContext(null);

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  // useEffect(() => {
  //   axios
  //     .get(`https://637e6c265b1cc8d6f92daf08.mockapi.io/basket`)
  //     .then((response) => {
  //       setPizzas(response.data);
  //       setTotalItems(response.data.length);
  //       setTotalSum(
  //         response.data.reduce((sum, obj) => {
  //           return obj.price + sum;
  //         }, 0)
  //       );
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [pizzas]);
  const [pizzaItems, setPizzaItems] = useState([]);
  return (
    <>
      {" "}
      <pizzaArr.Provider value={{ setPizzaItems, pizzaItems }}>
        <div className="wrapper">
          <Link to="/">
            <Header totalSum={totalSum} totalItems={totalItems} />
          </Link>
          <div className="content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/empty" element={<Empty />} />
                <Route path="/pizzas/:id" element={<PizzaItem />} />
                <Route
                  path="/card"
                  element={
                    <Card
                      pizzas={pizzas}
                      setPizzas={setPizzas}
                      setTotalSum={setTotalSum}
                      setTotalItems={setTotalItems}
                    />
                  }
                />
                <Route path="*" element={<Danger />} />
              </Routes>
            </div>
          </div>
        </div>
      </pizzaArr.Provider>
    </>
  );
}

export default App;
