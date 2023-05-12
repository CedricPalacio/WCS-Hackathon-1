import "./CardTitle.scss";

export default function CardTitle({ title, icon = "geo" }) {
    console.log(icon);
    return (
        <div className="card-title">
            <div className="icon">
                <i className={`bi bi-${icon}`} />
            </div>
            <h2>{title}</h2>
        </div>
    );
}
