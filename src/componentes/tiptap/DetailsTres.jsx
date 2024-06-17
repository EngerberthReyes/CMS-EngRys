import parse from "html-react-parser";
import stylesInicio from "../../app/CSS/styles-inicio.module.css";

const Details = ({ description }) => {
  return (
    <>
      <section className="ProseMirror">
        <li style={{ fontSize: "22px" }}>{parse(description)}</li>
      </section>
    </>
  );
};

export default Details;
