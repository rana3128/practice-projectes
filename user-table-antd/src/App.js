import { Divider, Button, Table, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
];


const App = () => {
  const [tableData, setTableData] = useState([]);
  const [StableData, setSTableData] = useState([]);
  const [selected, setTSelected] = useState([]);


  const deleteItems = () => {
    const updated = tableData.filter(row => !selected.includes(row.id));
    const sFiltered = StableData.filter(row => !selected.includes(row.id));
    setTableData(updated);
    setSTableData(sFiltered);

  }

  const onSearch = (value) => {
    if (!value) {
      setSTableData(StableData);
    } else {
      const sFiltered = StableData.filter(row => {
        if (row.name.includes(value)) return true;
        if (row.email.includes(value)) return true;
        if (row.role.includes(value)) return true;
        return false;
      });
      setSTableData(sFiltered);
    }
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const selectedIds = selectedRows.map(row => row.id);
      console.log(selectedIds)
      setTSelected(selectedIds);
    }
  };


  useEffect(() => {
    testdata();
  }, []);

  const testdata = () => {
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((row, index) => row.key = index);
        setTableData(data)
        setSTableData(data)
      });
  };

  return (
    <div style={{ margin: 100 }}>

      <Input.Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{
          width: 400,
        }}
      />
      <Divider />
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={StableData}
      />

      <Button type='danger' style={{ marginBottom: "100px" }} onClick={deleteItems} >Delete Selected</Button>
    </div>
  );
};

export default App;