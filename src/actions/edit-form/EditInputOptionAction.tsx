"use server";

import { requireUser } from "@/dataAccessLayer/queries";
import { db } from "@/lib/mongo";
import { ObjectId } from "mongodb";

const EditInputOptionAction = async (
  formIdString: string,
  inputId: string,
  optionValue: string
) => {
  await requireUser();
};

export default EditInputOptionAction;
