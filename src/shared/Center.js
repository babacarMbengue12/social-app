import React from "react";
import $ from "jquery";

const width = $(window).width();
const height = $(window).height();
export default function Center({ children, style = {} }) {
  const finalStyle = Object.assign(style, {
    padding: 40,
    backgroundColor: "#f8f9fa",
    borderRadius: 30,
  });
  return (
    <div
      style={{ width, height, marginTop: 40 }}
      className="d-flex align-items-center justify-content-center"
    >
      <div style={finalStyle}>{children}</div>
    </div>
  );
}
