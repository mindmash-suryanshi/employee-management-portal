import { Link } from "react-router-dom";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ITEMS_PER_PAGE = 5;

const EmployeeTable = ({ employees }) => {
  const emptyRows = Math.max(0, ITEMS_PER_PAGE - employees.length);

  return (
    <TableContainer component={Paper} className="employee-table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Emp ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>

              <TableCell>
                {employee.firstName} {employee.lastName}
              </TableCell>

              <TableCell>{employee.email}</TableCell>

              <TableCell>{employee.company?.title || "N/A"}</TableCell>

              <TableCell align="center">
                <Button
                  component={Link}
                  to={`/employees/${employee.id}`}
                  variant="outlined"
                  size="small"
                >
                  View Profile
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {Array.from({ length: emptyRows }).map((_, index) => (
            <TableRow key={`empty-${index}`} className="employee-empty-row">
              <TableCell>&nbsp;</TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
