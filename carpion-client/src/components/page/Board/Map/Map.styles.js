export const container = {
  padding: "20px",
  marginTop: "100px", // 상단 마진 100px 추가
  display: "flex", // flexbox를 사용하여 중앙 정렬
  justifyContent: "center", // 수평 중앙 정렬
  alignItems: "center", // 수직 중앙 정렬
  flexDirection: "column", // 세로 방향으로 배치
  height: "100vh", // 화면의 100% 높이를 차지하도록 설정
};

export const mapBox = {
  position: "relative",
  display: "flex", // flexbox로 구성
  justifyContent: "center", // 수평 중앙 정렬
  alignItems: "center", // 수직 중앙 정렬
};

export const mapStyle = {
  width: "1200px",
  height: "800px",
  borderRadius: "16px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
};

export const comboWrapper = {
  marginBottom: "10px",
};

export const selectBox = {
  padding: "6px",
  fontSize: "16px",
};

export const selectBoxWithMargin = {
  ...selectBox,
  marginRight: "10px",
};

export const zoomControl = {
  position: "absolute",
  top: "100px",
  left: "20px",
  background: "#ffffffee",
  padding: "8px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  zIndex: 10,
  width: "40px",
};

export const zoomButton = {
  fontSize: "16px",
  width: "100%",
  padding: "4px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  background: "#f0f0f0",
  cursor: "pointer",
};

export const zoomSlider = {
  writingMode: "bt-lr",
  WebkitAppearance: "slider-vertical",
  height: "300px",
  width: "4px",
  cursor: "pointer",
};

export const zoomLevelText = {
  fontSize: "12px",
  color: "#666",
};

export const regionButton = {
  padding: "6px 12px",
  fontSize: "14px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  background: "#f9f9f9",
  cursor: "pointer",
};

export const activeRegion = {
  background: "#4a90e2",
  color: "#fff",
  fontWeight: "bold",
};
