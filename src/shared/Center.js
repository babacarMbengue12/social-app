import React from "react";
import $ from "jquery";

const width = $(window).width();
const height = $(window).height();
export default function Center({ children, style = {} }) {
  const finalStyle = Object.assign(style, {
    padding: 40,
    backgroundColor: "#f8f9fa",
  });
  return (
    <div
      style={{ width, height, marginTop: 30 }}
      className="d-flex align-items-center justify-content-center"
    >
      <div style={finalStyle}>{children}</div>
    </div>
  );
}
