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
                    5,
                    4,
                    3
                ],
                backgroundColor: [
                    "#1C77C3",
                    "#D63230",
                    "#344055",
                    "#943DC0",
                ],
                label: 'My dataset'
            }],
            labels: [
                "Javascript",
                "React",
                "Ruby/Rails",
                "Python",
            ]
        };

        return (
            <div>
                <Button style={button} variant="outlined" color="primary" href="https://github.com/tdmiller1" target="#">GitHub Account</Button>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Programming Languages / Frameworks</h1>
                    </div>
                </div>

                <div className="content-section implementation">
                    <Chart style={chart} type="polarArea" data={data} />
                </div>
            </div>
        )
    }

}
