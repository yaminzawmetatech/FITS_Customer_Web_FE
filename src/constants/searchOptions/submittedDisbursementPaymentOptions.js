export const SUBMITTED_DISBURSEMENT_PAYMENT_OPTIONS = [
    { id: "name", name: "Name", type: "text_field" },
    { id: "status_array", name: "Status", type: "autocomplete_status" },
    { id: "posting_date", name: "Posting Date", type: "date" },
    // { id: "actual_amount", name: "Actual Amount", type: "text_field" },
    // { id: "payment_amount", name: "Payment Amount", type: "text_field" },
    // { id: "exceed_amount", name: "Exceed Amount", type: "text_field" },
    { id: "is_posted", name: "Posting", type: "autocomplete_is_true_false" },
    { id: "created_by", name: "Created By", type: "autocomplete_user" },
    { id: "modified_by", name: "Modified By", type: "autocomplete_user" },
    { id: "created_at", name: "Created Date", type: "date" },
    { id: "modified_date", name: "Modified Date", type: "date" },
  ];
  