import logoLaunchCode from "./Logo_LaunchCode.svg";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
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
                About MovieDL
              </a>
            </li>
          </ul>
        </nav>
        <div className="title ml-6">About MovieDL</div>
        <div className="columns is-centered mx-5">
          <div className="column is-7">
            <div
              className="box p-5"
              style={{
                borderStyle: "solid",
                borderColor: "lightgray",
                borderWidth: "1px",
              }}
            >
              <div className="title is-4 p-2">Project Overview</div>
              <div className="content mx-5">
                MovieDL is a web-based e-commerce application in which users can
                search/sort available products ("digital downloads" of movie
                titles), add products to cart, purchase items, "download" those
                purchases and review account history for past purchases. Users
                can register an account, log in, edit profile information, log
                out.
              </div>
              <div className="title is-4">Features</div>
              <div className="content">
                <ul>
                  <li>
                    User registration, login and editable profile page (CRUD
                    functionality)
                  </li>
                  <li>Interaction with TMDB (The Movie Database) API </li>
                  <li>Product browsing & product details pages per product</li>
                  <li>
                    Product search, sort, and filter by one or more genres
                  </li>
                  <li>
                    Shopping cart (add products to cart, remove items from cart,
                    empty cart, proceed to checkout).
                  </li>
                  <li>
                    User checkout and Stripe API payment interface for credit
                    card payments (beta)
                  </li>
                  <li>
                    Chat GPT API integration - chatbot movie recommendations,
                    responses to user questions
                  </li>
                </ul>
              </div>
              <div className="title is-4">Tech Stack, Front End</div>
              <div className="content">
                <ul>
                  <li><Link to="https://react.dev" target="_blank">ReactJS</Link> - JavaScript, JSX, CSS3</li>
                  <li><Link to="https://www.npmjs.com/package/react-router-dom" target="_blank">React Router DOM</Link></li>
                  <li><Link to="https://github.com/pmndrs/zustand" target="_blank">Zustand</Link> state management</li>
                  <li>Styling via <Link to="https://bulma.io" target="_blank">Bulma</Link>, <Link to="https://mui.com" target="_blank">MUI</Link>, <Link to="https://fontawesome.com" target="_blank">FontAwesome Icons</Link></li>
                </ul>
              </div>
              <div className="title is-4">Tech Stack, Back End</div>
              <div className="content">
                <ul>
                  <li><Link to="https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/mvc.html" target="_blank">Spring MVC, via SpringBoot</Link> - Java</li>
                  <li><Link to="https://docs.spring.io/spring-security/reference/index.html" target="_blank">Spring Security</Link></li>
                  <li><Link to="https://jwt.io" target="_blank">Auth0 JWT (JSON Web Tokens)</Link></li>
                  <li><Link to="https://www.mysql.com" target="_blank">MySQL</Link></li>

                </ul>
              </div>
            </div>
          </div>
          <div className="column is-5">
            <div
              className="box p-5 has-text-centered"
              style={{
                borderStyle: "solid",
                borderColor: "lightgray",
                borderWidth: "1px",
              }}
            >
            <Link to="https://www.launchcode.org" target="_blank">
            {logoLaunchCode && <img src={logoLaunchCode} style={{width: '250px'}}/>}</Link>
              <div className="content has-text-centered is-italic">
                MovieDL is a software development project ideated and built as a
                group project in <Link to="https://www.launchcode.org" target="_blank">LaunchCode</Link> "LiftOff" educational program,
                2023/04 - 2023/06.
              </div>
              <div className="has-text-centered" style={{ display: "flex" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12463.52241198916!2d-90.2595139!3d38.6516256!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8b4d4dfb1118d%3A0x46ba750d4f6e9fe1!2sLaunchCode!5e0!3m2!1sen!2sus!4v1682710416782!5m2!1sen!2sus"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
                  height={350}
                  style={{
                    flex: "2 5 auto",
                    borderStyle: "solid",
                    borderColor: "lightgray",
                    borderWidth: "1px",
                    minWidth: '100px'
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}