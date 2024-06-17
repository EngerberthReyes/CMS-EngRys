import parse from "html-react-parser";
import stylesInicio from "../../app/CSS/styles-inicio.module.css";

const Details = ({ description }) => {
  return (
    <>
      <section className="ProseMirror">
        <p
          className={stylesInicio.tituloSeccion}
          style={{ fontSize: "19px", textAlign: "center" }}
        >
          {parse(description)}
        </p>
      </section>
    </>
  );
};

export default Details;
