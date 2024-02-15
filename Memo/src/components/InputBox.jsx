function InputBox(props) {
  const { title, setText } = props;
  return (
    <div className="field has-addons">
      <div className="control is-expanded">
        <input
          onChange={(event) => setText(event.target.value)}
          className="input is-large is-fullwidth is-family-monospace"
          type="text"
          placeholder={title}
          style={{ fontFamily: "impact, sans-serif" }}
        ></input>
      </div>
    </div>
  );
}

export default InputBox;
