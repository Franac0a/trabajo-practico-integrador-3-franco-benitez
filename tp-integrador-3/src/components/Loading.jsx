export const Loading = () => {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75 z-3">
      <div
        className="bg-warning p-4 rounded shadow-lg border border-dark position-relative overflow-hidden"
        style={{ width: "22rem" }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            opacity: 0.2,
            backgroundImage:
              "linear-gradient(45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent)",
            backgroundSize: "20px 20px",
            animation: "pulseStripes 1.5s infinite linear",
          }}
        ></div>

        <h1 className="fs-2 fw-bold text-dark text-center position-relative">
          <span
            className="d-inline-block"
            style={{ animation: "pulse 1s infinite" }}
          >
            ⏳ CARGANDO...
          </span>
        </h1>

        <p className="text-center text-dark small position-relative">
          Ajustando píxeles y cargando datos
        </p>

        <div className="progress mt-4 position-relative">
          <div
            className="progress-bar bg-warning"
            style={{
              width: "100%",
              animation: "progress 1.5s infinite ease-in-out",
            }}
          ></div>
        </div>

        <style>{`
          @keyframes progress {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          @keyframes pulseStripes {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.1; }
          }
        `}</style>
      </div>
    </div>
  );
};
