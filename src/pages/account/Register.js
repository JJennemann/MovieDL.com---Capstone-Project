import { useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faSignature } from "@fortawesome/free-solid-svg-icons";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import logo125 from "../../logos/Logo_MovieDL_20230426_125x22.png";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pwd: "",
    verifyPwd: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    streetAddress: "",
    suite: "",
    city: "",
    state: "",
    zipCode: "",
    role: "user",
  });
  const saveFormData = async () => {
    const response = await fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (response.status !== 201) {
      throw new Error(`Request failed: ${response.status}`);
    }
  };

  const handleChange = (e) => {
    var value = e.target.value === "" ? null : e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (values.pwd !== values.verifyPwd) {
      alert("Passwords do NOT match!");
    } else {
      try {
        await saveFormData();
        alert("Your registration was successfully submitted!");
        navigate("/");
      } catch (e) {
        alert(`Registration failed! ${e.message}`);
      }
    }
  };

  const cancelRegistration = () => {
    setValues({
      email: "",
      pwd: "",
      verifyPwd: "",
      firstName: "",
      lastName: "",
      mobileNumber: "",
      streetAddress: "",
      suite: "",
      city: "",
      state: "",
      zipCode: "",
    });
    navigate("/");
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelRegistration = () => {
    setOpen(false);
    navigate("/");
  };

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
              Register
            </a>
          </li>
        </ul>
      </nav>
      <div className="columns is-centered">
        <div className="column is-7 mx-6">
          <form
            className="box px-6 pb-6"
            style={{
              borderStyle: "solid",
              borderColor: "lightgray",
              borderWidth: "1px",
            }}
            onSubmit={onSubmit}
          >
            <div className="title is-3 mt-5 has-text-weight-semibold">
              Register
            </div>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label">E-mail</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. alex@example.com"
                      name="email"
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left">
                    <input
                      name="pwd"
                      className="input"
                      type="password"
                      value={values.pwd}
                      onChange={handleChange}
                      required
                      placeholder="********"
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="column is-half">
                <div className="field">
                  <label className="label">Verify Password</label>
                  <div className="control has-icons-left">
                    <input
                      name="verifyPwd"
                      className="input"
                      type="password"
                      value={values.verifyPwd}
                      onChange={handleChange}
                      required
                      placeholder="********"
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <label className="label">First Name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={values.firstName}
                      onChange={handleChange}
                      required
                      name="firstName"
                    />
                  </div>
                </div>
              </div>
              <div className="column is-half">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={values.lastName}
                    onChange={handleChange}
                    required
                    name="lastName"
                  />
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-half">
                <label className="label">Mobile Number</label>
                <div className="control has-icons-left">
                  <input
                    className="input"
                    type="tel"
                    name="mobileNumber"
                    value={values.mobileNumber}
                    onChange={handleChange}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required
                    placeholder="555-555-5555"
                  />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <label className="label">Street Address</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      type="text"
                      value={values.streetAddress}
                      onChange={handleChange}
                      required
                      name="streetAddress"
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon={faAddressBook} />
                    </span>
                  </div>
                </div>
              </div>
              <div className="column is-half">
                <div className="field">
                  <label className="label">Suite/Apt. Number</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={values.suite}
                      onChange={handleChange}
                      name="suite"
                      placeholder="(optional)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="column is-half">
                <div className="field">
                  <label className="label">City</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={values.city}
                      onChange={handleChange}
                      required
                      name="city"
                    />
                  </div>
                </div>
              </div>
              <div className="column is-one-quarter">
                <div className="field">
                  <label className="label">State</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={values.state}
                      onChange={handleChange}
                      required
                      name="state"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="column is-one-quarter">
                <label className="label">State</label>
                <div class="field has-addons">
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select name="state" required onChange={handleChange}>
                        <option selected="default">---</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arksansas</option>
                        <option value="AS">American Samoa</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="GU">Guam</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="MP">Northern Mariana Islands</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="TT">Trust Territories</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="VI">Virgin Islands</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="column is-one-quarter">
                <div className="field">
                  <label className="label">Zip</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      value={values.zipCode}
                      onChange={handleChange}
                      name="zipCode"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  type="submit"
                  className="button is-primary has-text-weight-semibold"
                >
                  Register
                </button>
              </div>
              <div className="control">
                <button
                  type="button"
                  className="button is-secondary is-light"
                  onClick={handleOpen}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <img className="mt-4" src={logo125} width="112" height="28" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <span className="has-text-weight-semibold">
                Cancel registration?
              </span>{" "}
              All fields will be cleared.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              className="button is-warning"
              onClick={handleCancelRegistration}
            >
              Yes
            </button>
            <button
              className="button is-primary m-2"
              onClick={handleClose}
              autoFocus
            >
              No
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}