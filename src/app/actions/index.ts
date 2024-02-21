"use server";

export async function getItemInfo(formData: FormData) {
  const rawFormData = {
    sizeFiltered: formData.get("sizeFiltered"),
    type: formData.get("type"),
    text: formData.get("text"),
  };
  console.log(rawFormData);
}
