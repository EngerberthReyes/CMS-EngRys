import parse from "html-react-parser";

const Details = ({ description }) => {
  return (
    <>
      <section className="ProseMirror">{parse(description)}</section>
    </>
  );
};

export default Details;
