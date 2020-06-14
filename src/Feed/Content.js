import React from "react";

export default function Content({ content }) {
  return <p dangerouslySetInnerHTML={{ __html: content }} />;
}
