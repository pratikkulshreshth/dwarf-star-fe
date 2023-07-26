import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { postDoctor } from "services/doctors";
import { getDoctorInitialFormData, prepareDoctorPayload, validateDoctorForm } from "utils/doctors";
import { useFormData } from "utils/hooks";

function DoctorsAdd() {
  const [formData, setFormData, onChangeFormData] = useFormData(getDoctorInitialFormData());

  const onChangeContact = (e) => {
    if (e.target.value.length <= 10) {
      onChangeFormData("contact")(e);
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { formData: updatedFormData, hasErrors } = validateDoctorForm(formData);
      setFormData(updatedFormData);

      if (!hasErrors) {
        await postDoctor(prepareDoctorPayload(updatedFormData));
      }
    } catch (e) {
      console.error("Error - ", e);
    }
  };

  return (
    <MDBox pt={6} pb={3}>
      <form onSubmit={onFormSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <MDBox mb={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="firstName"
                    type="text"
                    label="First Name"
                    value={formData.firstName.value}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Dr.</InputAdornment>,
                    }}
                    onChange={onChangeFormData("firstName")}
                    error={formData.firstName.error}
                    helperText={formData.firstName.errorMessage}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="lastName"
                    type="text"
                    label="Last Name"
                    value={formData.lastName.value}
                    onChange={onChangeFormData("lastName")}
                    error={formData.lastName.error}
                    helperText={formData.lastName.errorMessage}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
            </MDBox>
            <MDBox mb={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    id="contact"
                    type="text"
                    label="Contact No."
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                    }}
                    value={formData.contact.value}
                    onChange={onChangeContact}
                    error={formData.contact.error}
                    helperText={formData.contact.errorMessage}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
            </MDBox>
            <MDBox mb={2}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    id="default_share"
                    type="number"
                    label="Default Share"
                    min={0}
                    max={100}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    value={formData.share.value}
                    onChange={onChangeFormData("share")}
                    error={formData.share.error}
                    helperText={formData.share.errorMessage}
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
            </MDBox>

            <MDBox mt={4} mb={1}>
              <Grid container spacing={2}>
                <Grid item>
                  <MDButton variant="gradient" color="secondary" mr={2}>
                    Cancel
                  </MDButton>
                </Grid>
                <Grid item>
                  <MDButton variant="gradient" color="primary" type="submit">
                    Save
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </form>
    </MDBox>
  );
}

export default DoctorsAdd;
