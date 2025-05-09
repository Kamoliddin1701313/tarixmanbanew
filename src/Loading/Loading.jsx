import React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import style from "./loading.module.scss";

function Loading() {
  return (
    <div className={style["loading-wrapper"]}>
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress
          sx={{ color: "red" }}
          style={{ marginTop: "75%" }}
          size={150}
        />
      </Stack>
    </div>
  );
}

export default Loading;
