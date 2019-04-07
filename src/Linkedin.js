import React from "react";
import { Button,Typography } from "@material-ui/core";

const button = { margin: '10px', fontSize:'15px' }

export default class LinkedIn extends React.Component {

    render() {
        return (
            <div>
                <Typography variant="h3">Connect with me on LinkedIn!</Typography>
                <Button style={button} color="primary" href="https://linkedin.com/in/tuckermiller7" target="#" variant="outlined">LinkedIn Account</Button>
            </div>
        )
    }
    
}
