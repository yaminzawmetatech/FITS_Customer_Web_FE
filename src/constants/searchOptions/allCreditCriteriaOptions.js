export const ALL_CREDIT_CRITERIA_OPTIONS = [
  { id: "category_id", name: "Category", type: "autocomplete_category" },
  {
    id: "sub_category_id",
    name: "Sub Category",
    type: "autocomplete_sub_category",
  },
  { id: "type", name: "Type", type: "autocomplete_criteria_type" },
  { id: "required_category", name: "Required Category", type: "text_field" },
  { id: "start_date", name: "Version Start Date", type: "date" },
  { id: "end_date", name: "Version End Date", type: "date" },
  { id: "created_by", name: "Created By", type: "autocomplete_user" },
  { id: "modified_by", name: "Modified By", type: "autocomplete_user" },
  { id: "created_at", name: "Created Date", type: "date" },
  { id: "modified_at", name: "Modified Date", type: "date" },
];
