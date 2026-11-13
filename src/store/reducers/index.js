// third-party
import { combineReducers } from "redux";

import auth from "../../features/auth/authSlice";
import menu from "./menu";
import projectCategories from "../../features/projectcategory/projectcategorySlice";
import ourServices from "../../features/ourService/ourServiceSlice";
import applyLoanSteps from "../../features/applyLoanStep/applyLoanStepSlice";
import customerVoices from "../../features/customerVoice/customerVoiceSlice";
import fastServices from "../../features/fastService/fastServiceSlice";
import faqQuestions from "../../features/faqQuestion/faqQuestionSlice";
import faqAnswers from "../../features/faqAnswer/faqAnswerSlice";
import language from "../../features/language/languageSlice";
import userOurServices from "../../features/customerUser/ourService/ourServiceSlice";
import fastService from "../../features/customerUser/fastService/fastServiceSlice";
import faqQuestion from "../../features/customerUser/faqQuestion/faqQuestionSlice";
import faqAnswer from "../../features/customerUser/faqAnswer/faqAnswerSlice";
import applyLoanStep from "../../features/customerUser/applyLoanStep/applyLoanStepSlice";
import customerVoice from "../../features/customerUser/customerVoice/customerVoiceSlice";
import downPaymentSetups from "../../features/downPaymentSchemeSetup/downPaymentSchemeSetupSlice";
import regions from "../../features/regionSetup/regionSetupSlice";
import documentAccessSetups from "../../features/documentAccessSetup/documentAccessSetupSlice";
import firstDueDateSetups from "../../features/firstDueDateSetup/firstDueDateSetupSlice";
import users from "../../features/users/usersSlice";
import nrcStates from "../../features/nrcState/nrcStateSlice";
import nrcTownships from "../../features/nrcTownship/nrcTownshipSlice";
import projectUsersCategories from "../../features/customerUser/projectcategory/projectcategorySlice";
import vehicles from "../../features/vehicleSetup/vehicleSetupSlice";
import dealers from "../../features/dealerSetup/dealerSetupSlice";
import dealersWebSys from "../../features/dealerSetup/dealerSetupSlice";
import applicationInformationSetup from "../../features/applicationInformationSetup/applicationInformationSetupSlice";
import applicationInformationSetupList from "../../features/ApplicationInformationSetupList/ApplicationInformationSetupSlice";
import customerBanks from "../../features/customerBank/customerBankSlice";
import nrcUserStates from "../../features/customerUser/nrcState/nrcStateSlice";
import nrcUserTownships from "../../features/customerUser/nrcTownship/nrcTownshipSlice";
import regionUserSetup from "../../features/customerUser/regionSetup/regionSetupSlice";
import userVehicles from "../../features/customerUser/vehicleSetup/vehicleSetupSlice";
import userDealers from "../../features/customerUser/dealerSetup/dealerSetupSlice";
import userCustomerBanks from "../../features/customerUser/customerBank/customerBankSlice";
import userApplication from "../../features/customerUser/application/applicationSlice";
import userDocumentAccess from "../../features/customerUser/documentAccessSetup/documentAccessSetupSlice";
import applications from "../../features/application/applicationSlice";
import userApplicationInformationSetup from "../../features/customerUser/applicationInformationSetup/applicationInformationSetupSlice"
import userFirstDueDateSetups from "../../features/customerUser/firstDueDateSetup/firstDueDateSetupSlice"
import userDownPaymentSetups from "../../features/customerUser/downPaymentSchemeSetup/downPaymentSchemeSetupSlice"
// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  auth,
  menu,
  projectCategories,
  projectUsersCategories,
  applicationInformationSetup,
  applicationInformationSetupList,
  ourServices,
  applyLoanSteps,
  customerVoices,
  fastServices,
  faqQuestions,
  faqAnswers,
  language,
  userOurServices,
  fastService,
  faqQuestion,
  faqAnswer,
  applyLoanStep,
  customerVoice,
  downPaymentSetups,
  regions,
  documentAccessSetups,
  firstDueDateSetups,
  userFirstDueDateSetups,
  users,
  nrcStates,
  nrcTownships,
  vehicles,
  dealers,
  dealersWebSys,
  customerBanks,
  nrcUserStates,
  nrcUserTownships,
  regionUserSetup,
  userVehicles,
  userDealers,
  userCustomerBanks,
  userApplication,
  userDocumentAccess,
  applications,
  userApplicationInformationSetup,
  userDownPaymentSetups
});

export default reducers;
