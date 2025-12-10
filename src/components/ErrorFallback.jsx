const ErrorFallback = ({ error }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Something went wrong</h2>
      <p style={{ color: "red" }}>{error.message}</p>
    </div>
  );
};

export default ErrorFallback;
