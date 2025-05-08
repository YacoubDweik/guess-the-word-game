function Keyboard(props) {
  return (
    <>
      {props.buttons.map((obj) => (
        <button
          key={obj.value}
          className={`keyboard__button ${obj.status}`}
          onClick={() => props.handleClick(obj.value)}>
          {obj.value.toUpperCase()}
        </button>
      ))}
    </>
  );
}

export default Keyboard;
