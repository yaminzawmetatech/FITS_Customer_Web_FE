export const YesNoRenderer = (params) => {
    const isYes = params.value === 1 || params.value === 'YES';
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ color: isYes ? "green" : "red" }}>
          {isYes ? "YES" : "NO"}
        </span>
      </div>
    );
  };
  