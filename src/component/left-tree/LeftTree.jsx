import React from "react";
import { Button, Tree } from "antd";
import * as service from "../../util/service";

class LeftTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clickedTimes: 0,
            userSelectedObjectType: "", // 可能的值为：DATASOURCE, DATABASE, TABLE, FIELD
            userSelectedObjectPath: "",
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
        this.queryDatasourceTypeIntoTreeData = this.queryDatasourceTypeIntoTreeData.bind(this);
        this.onLoadData = this.onLoadData.bind(this);
        this.creatUpdatedTreeNodes = this.creatUpdatedTreeNodes.bind(this);
    }

    UNSAFE_componentWillMount() {
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
                    //children: [{}, {}]
                }
            }
            this.setState({
                treeData: treeData
            })
        });
    }

    /**
     * 传入：【许多树】、【被展开的Node的key】和【子节点】
     * 返回：【许多树】，其中被展开的Node的chidren被替换成了入参里的【子节点】
     * 
     * nodeList: TreeNode[]
     * key: String
     * children: TreeNode[]
     */
    creatUpdatedTreeNodes(nodeList, key, children) {
        return nodeList.map((node) => {
            if (node.key === key) {
              return {
                ...node,
                children,
              };
            }
            if (node.children) {
              return {
                ...node,
                children: this.creatUpdatedTreeNodes(node.children, key, children),
              };
            }
            return node;
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
                let newChildren = [{
                    title: "haha",
                    key: treeNode.key + "/" + "haha",
                    //children: [],
                    isLeaf: false
                },{
                    title: "hehe",
                    key: treeNode.key + "/" + "hehe",
                    //children: [],
                    isLeaf: false
                }];

                let newTreeData = this.creatUpdatedTreeNodes(this.state.treeData, treeNode.key, newChildren);
                this.setState({
                    treeData: newTreeData,
                })

                console.log("Current treeNode has no children. Faked 2.")
                resolve();
            }, 100);

        });
    }

    render () {
        return (
            <div>
                <Tree 
                    treeData={this.state.treeData} 
                    loadData={this.onLoadData}
                />
            </div>
        )
    }
};
export default LeftTree;