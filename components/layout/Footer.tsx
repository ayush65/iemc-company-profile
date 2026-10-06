import { site, navLinks } from "@/data/site";
import { Icon } from "@/components/ui/Icon";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <a href="#hero" className="brand" aria-label="IEMC India — home">
              <span className="brand__mark" aria-hidden="true">
                <span className="brand__mark-letter">IE</span>
              </span>
              <span className="brand__text">
                <span className="brand__name">IEMC INDIA</span>
                <span className="brand__sub">PVT. LTD.</span>
              </span>
            </a>
            <p className="site-footer__statement">
              Engineering high-precision industrial systems, automation
              machinery, and IoT infrastructure — built in Hosur, deployed
              worldwide.
            </p>
            <div className="site-footer__certs">
              {["ISO 9001:2015", "ISO 14001", "ASME", "CE"].map((c) => (
                <span className="cert-chip" key={c}>
                  <Icon name="check" size={12} /> {c}
                </span>
              ))}
            </div>
          </div>

          <div className="site-footer__cols">
            <div className="site-footer__col">
              <h3 className="site-footer__heading">Navigate</h3>
              <ul>
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
            <div className="site-footer__col">
              <h3 className="site-footer__heading">Systems</h3>
              <ul>
                <li>
                  <a href="#products">Neeri-Sense</a>
                </li>
                <li>
                  <a href="#products">Flow Metering</a>
                </li>
                <li>
                  <a href="#products">IoT Gateway Hub</a>
                </li>
                <li>
                  <a href="#contact">Custom Engineering</a>
                </li>
              </ul>
            </div>
            <div className="site-footer__col">
              <h3 className="site-footer__heading">Contact</h3>
              <ul className="site-footer__contact">
                <li>
                  <Icon name="location" size={16} />
                  <span>{site.address}</span>
                </li>
                <li>
                  <Icon name="mail" size={16} />
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <Icon name="phone" size={16} />
                  <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            &copy; {new Date().getFullYear()} {site.name} All rights reserved.
          </p>
          <p className="site-footer__tag">{site.tagline}</p>
        </div>

        <div className="site-footer__wordmark" aria-hidden="true">
          IEMC
        </div>
      </div>
    </footer>
  );
}
