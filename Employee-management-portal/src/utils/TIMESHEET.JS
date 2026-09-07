import { useState } from "react";

import useTimesheets from "../hooks/useTimesheets";
import useEmployees from "../hooks/useEmployees";

import TimesheetTable from "../components/Timesheets/TimesheetTable";
import TimesheetForm from "../components/Timesheets/TimesheetForm";

import {
  updateTimesheetStatus,
  addTimesheet,
} from "../utils/timesheetsStorage";

import {
  AccessTimeOutlined,
  PendingActionsOutlined,
  CheckCircleOutlined,
  CancelOutlined,
} from "@mui/icons-material";

import "../styles/Timesheet.css";
import "../styles/TimesheetForm.css";
