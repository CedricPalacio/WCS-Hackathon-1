import "./IconsLinks.scss";

export default function IconsLinks() {
    return (
        <div className="icons-links">
            <ul>
                <li>
                    <a href="#booking">
                        <div className="icon">
                            <i className="bi bi-shop-window" />
                        </div>
                        <p>Où dormir</p>
                    </a>
                </li>
                <li>
                    <a href="#events">
                        <div className="icon">
                            <i className="bi bi-ticket" />
                        </div>
                        <p>À découvrir</p>
                    </a>
                </li>
                <li>
                    <a href="#map">
                        <div className="icon">
                            <i className="bi bi-pin-map" />
                        </div>
                        <p>S'y rendre</p>
                    </a>
                </li>
                <li>
                    <a href="#weather">
                        <div className="icon">
                            <i className="bi bi-cloud-sun" />
                        </div>
                        <p>La météo</p>
                    </a>
                </li>
            </ul>
        </div>
    );
}
