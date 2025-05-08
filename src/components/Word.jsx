function Word(props) {
  return (
    <>
      {props.word.map((obj, i) => (
        <div className="word__letter" key={i}>
          {obj.status != "unset" && <span className={`${obj.status}`}>{obj.value.toUpperCase()}</span>}
        </div>
      ))}
    </>
  );
}

export default Word;
