import {Col, Container, Row} from 'react-bootstrap';
import React from 'react'
import WorkersList from "../Components/workers/WorkersList";
import BackBtn from "./BackBtn";
import AddWorker from "../Components/workers/AddWorker";
import axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.reloadInfo = this.reloadInfo.bind(this);
    }

    async componentDidMount() {
        await this.reloadInfo()
    }

    async reloadInfo() {
        await axios.get('/loadworkerswithcost').then((res) => {
            this.setState({
                data: res.data.sort((worker1, worker2) => worker1.tasks.length < worker2.tasks.length ? 1 : -1) // по количеству заданий
            })
        }).catch(err => console.log(err))
    }


    render() {
        return (
            <div>
                <Container style={{marginTop: '5vh'}} className='wrap'>
                    <BackBtn/>
                    <Row>
                        <Col>
                            <h3>
                                Работники
                            </h3>
                        </Col>
                    </Row>
                    <WorkersList reloadInfo={this.reloadInfo}
                                 data={this.state.data}
                                 setData={async (data) => {
                                     await this.setState({data: data})
                                 }}
                    />
                    <AddWorker reloadInfo={this.reloadInfo}/>
                </Container>
            </div>
        );
    }
}

export default App;