function Footer({ darkMode }) {
  return (
    <footer
      className={`text-center mt-5 mb-3 ${
        darkMode ? "text-light" : "text-muted"
      }`}
    >
      <hr />

      <h6>📚 Digital Library Management System</h6>

      <p>
        Built with ❤️ using <strong>React</strong>,
        {" "} <strong>Spring Boot</strong> and{" "}
        <strong>MySQL</strong>
      </p>

      <small>© 2026 Roshni. All Rights Reserved.</small>
    </footer>
  );
}

export default Footer;