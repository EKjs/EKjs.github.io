import { Instagram,Facebook,Twitter } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="container border-top mt-5">
            
        <footer className="pt-5 d-none d-sm-block">
        <div className="row">
          <div className="col-2">
            <h5>Buy</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Help</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Buyer FAQs</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Useful info</Link></li>
            </ul>
          </div>
    
          <div className="col-2">
            <h5>Sell</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Register</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Seller FAQs</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Features</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Pricing</Link></li>
            </ul>
          </div>
    
          <div className="col-2">
            <h5>About Ibuyit!</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Contact Us</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">News</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Legal & Privacy information</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">FAQs</Link></li>
              <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">About us</Link></li>
            </ul>
          </div>
    
          <div className="col-4 offset-1">
            <form>
              <h5>Subscribe to our newsletter</h5>
              <p>Monthly digest of whats new and exciting from us.</p>
              <div className="d-flex w-100 gap-2">
                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                <input id="newsletter1" type="text" className="form-control" placeholder="Email address"/>
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
    
        <div className="d-flex justify-content-between pt-4 mt-4 border-top">
          <p>&copy; 2021 Company, Inc. All rights reserved.</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3"><Link className="link-dark" href="/"><svg className="bi" width="24" height="24"><Twitter/></svg></Link></li>
            <li className="ms-3"><Link className="link-dark" href="/"><svg className="bi" width="24" height="24"><Instagram/></svg></Link></li>
            <li className="ms-3"><Link className="link-dark" href="/"><svg className="bi" width="24" height="24"><Facebook/></svg></Link></li>
          </ul>
        </div>
      </footer></div>
    )
}

export default Footer
