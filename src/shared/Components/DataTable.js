import React from "react";
import MaterialTable from 'material-table';

const DataTable = (props) => {
    const { title, columns, data, style = {}, options = {} } = props;
    return (
        <MaterialTable
            title={title}
            columns={columns}
            data={data}
            style={style}
            options={options}
        />
    );
};

export default DataTable;