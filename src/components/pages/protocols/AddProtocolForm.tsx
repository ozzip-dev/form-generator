import { UploadFile } from "@/actions/protocol";

const AddProtocolForm = () => {
  const uploadFile = async (formData: FormData) => {
    const file = formData.get("file") as File;
    UploadFile(file);
  };

  return (
    <form action={uploadFile} className="">
      <label>
        <span>Wgraj protokół</span>
        <input type="file" name="file" />
      </label>
      <button type="submit">Nowy</button>
    </form>
  );
};

export default AddProtocolForm;
