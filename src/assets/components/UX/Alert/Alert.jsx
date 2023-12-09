 const Alert = (props) => {
  
  return (
    <div className={`toast position-fixed ${props.isVisible ? 'show' : 'hide' } ${props.type}`}>
      <div className="toast-content">
        {props.type === "success" ? (
          <i className="fas fa-solid fa-check check"></i>
        ) : (
          <i className="fa-solid fa-xmark"></i>
        )}
        <div className="message">
          <span className="text text-1">
            {props.type === "success" ? "Success" : "Error"}
          </span>
          <span className={`text text-2 ${props.type === "error" ? "mt-1" : ""}`}>
            {props.message}
          </span>
        </div>
      </div>
      <div className={`progress ${props.isVisible ? 'active' : '' }`}></div>
    </div>
  );
};

export default Alert