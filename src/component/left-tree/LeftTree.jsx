import React from "react";
import { Button, Tree } from "antd";
import * as service from "../../util/service";

class LeftTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clickedTimes: 0,
            userSelectedObjectType: "", // 可能的值为：DATASOURCE, DATABASE, TABLE, FIELD
            treeData: [{
                title: "MYSQL",
                key: "/MYSQL",
                isLeaf: false,
                objectType: "DATASOURCE",
                children: [{}, {}]
            }, {
                title: "ORACLE",
                key: "/ORACLE",
                children: [{}]
            }]
        }
        this.handleClick = this.handleClick.bind(this);
        this.queryDatasourceTypeIntoTreeData = this.queryDatasourceTypeIntoTreeData.bind(this);
        this.queryMySQLDatasourcesIntoTreeData = this.queryMySQLDatasourcesIntoTreeData.bind(this);
        this.onLoadData = this.onLoadData.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.queryDatasourceTypeIntoTreeData();
    };

    handleClick() {
        this.setState({
            clickedTimes: this.state.clickedTimes + 1,
        })
        console.log("entered handleClick() " + this.state.clickedTimes +" time(s)");
        //this.queryDatasourceTypeIntoTreeData();
        this.queryMySQLDatasourcesIntoTreeData();
    };

    queryDatasourceTypeIntoTreeData() {
        service.querySupportedDatasourceTypes().then(response => {
            var supportedDatasourceTypes = response.data.data;
            var treeData = [];
            for (var i = 0; i < supportedDatasourceTypes.length; i++) {
                treeData[i] = {
                    title: supportedDatasourceTypes[i],
                    key: "/" + supportedDatasourceTypes[i],
                    //children: [{}, {}]
                }
            }
            this.setState({
                treeData: treeData
            })
        });
    }
    
    onLoadData() {
        for (let i = 0; i < 1; i++) {

        }
        this.queryMySQLDatasourcesIntoTreeData();
    }

    queryMySQLDatasourcesIntoTreeData() {
        const previousTreeData = this.state.treeData;
        previousTreeData[0].children[0] = {
            title: "child" + this.state.clickedTimes,
            key: "child" + this.state.clickedTimes,
            children: [{}]
        }
        this.setState({
            treeData: previousTreeData,
        });
    }

    onLoadData(treeNode) {
        console.log("treenode = " + JSON.stringify(treeNode));
        return new Promise((resolve) => {
            if (treeNode.children) {
                console.log("Current treeNode has children. Stopping faking.")
                resolve();
                return;
            }
            console.log("Current treeNode has no children. Faking 2.")
            setTimeout(() => {
                treeNode.children = [{
                    title: "hahahaha",
                    key: treeNode.key + "/" + "hahahaha",
                    children: [],
                    isLeaf: false
                },{
                    title: "hehe",
                    key: treeNode.key + "/" + "hehe",
                    children: [],
                    isLeaf: false
                }];
                console.log("Current treeNode has no children. Faked 2.")
                resolve();
            }, 500);

        });
    }

    render () {
        return (
            <div>
                <Button onClick={this.handleClick}>click to query tree roots</Button>
                <Tree 
                    treeData={this.state.treeData} 
                    loadData={this.onLoadData}
                />
            </div>
        )
    }
};
export default LeftTree;