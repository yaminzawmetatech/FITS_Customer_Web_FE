export const INSURANCE_PAYMENT_OPTIONS = [
    { id: "ids", name: "Application ID", type: "text_field" },
    { id: "mnet_application_id", name: "MNet ID", type: "text_field" },
    { id: "customer_loan_ids", name: "Customer Loan ID", type: "text_field" },
    { id: "kpay_ids", name: "Kpay ID", type: "text_field" },
    { id: "disbursed_date", name: "Disbursed Date", type: "date" },
    { id: "approved_amount", name: "Approved Amount", type: "text_field" },
    { id: "applied_date", name: "Applied Date", type: "date" },
    { id: "category_id", name: "Category", type: "autocomplete_category" },
    {
      id: "sub_category_id",
      name: "Sub Category",
      type: "autocomplete_sub_category",
    },
    { id: "ihco", name: "IHCO", type: "autocomplete_ihco" },
    { id: "applicant_name", name: "Applicant Name", type: "text_field" },
    { id: "nrc", name: "NRC", type: "text_field" },
    {
      id: "living_phone_number",
      name: "Living Phone Number",
      type: "text_field",
    },
    { id: "created_by", name: "Created By", type: "autocomplete_user" },
    { id: "modified_by", name: "Modified By", type: "autocomplete_user" },
    { id: "created_at", name: "Created Date", type: "date" },
    { id: "modified_date", name: "Modified Date", type: "date" },
  ];
  