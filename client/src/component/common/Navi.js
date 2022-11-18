import { Menu,Input } from 'antd';
const { Search } = Input;

const Navi =()=>{
    const onSearch = (value) => console.log(value);
    return (
        <div>
            <div style={{float: "left",width: "120px",height: "31px",margin: "16px 24px 16px 0",background: "rgba(255, 255, 255, 0.3)"}} />
            
            <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{
                width: 600,
                float: "left",
                padding:"15px"
            }}
            />
            
            <Menu
                style={{display: "flex",justifyContent:"end"}}
                theme='dark'
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={new Array(5).fill(null).map((_, index) => {
                const key = index + 1;
                return {
                    key,
                    label: `nav ${key}`,
                };
                })}
            />
        </div>
    );
};
export default Navi;