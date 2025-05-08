function Languages(props) {
  return (
    <>
      {props.languagesArray.map((lang, i) => (
        <span className="language" style={lang} key={i}>
          {lang.name}
          {lang.isError && <span className="error"></span>}
          {lang.isError && <span className="skull">💀</span>}
        </span>
      ))}
    </>
  );
}

export default Languages;
