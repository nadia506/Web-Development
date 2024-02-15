function Block(props) {
  const { title } = props;
  return (
    <header className="hero is-link">
      <div className="hero-body">
        <p style={divStyle} className="title has-text-centered">
          {title}
        </p>
      </div>
    </header>
  );
}

export default Block;
const divStyle = {
  backgroundColor: "#485fc7",
  textAlign: "center",
  color: "white",
};
