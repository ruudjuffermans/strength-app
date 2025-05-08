import React from "react";
import { useUserProfile } from "../../../hooks/useUserProfile";
import { Box, Typography, Grid, Divider } from "@mui/material";
import ContentPaper from "../../../components/papers/ContentPaper";

const Profile = () => {
  const { userProfile } = useUserProfile();

  if (!userProfile) return <Typography>Loading...</Typography>;

  const {
    firstname,
    lastname,
    email,
    role,
    status,
    created_at,
    approved_at,
    active_program,
    active_workout,
    theme,
    preferred_units,
    newsletter_subscribed,
    cookie_consent,
    latest_weight,
  } = userProfile;

  return (
    <ContentPaper >
      <Typography variant="h5" gutterBottom>
        User Profile
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <strong>First Name:</strong> {firstname}
        </Grid>
        <Grid item xs={6}>
          <strong>Last Name:</strong> {lastname}
        </Grid>
        <Grid item xs={12}>
          <strong>Email:</strong> {email}
        </Grid>
        <Grid item xs={6}>
          <strong>Role:</strong> {role}
        </Grid>
        <Grid item xs={6}>
          <strong>Status:</strong> {status}
        </Grid>
        <Grid item xs={6}>
          <strong>Created At:</strong> {new Date(created_at).toLocaleString()}
        </Grid>
        {approved_at && (
          <Grid item xs={6}>
            <strong>Approved At:</strong> {new Date(approved_at).toLocaleString()}
          </Grid>
        )}
        <Grid item xs={6}>
          <strong>Active Program:</strong> {active_program}
        </Grid>
        <Grid item xs={6}>
          <strong>Active Workout:</strong> {active_workout ?? "None"}
        </Grid>
        <Grid item xs={6}>
          <strong>Theme:</strong> {theme}
        </Grid>
        <Grid item xs={6}>
          <strong>Units:</strong> {preferred_units}
        </Grid>
        <Grid item xs={6}>
          <strong>Newsletter:</strong> {newsletter_subscribed ? "Subscribed" : "Not Subscribed"}
        </Grid>
        <Grid item xs={6}>
          <strong>Cookie Consent:</strong> {cookie_consent ?? "Not Set"}
        </Grid>
        <Grid item xs={12}>
          <strong>Latest Weight:</strong>{" "}
          {latest_weight ? `${latest_weight.weight} kg on ${new Date(latest_weight.created_at).toLocaleDateString()}` : "No entries yet"}
        </Grid>
      </Grid>
    </ContentPaper>
  );
};

export default Profile;
