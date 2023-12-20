import { Grid, List, ListItem, ListItemText } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const MilestoneDetails = (props) => {
  const { data } = props;
  const { milestone_description, checklist, milestone_title } = data;

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={6}
        sx={{
          marginBottom: "20px",
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <h2 className="text-[24px] font-bold">{`${milestone_title}`}</h2>
            <hr className="mt-2" />
          </Grid>
          <Grid item xs={12}>
            <p className="text-[14px] mt-3">{milestone_description}</p>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          marginBottom: "20px",
        }}
      >
        <h2 className="text-[24px] font-bold">{`Checklist`}</h2>
        <List>
          {checklist?.map((data) => {
            return (
              <ListItem
                sx={{
                  padding: "0px",
                }}
              >
                <TaskAltIcon
                  sx={{
                    marginRight: "10px",
                  }}
                />
                <ListItemText
                  id={`switch-list-label-${data?.checklist_title}`}
                  primary={data?.checklist_title}
                  disableTypography
                  sx={{
                    fontSize: "14px",
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
};

export default MilestoneDetails;
