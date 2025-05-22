import Header from "../home/Header";

function OtherPage({ path }) {
  return (
    <div style={{ height: "100vh" }}>
      <Header activeMenuHref={path} />

      <h3 style={{ paddingTop: "80px" }}>Hello {path ? path : "Index"}</h3>
    </div>
  );
}

export default OtherPage;
