import React from "react";

const CustomTable = ({ columns = [], data = [], renderActions }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col.label ?? col}</th>
            ))}
            {renderActions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className={row.rowClass || ""}>
              {columns.map((col, i) => (
                <td key={i}>{row[col.field] ?? row[col] ?? "-"}</td>
              ))}
              {renderActions && <td>{renderActions(row)}</td>}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default CustomTable;
