import {Container, Spinner} from 'react-bootstrap';
import React from 'react'
import axios from "axios";
import Chart from "react-google-charts";
import BackBtn from "./BackBtn";


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            dataFree: [],
            showFree: false
        }
        this.CreateDataForTimeline = this.CreateDataForTimeline.bind(this);
        this.style = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
        }
    }

    async componentDidMount() {
        await this.CreateDataForTimeline()
    }

    async CreateDataForTimeline() {
        axios.get('/getworkerstasks').then(res => {
            let dataFree = [
                [
                    { type: 'string', id: 'Position' },
                    { type: 'string', id: 'Name' },
                    { type: 'date', id: 'Start' },
                    { type: 'date', id: 'End' },
                ]
            ]
            let data = [...dataFree]

            res.data.forEach((worker,ind)=>{
                worker.tasks.forEach(task=>{
                    if(worker.name !== 'Свободно'){
                        data.push(
                            [
                                worker.name,
                                task.task,
                                new Date(task.StartTime),
                                new Date(task.EndTime),
                            ]
                        )
                    }
                    dataFree.push(
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
                dataFree: dataFree,
                data: data
            })
        })
    }

    render() {
        return (
            <div>
                <Container className='wrap mt-5'>
                    <BackBtn/>
                    <div style={this.style}>
                        <Container>
                            <div>
                                <strong>
                                    Показать свободные
                                </strong>
                                <br/>
                                <input type='checkbox' onClick={()=> this.setState({showFree: !this.state.showFree})}/>
                            </div>
                            {
                                this.state.showFree?
                                    <Chart
                                        style={{
                                            marginTop: "5vh"
                                        }}
                                        chartType="Timeline"
                                        loader={<Spinner animation={"grow"} className='mt-5'/>}
                                        data={this.state.dataFree}
                                        rootProps={{'data-testid': '1'}}
                                    />
                                    :
                                    <Chart
                                        style={{
                                            marginTop: "5vh"
                                        }}
                                        chartType="Timeline"
                                        loader={<Spinner animation={"grow"} className='mt-5'/>}
                                        data={this.state.data}
                                        rootProps={{'data-testid': '1'}}
                                    />
                            }
                        </Container>
                    </div>
                </Container>
            </div>
        );
    }
}

export default App;