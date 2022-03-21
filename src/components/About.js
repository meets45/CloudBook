import React from "react";

const About = () => {
  //About Page of CloudBook
  return (
    <>
      <h1 className="my-3">About CloudBook</h1>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <strong>Secure and Easily accessable!</strong>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            // style={myStyle}

            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              CloudBook&trade; is a Notes creating app. The notes are stored on
              cloud server so they are safe and secure. User can SignUp and
              create thier account and they could access thier created notes
              from anywhere in the world through Internet{" "}
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              // style={myStyle}

              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <strong>Free to use</strong>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            // style={myStyle}

            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              CloudBook is a free notes creating tool that provides user the
              functionality to create notes securely, It is useful beacuse notes
              can be accessible from anywhere in the world through your account.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              // style={myStyle}
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <strong>Browser Compatibility</strong>
            </button>
          </h2>
          <div
            id="collapseThree"
            // style={myStyle}
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              CloudBook works in any browser, be it chrome, safari, internet
              explorer, firefox or edge. It also works in mobile devices
              beautifully as it is a responsive web app.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
