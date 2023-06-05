import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import axios from "axios";
import jwtDecode from "jwt-decode";

import OrderHistoryItem from "../account/OrderHistoryItem";

import logo125 from "../../logos/Logo_MovieDL_20230426_125x22.png";

export default function CheckoutSuccess() {
  const cart = useCartStore((state) => state.cart);
  const emptyCart = useCartStore((state) => state.emptyCart);

  //let date = new Date();
  // {date.toLocaleString()}

  const [orderData, setOrderData] = useState([]);
  const [productData, setProductData] = useState({});
  const navigate = useNavigate();

  const totalProductsInCart = cart.reduce(
    (prev, current) => prev + current.count,
    0
  );

  // MW - how to get total, cart etc if emptyCart() triggers on component mount after post req?
  // POSSIBLE SOLUTION:  consider POST then GET from DB order table.  Likely!

  // Make a GET request to retrieve order history

  /*   useEffect(() => {
    const fetchData = async () => {
      const data = {};
      for (const cartItem of cart) {
        try {
          const response = await axios.get(
            `http://localhost:8080/movies/${cartItem.id}`
          );
          const { title, releaseDate, posterPath, price } = response.data;
          data[cartItem.id] = { title, releaseDate, posterPath, price };
        } catch (error) {
          console.log(
            `Error fetching data for product with ID ${cartItem.id}:`,
            error
          );
        }
      }
      setProductData(data);
    };
    fetchData();
  }, [cart]); */

  const allItemsSubtotal = cart.reduce((total, item) => {
    const data = productData[item.id] || {};
    const itemSubtotal = item.count * data.price;
    return total + itemSubtotal;
  }, 0);

  const searchQuery = "amount[gte]=5000";

  const token = localStorage.getItem("token");
  const userData = token ? jwtDecode(token) : null;
  const cartUser = userData?.username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/order/history/" + cartUser
        );
        console.log(cartUser);
        const orderData = response.data;
        orderData.sort((b, a) => {
          return a.id - b.id;
        });
        setOrderData(orderData);
      } catch (error) {
        console.error("Error getting order history:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <nav
        className="breadcrumb is-medium has-succeeds-separator pl-6 pt-1 pb-2"
        aria-label="breadcrumbs"
      >
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li className="is-active">
            <a href="#" aria-current="page">
              Checkout Success
            </a>
          </li>
        </ul>
      </nav>
      <div className="columns is-centered">
        <div className="column is-8 mx-6">
          <div
            className="box px-6 pb-6"
            style={{
              borderStyle: "solid",
              borderColor: "lightgray",
              borderWidth: "1px",
            }}
          >
            <div className="title is-3 mt-5 has-text-weight-semibold">
              Purchase Confirmation
              <span className="is-pulled-right">
                <img src={logo125}></img>
              </span>
            </div>
            <div>
              <div>
                <div className="columns is-centered pt-4">
                  <div>
                    {orderData.length > 0 && (
                      <div key={orderData[0].id}>
                        <OrderHistoryItem
                          orderId={orderData[0].id}
                          createDt={orderData[0].createDt}
                          totalOrderPrice={orderData[0].totalOrderPrice}
                          completedOrderItems={orderData[0].completedOrderItems}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <br />
            <hr></hr>
            {cartUser ? (
              <div className="has-text-centered is-italic">
                View your{" "}
                <NavLink to="../account/orders">Order History</NavLink>
              </div>
            ) : (
              <div className="has-text-centered is-danger">
                Please print this page for your records!
                <div>Guest users do not have access to account history.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
