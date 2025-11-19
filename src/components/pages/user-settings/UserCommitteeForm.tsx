import { updateCommitteeDataAction } from "@/actions/user/updateCommitteeDataAction";
import { Button } from "@/components/shared";

const UserCommitteeForm = () => {
  return (
    <form
      className="*:block *:my-1 w-fit bg-slate-100 p-4"
      action={updateCommitteeDataAction}
    >
      <label>
        name
        <input type="text" name="committeeName" />
      </label>
      <label>
        email
        <input type="text" name="committeeEmail" />
      </label>
      <label>
        phone
        <input type="text" name="committeePhone" />
      </label>
      <label>
        union
        <input type="text" name="committeeUnion" />
      </label>
      <Button isLoading={false} message="Submit" />
    </form>
  );
};

export default UserCommitteeForm;
