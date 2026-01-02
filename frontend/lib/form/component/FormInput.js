const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div style={{ marginBottom: "16px" }}>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "8px",
          border: error ? "1px solid red" : "1px solid #ccc",
          borderRadius: "10px",
          outline: "none",
        }}
      />

      {error && (
        <p style={{ color: "red", fontSize: "12px" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
