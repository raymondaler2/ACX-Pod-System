import { Box, Grid, Card, Divider } from "@mui/material";
import { Str } from "@supercharge/strings";
import ButtonBase from "@mui/material/ButtonBase";
import { Link } from "react-router-dom";
import ChatBubbleOutlinedIcon from "@mui/icons-material/ChatBubbleOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { useEffect, useState } from "react";
import axios from "axios";

const SopCard = (props) => {
  const { sop } = props;
  const [userData, setUserData] = useState([]);
  const dateObject = new Date(sop?.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObject
  );

  const fetchUser = async () => {
    const site = import.meta.env.VITE_SITE;
    const response = await axios.get(
      `http://${site}:3000/api/user/${sop.user_id}`
    );
    setUserData(response.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Grid item xs={2.4}>
      <ButtonBase>
        <Link to={`/Knowledgebase/${sop?._id}`}>
          <Card
            sx={{
              height: "350px",
              width: "90%",
              minWidth: "280px",
              borderRadius: "20px",
              padding: "40px",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              ":hover": {
                boxShadow: 20,
                cursor: "pointer",
              },
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                minHeight: "48px",
              }}
            >
              <h1 className="text-left text-[16px] font-bold">
                {Str(sop?.sop_title).limit(30, " ...").get()}
              </h1>
              {sop?.featured ? (
                <StarOutlinedIcon
                  sx={{
                    color: "#FAC710",
                    marginLeft: "5px",
                  }}
                />
              ) : (
                <StarBorderOutlinedIcon
                  sx={{
                    marginLeft: "5px",
                  }}
                />
              )}
            </Box>
            <Box
              sx={{
                height: "50px",
              }}
            >
              <Grid
                sx={{
                  backgroundColor: "#FAC710",
                  marginRight: "65%",
                  marginLeft: "-5px",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  marginTop: "10px",
                }}
              >
                <p className="text-center text-[10px] font-medium">
                  {Str(sop?.service_tag).limit(8, " ...").get()}
                </p>
              </Grid>
            </Box>
            <Box
              sx={{
                height: "165px",
              }}
            >
              <p className="text-left text-[14px]">
                {Str(sop?.sop_description).limit(180, " ...").get()}
              </p>
            </Box>
            <Grid container>
              <Grid item xs={9} sx={{ marginTop: "auto" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "fit-content",
                  }}
                >
                  <p className="text-[9px] mr-2">
                    {Str(`${userData?.first_name} ${userData?.last_name}`)
                      .limit(11, " ...")
                      .get()}
                  </p>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <p className="text-[9px]">|</p>
                  <p className="text-[9px] ml-2">{formattedDate}</p>
                </Box>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{ textAlign: "right", justifyContentL: "Right" }}
              >
                <Grid container alignItems="center" justifyContent="flex-end">
                  <ChatBubbleOutlinedIcon
                    sx={{
                      fontSize: "9px",
                      marginRight: "5px",
                      color: "#B3B3B3",
                    }}
                  />
                  <p className="text-[9px]">{sop?.comments.length}</p>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Link>
      </ButtonBase>
    </Grid>
  );
};

export default SopCard;
