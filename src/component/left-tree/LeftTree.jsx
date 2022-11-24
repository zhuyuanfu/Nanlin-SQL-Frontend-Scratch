import React from "react";
import { Button, Tree } from "antd";
import * as service from "../../util/service";

class LeftTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clickedTimes: 0,
            userSelectedObjectType: "", // 可能的值为：DATASOURCE, DATABASE, TABLE, FIELD
        }
        this.handleClick = this.handleClick.bind(this);
        this.queryDatasourceTypeIntoTreeData = this.queryDatasourceTypeIntoTreeData.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.queryDatasourceTypeIntoTreeData();
    };

    handleClick() {
        this.setState({
            clickedTimes: this.state.clickedTimes + 1,
        })
        console.log("entered handleClick() " + this.state.clickedTimes +" time(s)");
        this.queryDatasourceTypeIntoTreeData();
    };

    queryDatasourceTypeIntoTreeData() {
        service.querySupportedDatasourceTypes().then(response => {
            var supportedDatasourceTypes = response.data.data;
            var treeData = [];
            for (var i = 0; i < supportedDatasourceTypes.length; i++) {
                treeData[i] = {
                    title: supportedDatasourceTypes[i],
                    key: "/" + supportedDatasourceTypes[i],
                    children: [{}, {}]
                }
            }
            this.setState({
                treeData: treeData
            })
        });
    }

    render () {
        return (
            <div>
                <Button onClick={this.handleClick}>click to query tree roots</Button>
                <Tree 
                    treeData={this.state.treeData} 
                />
            </div>
        )
    }
};
export default LeftTree;