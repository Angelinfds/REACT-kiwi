import { Link } from "react-router";

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for doesn't exist.</p>
      <Link to="/" style={{
        color: "#007bff",
        textDecoration: "none",
        fontSize: "1.1rem",
        fontWeight: "bold"
      }}>
        ← Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;