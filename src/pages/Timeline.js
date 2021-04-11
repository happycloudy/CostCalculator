import {Container} from 'react-bootstrap';
import React from 'react'
import axios from "axios";
import Chart from "react-google-charts";


class App extends React.Component {
    constructor() {
        super();
        this.state = {}
        this.CreateDataForTimeline = this.CreateDataForTimeline.bind(this);
    }

    async componentDidMount() {
        await this.CreateDataForTimeline()
    }

    async CreateDataForTimeline() {
        axios.get('http://c3.team21.ru:8083/getworkerstasks').then(res => {
            let data = [
                [
                    { type: 'string', id: 'Position' },
                    { type: 'string', id: 'Name' },
                    { type: 'date', id: 'Start' },
                    { type: 'date', id: 'End' },
                ]
            ]
            res.data.forEach((worker,ind)=>{
                worker.tasks.forEach(task=>{
                    data.push(
                        [
                            worker.name,
                            task.task,
                            new Date(task.StartTime),
                            new Date(task.EndTime),
                        ]
                    )

                })
            })

            this.setState({
                data: data
            })
        })
    }

    render() {
        return (
            <div className="App">
                <Container>
                    <Chart
                        style={{
                            marginTop: "5vh",
                            width: "100%",
                            height: "400px"
                        }}
                        chartType="Timeline"
                        loader={<div>Loading Chart</div>}
                        data={this.state.data}
                        rootProps={{'data-testid': '1'}}
                    />
                </Container>
            </div>
        );
    }
}

export default App;