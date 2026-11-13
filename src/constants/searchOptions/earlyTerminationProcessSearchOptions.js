export const EARLY_TERMINATION_PROCESS_SEARCH_OPTIONS = [
  { id: "ids", name: "Application ID", type: "text_field" },
  {
    id: "category_id",
    name: "Category",
    type: "autocomplete_category",
  },
  {
    id: "sub_category_id",
    name: "Sub Category",
    type: "autocomplete_sub_category",
  },
  { id: "customer_inform_date", name: "Customer Informed Date", type: "date" },
  { id: "promise_date", name: "Promised Date", type: "date" },
  { id: "due_date", name: "Due Date", type: "date" },
  { id: "status", name: "Status", type: "autocomplete_status" },
  { id: "et_type", name: "ET Type", type: "autocomplete_et_type" },
];
