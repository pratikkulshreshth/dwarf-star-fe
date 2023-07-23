import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import moment from "moment/moment";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDButton from "../../components/MDButton";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import { getPatients } from "services/patients";

function Patients() {
  const [patients, setPatients] = useState([]);

  const columns = [
    { Header: "name", accessor: "name", align: "left" },
    { Header: "age", accessor: "age", align: "left" },
    { Header: "contact", accessor: "contact", align: "left" },
    { Header: "address", accessor: "address", align: "left" },
    { Header: "note", accessor: "note", align: "left" },
    { Header: "action", accessor: "action", width: "15%", align: "left" },
  ];

  const rows = patients.map(
    ({ firstName, lastName, contact = null, dob = null, note = "", address = "" }) => {
      return {
        name: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {firstName} {lastName}
          </MDTypography>
        ),
        age: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {moment().diff(dob, "years")}
          </MDTypography>
        ),
        contact: contact ? (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            +91-{contact}
          </MDTypography>
        ) : (
          "-"
        ),
        address: address ? (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {address}
          </MDTypography>
        ) : (
          "-"
        ),
        note: note ? (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {note}
          </MDTypography>
        ) : (
          "-"
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="info" fontWeight="medium">
            View
          </MDTypography>
        ),
      };
    }
  );

  const fetchPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data.data || []);
    } catch (e) {
      console.error("Error - ", e);
    }
  };

  const onClickAddPatient = () => {};

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Patients
                </MDTypography>
                <MDButton
                  color="secondary"
                  variant="gradient"
                  size="large"
                  onClick={onClickAddPatient}
                >
                  + Add Patient
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Patients;
