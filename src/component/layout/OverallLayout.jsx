import React from "react";
import { Breadcrumb, Button, Layout } from 'antd';
import { Menu } from "antd";

import './OverallLayout.css'

const { Header, Sider, Content } = Layout;

const navigationItems = ['1', '2', '3'].map((key) => (
    {
        key,
        label: "nav" + key,
    }
)); 

class OverallLayout extends React.Component {
    render () {
        return (
            <div>
                <Layout> 
                    <Header className="header" >
                        <div className="logo" >njfu</div>

                        {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
                    </Header>
                    <Layout>
                        <Sider width={150} className="site-layout-background">
                            <Button >place left tree here</Button>
                        </Sider>
                        <Layout style={{padding: '0 24px 24px'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280
                                }}
                            >
                                <Button >place content here</Button>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
export default OverallLayout;