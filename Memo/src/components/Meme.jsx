function Meme(props) {
  const { img, top, bottom } = props;

  return (
    <article className="message is-medium" style={memeStyle}>
      <div className="message-body" id="output">
        <div className="meme">
          <img src={img} style={{ width: "800rem", height: "auto" }} />
          <h2 id="top-text" style={textStyle1}>
            {top}
          </h2>

          <h2 id="bottom-text" style={textStyle2}>
            {bottom}
          </h2>
        </div>
      </div>
    </article>
  );
}
const memeStyle = {
  position: "relative",
  width: "90%",
  margin: "auto",
};

const textStyle1 = {
  position: "absolute",
  width: " 80%",
  textAlign: "center",
  left: "50%",
  transform: "translateX(-50%)",
  margin: "15px 0",
  padding: " 0 5px",
  fontFamily: "impact, sans-serif",
  fontSize: "2em",
  textTransform: "uppercase",
  color: "white",
  letterSpacing: "1px",
  textShadow:
    " 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000,-2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000,2px 2px 5px #000",
  top: "0",
};
const textStyle2 = {
  position: "absolute",
  width: " 80%",
  textAlign: "center",
  left: "50%",
  transform: "translateX(-50%)",
  margin: "15px 0",
  padding: " 0 5px",
  fontFamily: "impact, sans-serif",
  fontSize: "2em",
  textTransform: "uppercase",
  color: "white",
  letterSpacing: "1px",
  textShadow:
    " 2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000,-2px 2px 0 #000, 0 2px 0 #000, 2px 0 0 #000, 0 -2px 0 #000, -2px 0 0 #000,2px 2px 5px #000",
  bottom: "0",
};

export default Meme;
