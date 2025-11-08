import { updateCommitteeData } from "@/actions/user/updateCommitteeData";
import ButtonSubmit from "@/components/ui/buttons/ButtonSubmit";

const UserCommitteeForm = () => {
  return (
    <form className="*:block *:my-1 w-fit bg-slate-100 p-4" action={updateCommitteeData}>
      <label>name<input type="text" name="committeeName" /></label>
      <label>email<input type="text" name="committeeEmail" /></label>
      <label>phone<input type="text" name="committeePhone" /></label>
      <label>union<input type="text" name="committeeUnion" /></label>
      <ButtonSubmit isSubmitting={false} message="Submit" />
    </form>
  );
};

export default UserCommitteeForm;
