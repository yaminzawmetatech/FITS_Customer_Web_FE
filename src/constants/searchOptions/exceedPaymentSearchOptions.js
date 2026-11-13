export const EXCEED_PAYMENT_SEARCH_OPTIONS = [
  { id: "ids", name: "Application ID", type: "text_field" },
  { id: "loan_amount", name: "Loan Amount", type: "text_field" },
  // { id: "status_array", name: "Status", type: "autocomplete_status" },
  { id: "exceed_status_date", name: "Miscellaneous Income Date", type: "date" },
  { id: "exceed_status_date", name: "Retain as Advanced Payment Date", type: "date" },
  { id: "exceed_status_date", name: "SettlementasMiscellaneousIncome Date", type: "date" },
  { id: "created_by", name: "Created By", type: "autocomplete_user" },
  { id: "modified_by", name: "Modified By", type: "autocomplete_user" },
  { id: "created_at", name: "Created Date", type: "date" },
  { id: "modified_date", name: "Modified Date", type: "date" },
];
