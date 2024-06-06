import "../CSSComponentes/loading.css";

const Loading = () => {
  return (
    <>
      <section
        style={{
          display: "flex",
          columnGap: "1rem",
          margin: "2rem 0",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <section class="ytp-spinner" data-layer="4">
          <section>
            <section class="ytp-spinner-container">
              <section class="ytp-spinner-rotator">
                <section class="ytp-spinner-left">
                  <section class="ytp-spinner-circle"></section>
                </section>
                <section class="ytp-spinner-right">
                  <section class="ytp-spinner-circle"></section>
                </section>
              </section>
            </section>
          </section>
        </section>
        <p style={{ fontSize: "20px", margin: "0", color: "#ed143d" }}>
          Capturando la Imagen del Sitio Web...
        </p>
      </section>
    </>
  );
};

export default Loading;
