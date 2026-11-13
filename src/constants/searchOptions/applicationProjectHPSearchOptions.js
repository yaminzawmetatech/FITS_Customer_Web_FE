export const APPLICATION_PROJECT_HP_SEARCH_OPTIONS = [
  { id: "ids", name: "Application ID", type: "text_field" },
  { id: "status_array", name: "Status", type: "autocomplete_status" },
  { id: "approved_amount", name: "Approved Amount", type: "text_field" },
  {
    id: "living_phone_number",
    name: "Living Phone Number",
    type: "text_field",
  },
  { id: "applied_date", name: "Applied Date", type: "date" },
  {
    id: "sub_category_id",
    name: "Sub Category",
    type: "autocomplete_sub_category",
  },
  { id: "ihco", name: "IHCO", type: "autocomplete_ihco" },
  { id: "cmco", name: "CMCO", type: "autocomplete_cmco" },
  { id: "applicant_name", name: "Applicant Name", type: "text_field" },
  { id: "nrc", name: "NRC", type: "text_field" },
  { id: "latest_assign_user", name: "Reconsider Assign User", type: "autocomplete_user" },
];
