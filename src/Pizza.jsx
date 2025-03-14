const Pizza = (props) => {
  // Default image if none is provided
  const defaultImage =
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80";

  return (
    <div className="pizza">
      <div className="pizza-image-container">
        <img
          src={props.image || defaultImage}
          alt={props.name}
          className="pizza-image"
        />
        {props.category && (
          <span className="pizza-category">{props.category}</span>
        )}
      </div>
      <div className="pizza-details">
        <h1 className="pizza-name">{props.name}</h1>
        {props.description && (
          <p className="pizza-description">{props.description}</p>
        )}
      </div>
    </div>
  );
};

export default Pizza;
