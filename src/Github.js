import React from "react";
import {Chart} from 'primereact/chart';
import { Button } from "@material-ui/core";

const button = { margin: '10px', fontSize:'15px' }
// const chart = { width: 'calc(100vw-20px)' }

const chart = { minWidth:'400px' }

export default class Github extends React.Component {

    render() {
        const data = {
            datasets: [{
                data: [
                    6,
                    4,
                    3,
                    2,
                    4
                ],
                backgroundColor: [
                    "#1C77C3",
                    "#F39237",
                    "#D63230",
                    "#344055",
                    "#888098"
                ],
                label: 'My dataset'
            }],
            labels: [
                "Javascript",
                "Java",
                "SQL",
                "C#",
                "Python"
            ]
        };

        return (
            <div>
                <Button style={button} variant="outlined" color="primary" href="https://github.com/tdmiller1" target="#">GitHub Account</Button>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Programming Language Familiarity</h1>
                        <p>Polar area charts are similar to pie charts, but each segment has the same angle - the radius of the segment differs depending on the value.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <Chart style={chart} type="polarArea" data={data} />
                </div>
            </div>
        )
    }
    
}
