import { theme } from "@theme";
import React, { useState } from "react";

import TNInput, { TNInputProps } from "..";

export interface YLTextAreaProps extends TNInputProps {
  maxLength?: number;
}

const YLTextarea = ({ onChange, maxLength, inputProps, containerProps, ...props }: YLTextAreaProps) => {
  const [inputLength, setInputLength] = useState(0);

  return (
    <TNInput
      multiline
      minRows={2}
      onChange={(event) => {
        setInputLength(event.target.value.length);
        onChange?.(event);
      }}
      inputProps={{ maxLength, ...inputProps }}
      containerProps={{
        sx: !!maxLength
          ? {
              "textarea.MuiOutlinedInput-input": { paddingBottom: theme.spacing(5.75) },
              ".MuiOutlinedInput-root::before": {
                content: `"${inputLength}/${maxLength}"`,
                color: theme.palette.grey[500],
                position: "absolute",
                fontSize: theme.spacing(1.75),
                right: theme.spacing(2),
                bottom: theme.spacing(2),
              },
            }
          : undefined,
        ...containerProps,
      }}
      {...props}
    />
  );
};

export default YLTextarea;
