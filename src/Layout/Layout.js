import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
//this file is "./src/Layout/index.js" in Qualified

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <NotFound />
      </div>
    </div>
  );
}

export default Layout;
