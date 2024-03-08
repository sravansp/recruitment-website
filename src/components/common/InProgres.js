import React from 'react';
import WorkImage from '../../assets/images/WorkInProgres.jpeg';
import { Table, Typography } from 'antd';
const { Text } = Typography;

export default function InProgress() {
    return (
       <Table>
         <Table.ColumnGroup>
          <Table.Column title="No data" dataIndex="noData" key="noData" render={() => <Text>No data available</Text>} />
        </Table.ColumnGroup>
       </Table>
    );
}
