function Button(props) {
  const { click } = props;
  return (
    <div className="field has-addons">
      <div className="control is-expanded">
        <button
          className="button is-link is-large is-fullwidth"
          id="go-btn"
          onClick={click}
        >
          Go!
        </button>
      </div>
    </div>
  );
}

export default Button;
