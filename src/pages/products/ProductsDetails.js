import { useLoaderData, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Products.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { faSubtract } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

// Styling originated from:  https://responsive-bulma-cards.netlify.app/ - example #5

import { useCartStore } from "../../store/cartStore";

export default function ProductsDetails() {
  //const { id } = useParams();
  const product = useLoaderData();
  const cart = useCartStore((state) => state.cart);
  const thisItemInCart = cart.find(product => product.id === product.id)?.count || 0;

  const incrementCartItem = useCartStore((state) => state.incrementCartItem);
  const decrementCartItem = useCartStore((state) => state.decrementCartItem);
  const removeAllThisItem = useCartStore((state) => state.removeAllThisItem);

  const baseImgUrl = "https://image.tmdb.org/t/p/w500";

  const [cartMessage, setCartMessage] = useState("");
  const [cartMessageStyle, setCartMessageStyle] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(thisItemInCart);

  const incrementCartItemButtonHandler = () => {
    console.log(JSON.stringify(cart));
    incrementCartItem(product.id);
    setCartMessageStyle("is-size-6");
    setCartMessage(`"${product.title}" was added to cart`);
    setButtonDisabled(false);
  };

  const decrementCartItemButtonHandler = () => {
    console.log(JSON.stringify(cart));
    decrementCartItem(product.id);
    setCartMessageStyle("is-size-6 has-text-danger");
    setCartMessage(`"${product.title}" was removed from cart`);
    if (!thisItemInCart) {
      setButtonDisabled(true);
    };
  };

  const removeAllThisItemButtonHandler = () => {
    removeAllThisItem(product.id);
    setCartMessageStyle("is-size-6 has-text-danger");
    setCartMessage(`"${product.title}" was removed from cart`);
    if (!thisItemInCart) {
      setButtonDisabled(true);
    };
  }

/*   const emptyCartButtonHandler = (e) => {
    emptyCart();
    setCartMessageStyle("is-italic is-size-6 has-text-danger pl-5");
    setCartMessage("Cart Emptied");
  }; */

  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column">
              <div className="card is-horizontal shadow-xl transform is-duration-100">
                <div className="card-image p-4">
                  <figure className="image ">
                    <img
                      src={`${baseImgUrl}${product.posterPath}`}
                      alt={`Poster for ${product.title}`}
                    ></img>
                  </figure>
                </div>
                <div className="card-content p-4 is-flex is-flex-direction-column">
                  <div className="content p-4 has-text-weight-normal">
                    <div className="is-size-5">
                      <h3>{product.title}</h3>
                    </div>
                    <p className="is-size-6 has-text-weight-normal is-italic">
                      {product.overview}
                    </p>
                    <p>
                      <span className="has-text-weight-semibold">
                        &emsp; &emsp; Genres:{" "}
                      </span>
                      {product.genres.map((genre) => genre.name).join(', ')}
                    </p>
                    <p>
                      <span className="has-text-weight-semibold">
                        &emsp; &emsp; Runtime:{" "}
                      </span>
                      {product.runtime} minutes
                    </p>
                  </div>
                  <div className="content p-5 has-background-info-light">
                    <div className="columns">
                      <div className="column">
                        <div className="is-size-4">
                          <span className="has-text-weight-semibold">
                            Price:
                          </span>{" "}
                          <span>${product.price.toFixed(2)}</span>
                        </div>
                        <div>
                        <button
                        className="button is-primary is-small"
                        onClick={() => incrementCartItemButtonHandler(product.id)}
                      >
                        <FontAwesomeIcon icon={faAdd} />
                      </button>
                      <input
                        className="input is-small has-text-centered"
                        style={{ width: "6%" }}
                        number
                        value={thisItemInCart}
                        readOnly
                      />
                      <button
                        className="button is-warning is-small"
                        onClick={() => decrementCartItemButtonHandler(product.id)}
                        disabled={buttonDisabled}
                      >
                        <FontAwesomeIcon icon={faSubtract} />
                      </button>
                      <button
                        className="button is-danger is-small"
                        onClick={() => removeAllThisItemButtonHandler(product.id)}
                        disabled={buttonDisabled}
                      >
                        <FontAwesomeIcon icon={faX} />
                      </button>
                          <NavLink to="/">
                            <button className="button is-link is-small">
                            <FontAwesomeIcon icon={faHome} />&nbsp; Home
                            </button>
                          </NavLink>
                          <div>
                          <span className={cartMessageStyle}>
                            {cartMessage}
                          </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="is-size-7"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// data loader
export const productsDetailsLoader = async ({ params }) => {
  const { id } = params;

  const res = await fetch("http://localhost:8080/" + id);

  if (!res.ok) {
    throw Error("Could not find that product.");
  }

  return res.json();
};