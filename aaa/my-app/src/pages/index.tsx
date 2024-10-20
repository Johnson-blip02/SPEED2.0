import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to SPEED - Software Practice Empirical Evidence Database
      </Typography>

      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          About SPEED
        </Typography>
        <Typography variant="body1" paragraph>
          SPEED, short for Software Practice Empirical Evidence Database, is a
          collaborative platform created as part of CISE Group 5004&apos;s
          Assignment 1B. Our primary goal is to provide a centralized repository
          for empirical evidence related to software development practices.
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          What We Offer
        </Typography>
        <Typography variant="body1" paragraph>
          SPEED offers a range of features to help you explore and contribute to
          our database:
        </Typography>

        <List>
          <ListItem>
            <ListItemText
              primary="Article Submission"
              secondary="We encourage anyone from the public to propose articles for inclusion in SPEED. You can submit links to relevant articles, allowing us to collect a diverse range of empirical evidence."
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Moderation"
              secondary="Our dedicated team of experts from the Software Engineering Research Center (SERC) serves as moderators. They meticulously review proposed articles for quality, relevance, and duplication. Only the most valuable contributions proceed to the next step."
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Analysis"
              secondary="Our team of Analysts, who are SERC staff members, carefully read and analyze the approved articles. They extract vital information such as abstracts, methodologies, and references."
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Database Entry"
              secondary="The extracted information is then entered into the SPEED database, making it easily accessible for users interested in researching and exploring software development practices."
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
