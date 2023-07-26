import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DataTable from "examples/Tables/DataTable";
import MDBadge from "components/MDBadge";
import { getDoctors } from "services/doctors";

function DoctorsList() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  // noinspection JSUnusedLocalSymbols
  const data = [
    {
      firstName: "Sanskriti",
      lastName: "Shah",
      contact: "9434384938",
      nextAppointment: moment(),
      share: "100",
    },
    {
      firstName: "Sanskriti",
      lastName: "Shah",
      contact: "9434384938",
      nextAppointment: "2023-07-24T14:30:00.000Z",
      share: "100",
    },
    {
      firstName: "Sanskriti",
      lastName: "Shah",
      contact: "9434384938",
      nextAppointment: "2023-07-28T14:30:00.000Z",
      share: "100",
    },
    {
      firstName: "Johnny",
      lastName: "Cage",
      contact: "9434355555",
      nextAppointment: "2023-07-18T14:30:00.000Z",
      share: "50",
    },
    {
      firstName: "John",
      lastName: "Doe",
      contact: "9449384777",
      nextAppointment: "2023-07-14T14:30:00.000Z",
      share: "10",
    },
    {
      firstName: "Sanskriti",
      lastName: "Shah",
      contact: "9434384938",
      nextAppointment: "2023-07-11T14:30:00.000Z",
      share: "100",
    },
  ];

  const columns = [
    { Header: "name", accessor: "name", align: "left" },
    { Header: "contact", accessor: "contact", align: "left" },
    {
      Header: "next appointment",
      accessor: "appointment",
      width: "30%",
      align: "left",
    },
    { Header: "share", accessor: "share", width: "15%", align: "left" },
    { Header: "action", accessor: "action", width: "15%", align: "left" },
  ];

  const rows = doctors.map(
    ({ firstName, lastName, contact = null, nextAppointment = null, defaultShare }) => {
      return {
        name: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Dr. {firstName} {lastName}
          </MDTypography>
        ),
        contact: contact ? (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            +91-{contact}
          </MDTypography>
        ) : (
          "-"
        ),
        appointment: nextAppointment ? (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {moment(nextAppointment).format("MMMM Do, h:mm A (dddd)")}
            {moment(nextAppointment).days() === 0 ? (
              <MDBadge badgeContent="today" color="success" variant="gradient" size="sm" />
            ) : null}
          </MDTypography>
        ) : (
          "-"
        ),
        share: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            {defaultShare}%
          </MDTypography>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="info" fontWeight="medium">
            View
          </MDTypography>
        ),
      };
    }
  );

  const fetchDoctors = async () => {
    try {
      const response = await getDoctors();
      setDoctors(response.data.data || []);
    } catch (e) {
      console.error("Error - ", e);
    }
  };

  const onClickAddDoctor = () => {
    navigate("/doctors/add");
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
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
                Doctors
              </MDTypography>
              <MDButton
                color="secondary"
                variant="gradient"
                size="large"
                onClick={onClickAddDoctor}
              >
                + Add Doctor
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
  );
}

export default DoctorsList;
