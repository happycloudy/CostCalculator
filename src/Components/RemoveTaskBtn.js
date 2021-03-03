import {Button} from 'react-bootstrap'
import React from 'react'
import axios from 'axios'

export default class RemoveTaskBtn extends React.Component{
    constructor(props){
        super(props)
        this.RemoveTask = this.RemoveTask.bind(this)
        this.state = {isExists: true}
    }


    RemoveTask(task,isExists){
        axios.post('/removetask',task)
            .then((res) => {
                console.log("Удалено");
            })
            .catch((err) => console.log(err))
        this.setState({isExists: !isExists}) 
        console.log(isExists);
    }

    render(){
        const isExists = this.state.isExists 
        return (
            <div>
                {
                    isExists?
                    <Button onClick={() => this.RemoveTask(this.props.task, this.state.isExists)} className="btn" size="sm" style={{ float: 'right' }}>
                        Удалить
                    </Button>:
                    <Button className="btn" size="sm" style={{ float: 'right' }} disabled>
                        Удалено
                    </Button>
                }
            </div>
        )
    }
}


