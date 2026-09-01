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

const EmployeeTable = ({ employees }) => {
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
