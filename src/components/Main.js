import React, { Component, useRef } from "react";
import Identicon from "identicon.js";

const Main = ({ captureFile, uploadImage, images }) => {
  let inputRef = useRef(null);
  console.log("images=", images);
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "500px" }}
        >
          <div className="content mr-auto ml-auto">
            <p>&nbsp;</p>
            <h2>Share Image</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const description = inputRef.current.value.toString();

                uploadImage(description);
              }}
            >
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .bmp, .gif .webp"
                onChange={captureFile}
              />
              <div className="form-group mr-sm-2">
                <br></br>
                <input
                  id="imageDescription"
                  type="text"
                  ref={inputRef}
                  className="form-control"
                  placeholder="Image description..."
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-lg"
              >
                Upload!
              </button>
            </form>

            <p>&nbsp;</p>

            {images.map((image, key) => {
              // console.log("inside loop=", image);
              return (
                <div className="card mb-4" key={key}>
                  <div className="card-header">
                    <img
                      className="mr-2"
                      width="30"
                      height="30"
                      src={`data:image/png;base64,${new Identicon(
                        image.author,
                        30
                      ).toString()}`}
                    />
                    <small className="text-muted">{image.author}</small>
                  </div>
                  <ul id="imageList" className="list-group list-group-flush">
                    <li className="list-group-item">
                      <p className="text-center">
                        <img
                          src={`https://ipfs.infura.io/ipfs/${image.hash}`}
                          style={{ width: "400px", height: "200px" }}
                        />
                      </p>
                      <p>{image.description}</p>
                    </li>
                    <li key={key} className="list-group-item py-2">
                      <small className="float-left mt-1 text-muted">
                        TIPS:{" "}
                        {window.web3.utils.fromWei(
                          image.tipAmount.toString(),
                          "Ether"
                        )}{" "}
                        ETH
                      </small>
                      <button
                        className="btn btn-link btn-sm float-right pt-0"
                        name={image.id}
                        onClick={(event) => {
                          let tipAmount = window.web3.utils.toWei(
                            "0.1",
                            "Ether"
                          );
                          console.log(event.target.name, tipAmount);
                          // tipImageOwner(event.target.name, tipAmount);
                        }}
                      >
                        TIP 0.1 ETH
                      </button>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;
