import { ApplicationInformationSetupPropertyData } from "../applicationInformationSetup/applicationInformationSetupPropertyData";
import serviceIllustration from "../../assets/images/fits-services.svg";

export const DEMO_STORAGE_KEY = "fits-finance-demo-data-v1";

const applicationFieldKeys = [
  "account_name", "account_no", "age", "agent_id", "applicant_name",
  "apply_by_yourself", "approved_amount", "approved_by",
  "assessment_customer_disbursed_ratio", "assessment_dealer_disbursed_amount",
  "assessment_dealer_disbursed_ratio", "assessment_down_payment_amount",
  "bank_payment_channel", "brand_id", "brand_name", "chassis_no", "cmco_id",
  "color", "credit_assessment_date", "credit_assessment_result",
  "credit_scheme_id", "current_address", "current_internet_plan",
  "current_living_period", "current_residential_status",
  "customer_bank_payment_channel_id", "customer_loan_id", "date_of_birth",
  "dealer_id", "debt_from_other_financing", "department", "division",
  "e_mail", "employment_address", "employment_period_years", "engine_no",
  "engine_power", "facebook_account", "father_name", "gender",
  "guarantor_dob", "guarantor_father_name", "guarantor_full_name",
  "guarantor_nrc", "guarantor_primary_phone_no",
  "guarantor_relation_with_customer", "guarantor_secondary_phone_no",
  "insurance_company", "insurance_default_rate", "insurance_fixed_amount",
  "internet_service_registration_date", "joint_dob", "joint_father_name",
  "joint_full_name", "joint_nrc", "joint_primary_phone_no",
  "joint_relation_with_customer", "joint_secondary_phone_no",
  "kpay_current_address", "kpay_id", "kpay_main_business_category",
  "kpay_nrc", "kpay_occupation", "kpay_permanent_address",
  "kpay_purpose_of_loan", "kpay_registered_address",
  "kpay_sub_business_category", "kpay_type_of_business",
  "kpay_type_of_employment", "length_of_kyc2_mth",
  "length_of_wave_amount_mth", "living_phone_number", "living_with_whom",
  "loan_amount", "loan_term_duration", "manufacturer", "mnet_applicant_name",
  "mnet_applicant_nrc", "mnet_application_id", "mnet_applied_amount",
  "mnet_applied_date", "mnet_consumer_type", "mnet_current_address",
  "mnet_customer_account_type", "mnet_customer_category", "mnet_customer_id",
  "mnet_interest_rate", "mnet_is_joint_customer", "mnet_loan_term",
  "mnet_permanent_address", "mnet_township", "mnet_verified_date",
  "mobile_operator_type", "model_id", "model_name", "monthly_income",
  "monthly_installment", "name_of_emp_or_business", "nrc",
  "number_of_family_members", "other", "package_fees", "package_id",
  "parking_address", "plate_no", "prev_mnet_application_id",
  "previous_applied_loan_amount", "previous_approved_Loan_amount",
  "previous_credit_assessment_result", "previous_interest_rate",
  "previous_loan_applied_id", "previous_loan_term",
  "previous_repayment_status", "processing_fees", "processing_percentage",
  "purpose_of_loan", "purpose_of_loan_remark", "purpose_of_unit",
  "reason", "reference_dob", "reference_father_name", "reference_full_name",
  "reference_nrc", "reference_primary_phone_no",
  "reference_relation_with_customer", "reference_secondary_phone_no",
  "region_id", "relationship_with_applicant", "repayment_method",
  "residence_status", "school_name", "secondary_phone_number",
  "stamp_duty_fees", "stamp_duty_percentage", "stock_availability",
  "student_name", "tiktok_account", "title_position", "total_amount",
  "usage_period", "user_of_unit", "vehicle_color",
  "vehicle_down_payment_amount", "vehicle_down_payment_ratio", "viber_number",
  "wave_pay_account_name", "wave_pay_id_mobile", "year_of_manufacture",
  "yearly_school_fees",
];

const makeApplicationFields = () =>
  Object.fromEntries(
    applicationFieldKeys.map((key) => [
      key,
      {
        title: key.replaceAll("_", " "),
        value: key.replaceAll("_", " "),
        type: "text",
        group: "Application Information",
        required: false,
      },
    ])
  );

const applicationFields = makeApplicationFields();

const categories = [
  {
    id: 1,
    _id: "demo-category-1",
    uuid: "demo-category-1",
    code: "DEMO-VEHICLE",
    name_en: "Vehicle Finance",
    name_mm: "ယာဉ်အရစ်ကျငွေကြေးဝန်ဆောင်မှု",
    image: serviceIllustration,
    interest_rate: 0,
    status: 1,
    mob_status: 1,
    demo: true,
  },
  {
    id: 2,
    _id: "demo-category-2",
    uuid: "demo-category-2",
    code: "DEMO-PERSONAL",
    name_en: "Personal Finance",
    name_mm: "ကိုယ်ပိုင်ငွေကြေးဝန်ဆောင်မှု",
    image: serviceIllustration,
    status: 1,
    mob_status: 1,
    demo: true,
  },
  {
    id: 3,
    _id: "demo-category-3",
    uuid: "demo-category-3",
    code: "DEMO-BUSINESS",
    name_en: "Business Finance",
    name_mm: "လုပ်ငန်းသုံးငွေကြေးဝန်ဆောင်မှု",
    image: serviceIllustration,
    status: 1,
    mob_status: 1,
    demo: true,
  },
];

const makeApplicationSetups = () =>
  categories.map((category) => ({
    id: `demo-fields-${category.id}`,
    _id: `demo-fields-${category.id}`,
    uuid: `demo-fields-${category.id}`,
    category_id: category.id,
    application_fields: applicationFields,
    demo: true,
  }));

export const createDemoDatabase = () => ({
  categories,
  "application-fields": ApplicationInformationSetupPropertyData.map((item) => ({
    ...item,
    demo: true,
  })),
  "application-field-set-up": makeApplicationSetups(),
  "customer-inquiry-forms": [
    { id: "demo-inquiry-1", _id: "demo-inquiry-1", name: "Demo inquiry", email: "demo@example.invalid", message: "Sample inquiry for demonstration only.", status: 1, demo: true },
  ],
  "customer-web-images": [],
  "apply-loan-steps": [
    { id: 1, _id: "demo-step-1", description_en: "Choose a financing option", description_mm: "ငွေကြေးဝန်ဆောင်မှု ရွေးချယ်ပါ", image: serviceIllustration, status: 1, demo: true },
    { id: 2, _id: "demo-step-2", description_en: "Prepare your information", description_mm: "အချက်အလက်များ ပြင်ဆင်ပါ", image: serviceIllustration, status: 1, demo: true },
    { id: 3, _id: "demo-step-3", description_en: "Complete the application", description_mm: "လျှောက်လွှာ ဖြည့်သွင်းပါ", image: serviceIllustration, status: 1, demo: true },
  ],
  "our-services": [
    { id: 1, _id: "demo-service-1", title_en: "Vehicle financing", title_mm: "ယာဉ်အရစ်ကျဝန်ဆောင်မှု", description_en: "Explore vehicle financing options.", description_mm: "ယာဉ်အရစ်ကျ ဝန်ဆောင်မှုများကို လေ့လာပါ။", image: serviceIllustration, status: 1, demo: true },
    { id: 2, _id: "demo-service-2", title_en: "Personal financing", title_mm: "ကိုယ်ပိုင်ငွေကြေးဝန်ဆောင်မှု", description_en: "Review available personal finance information.", description_mm: "ကိုယ်ပိုင်ငွေကြေးဝန်ဆောင်မှု အချက်အလက်များကို ကြည့်ရှုပါ။", image: serviceIllustration, status: 1, demo: true },
    { id: 3, _id: "demo-service-3", title_en: "Business financing", title_mm: "လုပ်ငန်းသုံးငွေကြေးဝန်ဆောင်မှု", description_en: "Review available business finance information.", description_mm: "လုပ်ငန်းသုံး ငွေကြေးဝန်ဆောင်မှု အချက်အလက်များကို ကြည့်ရှုပါ။", image: serviceIllustration, status: 1, demo: true },
  ],
  "customer-voices": [
    { id: 1, _id: "demo-voice-1", name: "Demo Customer", comment_en: "Sample customer feedback for demonstration.", comment_mm: "သရုပ်ပြရန်အတွက် နမူနာဖောက်သည်အကြံပြုချက်။", status: 1, demo: true },
  ],
  "fast-services": [
    { id: 1, _id: "demo-fast-service-1", title_en: "Application guide", title_mm: "လျှောက်ထားမှုလမ်းညွှန်", description_en: "Learn about the application process.", description_mm: "လျှောက်ထားမှုလုပ်ငန်းစဉ်ကို လေ့လာပါ။", status: 1, demo: true },
  ],
  questions: [
    { id: 1, _id: "demo-question-1", question_en: "What information is needed to apply?", question_mm: "လျှောက်ထားရန် ဘယ်အချက်အလက်များ လိုအပ်ပါသလဲ။", status: 1, demo: true },
  ],
  answers: [
    { id: 1, _id: "demo-answer-1", question_id: 1, answer_en: "Requirements depend on the selected product. Review the application form for details.", answer_mm: "လိုအပ်ချက်များသည် ရွေးချယ်ထားသော ဝန်ဆောင်မှုအမျိုးအစားအပေါ် မူတည်ပါသည်။ လျှောက်လွှာတွင် အသေးစိတ်ကြည့်ရှုပါ။", status: 1, demo: true },
  ],
  "nrc-states": [
    { id: 1, _id: "demo-nrc-state-1", code: "1", name_en: "Kachin", name_mm: "ကချင်", state_name_en: "Kachin", state_name_mm: "ကချင်", status: 1, demo: true },
    { id: 2, _id: "demo-nrc-state-2", code: "2", name_en: "Kayah", name_mm: "ကယား", state_name_en: "Kayah", state_name_mm: "ကယား", status: 1, demo: true },
    { id: 12, _id: "demo-nrc-state-12", code: "12", name_en: "Yangon", name_mm: "ရန်ကုန်", state_name_en: "Yangon", state_name_mm: "ရန်ကုန်", status: 1, demo: true },
  ],
  "nrc-townships": [
    { id: 1, _id: "demo-nrc-township-1", nrc_state_id: 12, name_en: "Bahan", name_mm: "ဗဟန်း", township_name_en: "Bahan", township_name_mm: "ဗဟန်း", status: 1, demo: true },
    { id: 2, _id: "demo-nrc-township-2", nrc_state_id: 12, name_en: "Kamayut", name_mm: "ကမာရွတ်", township_name_en: "Kamayut", township_name_mm: "ကမာရွတ်", status: 1, demo: true },
    { id: 3, _id: "demo-nrc-township-3", nrc_state_id: 12, name_en: "Sanchaung", name_mm: "စမ်းချောင်း", township_name_en: "Sanchaung", township_name_mm: "စမ်းချောင်း", status: 1, demo: true },
  ],
  regions: [
    { id: 1, _id: "demo-region-1", name_en: "Yangon Region", name_mm: "ရန်ကုန်တိုင်းဒေသကြီး", region_name_en: "Yangon Region", region_name_mm: "ရန်ကုန်တိုင်းဒေသကြီး", status: 1, demo: true },
    { id: 2, _id: "demo-region-2", name_en: "Mandalay Region", name_mm: "မန္တလေးတိုင်းဒေသကြီး", region_name_en: "Mandalay Region", region_name_mm: "မန္တလေးတိုင်းဒေသကြီး", status: 1, demo: true },
  ],
  dealers: [
    { id: 1, _id: "demo-dealer-1", code: "DEMO-DLR-001", name: "FITS Demo Dealer - Yangon", name_en: "FITS Demo Dealer - Yangon", name_mm: "FITS သရုပ်ပြအရောင်းကိုယ်စားလှယ် - ရန်ကုန်", dealer_name: "FITS Demo Dealer - Yangon", dealer_name_en: "FITS Demo Dealer - Yangon", dealer_name_mm: "FITS သရုပ်ပြအရောင်းကိုယ်စားလှယ် - ရန်ကုန်", region_id: 1, status: 1, demo: true },
    { id: 2, _id: "demo-dealer-2", code: "DEMO-DLR-002", name: "FITS Demo Dealer - Mandalay", name_en: "FITS Demo Dealer - Mandalay", name_mm: "FITS သရုပ်ပြအရောင်းကိုယ်စားလှယ် - မန္တလေး", dealer_name: "FITS Demo Dealer - Mandalay", dealer_name_en: "FITS Demo Dealer - Mandalay", dealer_name_mm: "FITS သရုပ်ပြအရောင်းကိုယ်စားလှယ် - မန္တလေး", region_id: 2, status: 1, demo: true },
  ],
  vehicles: [
    { id: 1, _id: "demo-vehicle-1", brand_id: 1, model_id: 1, web_sys_brand_id: 1, web_sys_model_id: 1, web_sys_brand_name: "Demo Motors", web_sys_model_name: "Model A", brand_name: "Demo Motors", model_name: "Model A", name_en: "Demo Motors Model A", name_mm: "သရုပ်ပြ မော်ဒယ် A", year_of_manufacture: 2025, status: 1, demo: true },
    { id: 2, _id: "demo-vehicle-2", brand_id: 1, model_id: 2, web_sys_brand_id: 1, web_sys_model_id: 2, web_sys_brand_name: "Demo Motors", web_sys_model_name: "Model B", brand_name: "Demo Motors", model_name: "Model B", name_en: "Demo Motors Model B", name_mm: "သရုပ်ပြ မော်ဒယ် B", year_of_manufacture: 2025, status: 1, demo: true },
  ],
  "customer-banks": [
    { id: 1, _id: "demo-bank-1", name: "Demo Bank", name_en: "Demo Bank", name_mm: "သရုပ်ပြဘဏ်", bank_name: "Demo Bank", bank_name_en: "Demo Bank", bank_name_mm: "သရုပ်ပြဘဏ်", status: 1, demo: true },
  ],
  "document-access": [
    { id: 1, _id: "demo-document-1", category_id: 1, web_sys_name_en: "Identity document (sample)", web_sys_name_mm: "မှတ်ပုံတင်အထောက်အထား (နမူနာ)", status: 1, demo: true },
    { id: 2, _id: "demo-document-2", category_id: 1, web_sys_name_en: "Proof of address (sample)", web_sys_name_mm: "နေရပ်လိပ်စာအထောက်အထား (နမူနာ)", status: 1, demo: true },
    { id: 3, _id: "demo-document-3", category_id: 2, web_sys_name_en: "Identity document (sample)", web_sys_name_mm: "မှတ်ပုံတင်အထောက်အထား (နမူနာ)", status: 1, demo: true },
  ],
  "document-types": [
    { id: 1, _id: "demo-document-type-1", name_en: "Identity document", name_mm: "မှတ်ပုံတင်အထောက်အထား", status: 1, demo: true },
    { id: 2, _id: "demo-document-type-2", name_en: "Proof of address", name_mm: "နေရပ်လိပ်စာအထောက်အထား", status: 1, demo: true },
  ],
  "downpayment-setups": [
    { id: 1, _id: "demo-downpayment-1", category_id: 1, name_en: "Sample plan A", name_mm: "နမူနာအစီအစဉ် A", down_payment_percentage: 20, stamp_duty_fee_fixed_amount: 0, stamp_duty_fee_percentage: 0, processing_fee_fixed_amount: 0, processing_fee_percentage: 0, way_to_calculate: "deduct_from_loan_amount", status: 1, demo: true },
    { id: 2, _id: "demo-downpayment-2", category_id: 2, name_en: "Sample plan B", name_mm: "နမူနာအစီအစဉ် B", down_payment_percentage: 30, stamp_duty_fee_fixed_amount: 0, stamp_duty_fee_percentage: 0, processing_fee_fixed_amount: 0, processing_fee_percentage: 0, way_to_calculate: "deduct_from_loan_amount", status: 1, demo: true },
  ],
  "first-due-date-setups": [
    { id: 1, _id: "demo-due-date-1", category_id: 1, name_en: "Sample due date option", name_mm: "နမူနာပေးချေရက်ရွေးချယ်မှု", start_day: 1, end_day: 15, add_to_month: 1, add_to_month_for_else: 2, billing_set_up_day: 1, status: 1, demo: true },
    { id: 2, _id: "demo-due-date-2", category_id: 2, name_en: "Sample due date option", name_mm: "နမူနာပေးချေရက်ရွေးချယ်မှု", start_day: 1, end_day: 15, add_to_month: 1, add_to_month_for_else: 2, billing_set_up_day: 1, status: 1, demo: true },
  ],
  "user-groups": [
    { id: 1, _id: "demo-user-group-1", name: "Demo Operators", name_en: "Demo Operators", name_mm: "သရုပ်ပြအသုံးပြုသူအဖွဲ့", status: 1, demo: true },
  ],
  users: [
    { id: 1, _id: "demo-user-1", uuid: "demo-user-1", name: "Demo User", user_name: "demo.user", email: "demo@example.invalid", role: { name: "Demo" }, status: 1, demo: true },
  ],
  tables: [
    { id: 1, _id: "demo-table-1", name: "Demo table", name_en: "Demo table", name_mm: "သရုပ်ပြဇယား", status: 1, demo: true },
  ],
  applications: [
    { id: "demo-application-1", _id: "demo-application-1", application_no: "DEMO-APP-001", applicant_name: "Sample Applicant", category_name: "Vehicle Finance", applied_date: "2025-01-15", status: "Demo", demo: true },
  ],
});

const resourceAliases = {
  categories: ["categories", "user/categories"],
  "application-fields": ["user/application-fields", "admin/application-fields"],
  "application-field-set-up": [
    "application-setups",
    "user/application-field-set-up",
    "admin/application-field-set-up",
  ],
  "customer-inquiry-forms": ["customer-inquiry-form"],
  "customer-inquiry-form-export": ["customer-inquiry-form-export"],
  "customer-web-images": ["get-images-by-customer-web-id"],
  "apply-loan-steps": ["apply-loan-steps", "user/apply-loan-steps", "admin/apply-loan-steps"],
  "our-services": ["user/our-services", "our-services"],
  "customer-voices": ["user/customer-voices", "customer-voices"],
  "fast-services": ["user/fast-services", "fast-services"],
  questions: ["user/questions", "questions"],
  answers: ["user/answers", "answers"],
  "nrc-states": ["user/nrc-states", "nrc-states"],
  "nrc-townships": ["user/nrc-townships", "nrc-townships"],
  regions: ["user/regions", "admin/regions"],
  dealers: ["get-dealers", "user/dealers", "dealers", "admin/get-web-dealers"],
  vehicles: ["get-vehicles", "user/vehicles", "admin/vehicles", "admin/get-web-vehicles"],
  "customer-banks": ["get-customer-banks", "user/customer-banks", "admin/customer-banks"],
  "document-access": ["user/document-access", "admin/document-access"],
  "document-types": ["document-types"],
  "downpayment-setups": ["user/downpayment-setups", "admin/downpayment-setups"],
  "first-due-date-setups": [
    "user/first-due-date-setups",
    "admin/first-due-date-setups",
  ],
  "user-groups": ["user-groups"],
  users: ["users"],
  tables: ["tables"],
  applications: [
    "admin/applications",
    "create-application",
    "user/create-application",
    "user/create-applications",
    "admin/cancel-application",
    "admin/sync-application",
    "admin/delete-applications",
  ],
};

const aliases = Object.entries(resourceAliases)
  .flatMap(([resource, paths]) => paths.map((path) => ({ resource, path })))
  .sort((left, right) => right.path.length - left.path.length);

const genericItem = (resource, index) => {
  const id = `demo-${resource}-${index + 1}`;
  const label = resource
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return {
    id,
    _id: id,
    uuid: id,
    code: id.toUpperCase(),
    name: `Demo ${label} ${index + 1}`,
    name_en: `Demo ${label} ${index + 1}`,
    name_mm: `သရုပ်ပြ ${label} ${index + 1}`,
    title: `Demo ${label} ${index + 1}`,
    title_en: `Demo ${label} ${index + 1}`,
    title_mm: `သရုပ်ပြ ${label} ${index + 1}`,
    description_en: `Sample ${label.toLowerCase()} data for demonstration only.`,
    description_mm: `သရုပ်ပြရန်အတွက်သာ အသုံးပြုသော နမူနာအချက်အလက်။`,
    status: 1,
    demo: true,
  };
};

const getStorage = () => {
  if (typeof window === "undefined" || !window.localStorage) {
    throw new Error("Offline demo data requires browser local storage.");
  }
  return window.localStorage;
};

const readDatabase = () => {
  const storage = getStorage();
  const stored = storage.getItem(DEMO_STORAGE_KEY);
  if (!stored) {
    const database = createDemoDatabase();
    storage.setItem(DEMO_STORAGE_KEY, JSON.stringify(database));
    return database;
  }
  return JSON.parse(stored);
};

export const resetDemoDatabase = () => {
  getStorage().removeItem(DEMO_STORAGE_KEY);
};

const resolveRequest = (url) => {
  const pathname = url.pathname.replace(/^\/+|\/+$/g, "").replace(/^api\//, "");
  const match = aliases.find(
    ({ path }) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (match) {
    return {
      resource: match.resource,
      remainder: pathname.slice(match.path.length).replace(/^\/+/, ""),
      route: pathname,
    };
  }

  return {
    resource: pathname.replace(/^user\//, "").replace(/^admin\//, "") || "demo",
    remainder: "",
    route: pathname,
  };
};

const parseRequestData = (config) => {
  if (config.data == null) return {};
  if (typeof FormData !== "undefined" && config.data instanceof FormData) {
    return Object.fromEntries(config.data.entries());
  }
  if (typeof config.data === "string") {
    try {
      return JSON.parse(config.data);
    } catch {
      return Object.fromEntries(new URLSearchParams(config.data).entries());
    }
  }
  return config.data;
};

const requestParams = (config, url) => {
  const params = Object.fromEntries(url.searchParams.entries());
  if (config.params && typeof config.params === "object") {
    Object.entries(config.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params[key] = value;
      }
    });
  }
  return params;
};

const matchesParams = (item, params) => {
  const filters = Object.entries(params).filter(([key, value]) => {
    if (["page", "limit", "per_page", "perPage", "sort", "order"].includes(key)) {
      return false;
    }
    const itemValue = item[key];
    return itemValue !== undefined && String(itemValue) !== String(value);
  });
  return filters.length === 0;
};

const findRecord = (records, id) =>
  records.find(
    (item) =>
      String(item.id) === String(id) ||
      String(item._id) === String(id) ||
      String(item.uuid) === String(id) ||
      String(item.code) === String(id)
  );

const makeResponse = (data, config, status = 200) => ({
  data,
  status,
  statusText: "OK",
  headers: {},
  config,
  request: {},
});

const demoLogin = () => ({
  id: "demo-user",
  _id: "demo-user",
  name: "FITS Demo User",
  user_name: "demo.user",
  email: "demo@example.invalid",
  access_token: "offline-demo-token",
  role: "demo",
  demo: true,
});

export const offlineDemoAdapter = async (config) => {
  const url = new URL(config.url, config.baseURL || window.location.href);
  const { resource, remainder, route } = resolveRequest(url);
  const method = (config.method || "get").toLowerCase();
  const params = requestParams(config, url);
  const requestData = parseRequestData(config);
  const database = readDatabase();

  if (/(?:^|\/)login\/?$/.test(route) && method === "post") {
    return makeResponse(demoLogin(), config);
  }

  if (route === "customer-inquiry-form-export" && method === "post") {
    return makeResponse(
      new Blob(["Offline demo export"], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      config
    );
  }

  if (resource === "customer-web-images" && method === "get") {
    const images = database[resource].filter(
      (image) => String(image.customer_web_id) === String(remainder)
    );
    return makeResponse({ data: images }, config);
  }

  if (/\/(?:sync-|batch-delete|delete-applications|cancel-application)/.test(route)) {
    const ids = Array.isArray(requestData)
      ? requestData
      : requestData.ids || [];
    return makeResponse(
      { message: "Completed in offline demo mode.", ids },
      config
    );
  }

  const records = database[resource] || [genericItem(resource, 0)];
  const isCollection = remainder === "" || remainder.includes("/");

  if (method === "get") {
    if (resource === "application-field-set-up") {
      const setupRecords = records.filter((record) =>
        params.category_id
          ? String(record.category_id) === String(params.category_id)
          : true
      );
      return makeResponse({ data: setupRecords }, config);
    }

    if (!isCollection && remainder) {
      const record = findRecord(records, remainder);
      return makeResponse({ data: record || records[0] || null }, config);
    }

    let filtered = records.filter((record) => matchesParams(record, params));
    if (filtered.length === 0 && records.length > 0) filtered = records;

    const page = Math.max(1, Number(params.page) || 1);
    const pageSize = Math.max(
      1,
      Number(params.per_page || params.perPage || params.limit) || filtered.length || 10
    );
    const start = (page - 1) * pageSize;
    const pageData = filtered.slice(start, start + pageSize);

    if (config.responseType === "blob") {
      return makeResponse(
        new Blob(["Offline demo export"], { type: "text/plain" }),
        config
      );
    }

    return makeResponse(
      {
        data: pageData,
        total: filtered.length,
        current_page: page,
        per_page: pageSize,
        last_page: Math.max(1, Math.ceil(filtered.length / pageSize)),
      },
      config
    );
  }

  if (method === "post") {
    const id = `demo-${resource}-${Date.now()}`;
    const record = {
      ...requestData,
      id: requestData.id || id,
      _id: requestData._id || requestData.id || id,
      uuid: requestData.uuid || id,
      status: requestData.status ?? 1,
      demo: true,
    };
    database[resource] = [...records, record];
    getStorage().setItem(DEMO_STORAGE_KEY, JSON.stringify(database));
    return makeResponse(record, config, 201);
  }

  if (method === "put" || method === "patch") {
    const id = remainder.split("/")[0];
    const index = records.findIndex((item) => findRecord([item], id));
    const record = {
      ...(index >= 0 ? records[index] : {}),
      ...requestData,
      id: requestData.id || (index >= 0 ? records[index].id : id),
      _id: requestData._id || (index >= 0 ? records[index]._id : id),
      demo: true,
    };
    const updated = [...records];
    if (index >= 0) updated[index] = record;
    else updated.push(record);
    database[resource] = updated;
    getStorage().setItem(DEMO_STORAGE_KEY, JSON.stringify(database));
    const updatedListResources = new Set([
      "applications",
      "apply-loan-steps",
      "categories",
      "customer-voices",
      "downpayment-setups",
      "first-due-date-setups",
    ]);
    return makeResponse(
      { data: updatedListResources.has(resource) ? updated : record },
      config
    );
  }

  if (method === "delete") {
    const id = remainder.split("/")[0];
    const updated = records.filter((item) => !findRecord([item], id));
    database[resource] = updated;
    getStorage().setItem(DEMO_STORAGE_KEY, JSON.stringify(database));
    return makeResponse({ id }, config);
  }

  return makeResponse({ message: "Completed in offline demo mode." }, config);
};
