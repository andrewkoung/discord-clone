import React from "react";
import { withFirebase } from "../../Firebase";

function Home({ firebase }) { 
    return (
        <p>Home</p>
    )
}

export default withFirebase(Home);