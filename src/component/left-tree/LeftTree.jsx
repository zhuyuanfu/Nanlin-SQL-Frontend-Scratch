import React from "react";
import { Button } from "antd";
import { querySupportedDatasourceTypes } from "../../service/service";

class LeftTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clickedTimes: 0,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            clickedTimes: this.state.clickedTimes + 1,
        })
        console.log("entered handleClick() " + this.state.clickedTimes +" time(s)");
        querySupportedDatasourceTypes().then((response) => {
            console.log(response);
        }).catch((error) =>{
            console.log(error);
        });
    }

    render () {
        return (
            <div>
                <div display="block">place left tree</div>
                <Button onClick={this.handleClick}>click to start a query</Button>
            </div>
        )
    }
};
export default LeftTree;