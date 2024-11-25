import React, { useState, useEffect, useLayoutEffect } from "react";

function App() {
  const [htmlContent, setHtmlContent] = useState("");
  const [cssContent, setCssContent] = useState("");

  useEffect(() => {
    // Fetch the saved configuration from the API
    fetch("http://localhost:3000/configuration")
      .then((response) => response.json())
      .then((data) => {
        // Strip out the <body> tag from the saved HTML
        const strippedHtml = data.html
          .replace(/<body[^>]*>/, "")
          .replace(/<\/body>/, "");
        setHtmlContent(strippedHtml);
        setCssContent(data.css || "");
      })
      .catch((error) => alert("Error loading configuration:", error));
  }, []);

  useLayoutEffect(() => {
    // Inject Tailwind CSS into the head of the document
    const tailwindStyles = document.createElement("link");
    tailwindStyles.rel = "stylesheet";
    tailwindStyles.href =
      "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
    document.head.appendChild(tailwindStyles);
  }, []);

  return (
    <div className="App">
      {/* Inject the dynamic HTML content */}
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      ></div>

      {/* Inject dynamic CSS */}
      <style>{cssContent}</style>
    </div>
  );
}

export default App;
