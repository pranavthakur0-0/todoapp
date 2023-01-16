import './Homeleft.css'
import Logo from "./images/Noddy.svg"
import Home from "./images/home.svg"

function Homeleft() {
  return (
    <>
      <div className="left-div-alpha">
      <div className="alhpa-logo">
        <div className="alpha-logo-img">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="alpha-logo-name">Noddy</div>
      </div>

      <div className="alhpa-links">
          <div className="alhpa-links-con">
            <img src={Home} alt="home-icon" />
              <span>Home</span>
          </div>
         

      </div>
    </div>
    </>
  );
}

export default Homeleft;
