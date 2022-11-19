import { Navi } from "../component";
import {Layout,List,Card } from 'antd';
const { Header, Content } = Layout;
const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
  ];
const Main =()=>{

    return (
        <Layout>
            <Header><Navi /></Header>
            <Content>
            <List
                grid={{
                gutter: 16,
                column: 4,
                }}
                dataSource={data}
                renderItem={(item) => (
                <List.Item>
                    <Card title={item.title}>Card content</Card>
                </List.Item>
                )}
            />
            </Content>
            
        </Layout>
    );
};
export default Main;