import React from 'react';
import { Layout, Space , InputNumber } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 64px - 70px)', // Adjust height to fill remaining space, minus header and footer height
  color: '#fff',
  backgroundColor: '#0958d9',
};

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

  // Custom formatter and parser functions to handle numbers with comma
  // const formatter = value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //const parser = value => value.replace(/\$\s?|(,*)/g, '');

const HomePage = () => (

  <Layout style={{ minHeight: '100vh' }}>
    <Header style={headerStyle}>Header</Header>
    <Content style={contentStyle}>
      <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Sider width="20%" style={siderStyle}>
          Sider
        </Sider>
        <Content>
        <Space direction="vertical" align="center" style={{ width: '100%', padding: '20px' }}>
            <InputNumber
              placeholder="Latitude"
              style={{ width: '100%' }}
              min={0}
              step={0.1}
              precision={2}
            />
            <InputNumber
              placeholder="Longtitude"
              style={{ width: '100%' }}
              min={0}
              step={0.1}
              precision={2}
            />
            <InputNumber
              placeholder="Radius(m)"
              style={{ width: '100%' }}
              min={0}
            />
          </Space>
        </Content>
      </Layout>
    </Content>
    <Footer style={footerStyle}>Footer</Footer>
  </Layout>
);

export default HomePage;
