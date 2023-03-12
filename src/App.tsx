import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.scss';
import { Breadcrumb, Layout, Menu } from 'antd';

const { Header, Footer, Content } = Layout;

function App() {
	return (
		<div className="App">
			<Layout>
				<Header>
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={['2']}
						items={new Array(4).fill(null).map((_, index) => {
							const key = index + 1;
							return {
								key,
								label: `nav ${key}`,
							};
						})}
					/>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<div className="site-layout-content">Content</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©2018 Created by Ant UED
				</Footer>
			</Layout>
		</div>
	);
}

export default App;
