export default function Loading() {
  return (
    <div style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontSize: "20px"
    }}>
      <div className="spinner" />
      <p>Processing documents… extracting fields… running fraud checks…</p>
    </div>
  );
}
