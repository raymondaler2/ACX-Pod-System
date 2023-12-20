import { Card, Typography, Divider, Box } from "@mui/material";

const SopCommentsActLog = (props) => {
  const { data } = props;

  return (
    <Card
      sx={{
        marginTop: "25px",
        marginRight: "25px",
        marginBottom: "25px",
        padding: "16px",
        minHeight: "95vh",
        borderRadius: "40px",
      }}
    >
      {/* Comments Section */}
      {data.comments.map((comment) => (
        <Box key={comment._id} sx={{ marginBottom: "16px" }}>
          <Typography variant="body1">{comment.content}</Typography>
          <Typography variant="caption">
            Posted by {comment.user_id} on{" "}
            {new Date(comment.time).toLocaleString()}
          </Typography>

          {/* Replies Section */}
          {comment.replies && comment.replies.length > 0 && (
            <Box sx={{ marginLeft: "16px" }}>
              {comment.replies.map((reply) => (
                <Box key={reply._id} sx={{ marginBottom: "8px" }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    {reply.content}
                  </Typography>
                  <Typography variant="caption">
                    Posted by {reply.user_id} on{" "}
                    {new Date(reply.time).toLocaleString()}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Card>
  );
};

export default SopCommentsActLog;
