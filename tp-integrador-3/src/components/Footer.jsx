export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-light text-center py-3 border-top fixed-bottom w-100">
      <div className="container">
        <p className="mb-1">
          © {year} | Desarrollado por{" "}
          <span className="fw-semibold">Benitez Franco Miguel</span>
        </p>
        <p className="text-muted mb-0">Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
