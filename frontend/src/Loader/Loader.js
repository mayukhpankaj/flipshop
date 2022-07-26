//Loader Component upon processing the Request.
import React from "react";
import { Loader, Segment } from "semantic-ui-react";
import "./Loader.css";

const pageLoader = (props) => {
  return (
    <div>
      <link
        async
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
      <Segment id="load">
        <Loader active size={props.size || "massive"} content="Loading..." />
      </Segment>
    </div>
  );
}

export default pageLoader;
