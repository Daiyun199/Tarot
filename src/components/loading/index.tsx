import ReactLoading from "react-loading";
function LoadingSniper() {
  return (
    <div
      style={{
        margin: "0 auto",
      }}
    >
      <ReactLoading type="spin" color="#000" height={100} width={100} />
    </div>
  );
}

export default LoadingSniper;
