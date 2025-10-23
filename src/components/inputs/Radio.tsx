"use client";

import InputError from "./InputError";

type Props = {
  headingText: string;
  inputsData: string[];
  inputValue: string;
  membership?: boolean;
};

const Radio = (props: Props) => {
  return (
    <>
      <div>
        {/* <RadioGroup
          name={props.inputValue}
          value={values[props.inputValue as keyof typeof values]}
          onChange={(e) => setFieldValue(props.inputValue, e.target.value)}
          onBlur={handleBlur}
          sx={{
            width: rwd("80%", "60%"),
            marginInline: "auto",
            ml: rwd("auto", "40%"),
            mt: rwd(4.2, 5.9),
          }}
        >
          {props.inputsData.map((data) => {
            return (
              <FormControlLabel
                key={data}
                value={data}
                control={<Radio />}
                label={highlightText(data)}
                sx={{
                  mt: props.membership ? 2 : 0,
                  ml: -1,
                  "& .MuiFormControlLabel-label": {
                    mr: 1,
                    color: "info.dark",
                    fontSize: (theme) => theme.typography.fs_16_rg,
                  },
                }}
              />
            );
          })}
        </RadioGroup> */}
        <InputError errorMsg="" />
      </div>
    </>
  );
};

export default Radio;
