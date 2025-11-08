import React from "react";

const UserDetails = () => {
  const dataUserDetails: { header: string; detail: string }[] = [
    { header: "Związek zawodowy do którego należy komisja", detail: "eee" },
    { header: "Nazwa komisji", detail: "eee" },
    { header: "Telefon kontaktowy komisji", detail: "eee" },
    { header: "Email kontaktowy komisji", detail: "eee" },
  ];

  return (
    <>
      <div className="flex justify-center ">
        <div className="w-4/5">
          {dataUserDetails.map(({ header, detail }) => {
            return (
              <React.Fragment key={header}>
                <div className="text-lg block text-xl !important">{header}</div>
                <div className="w-full border-b-2 border-transparent px-2 py-1 mb-4">
                  {detail}
                </div>{" "}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
