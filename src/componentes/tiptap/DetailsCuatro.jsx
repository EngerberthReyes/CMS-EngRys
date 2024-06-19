import parse from "html-react-parser";
import stylesInicio from "../../app/CSS/styles-inicio.module.css";

const DetailsCuatro = ({ description }) => {
  return (
    <>
      <section className="ProseMirror">
        <p
          className={stylesInicio.tituloSeccion}
          style={{ fontSize: "19px" }}
        >
          {parse(description)}
        </p>
      </section>
    </>
  );
};

export default DetailsCuatro;
