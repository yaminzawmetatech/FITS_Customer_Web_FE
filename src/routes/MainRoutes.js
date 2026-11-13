import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import CustomerLayout from '../layout/MainLayout/CustomerLayout';
import DashboardLayout from '../layout/MainLayout/DashboardLayout';
import Loadable from "../components/Loadable";
import ProjectCategoryIndex from "../pages/Administration/ProjectCategory/ProductCategoryList";
import ApplyLoanStepIndex from '../pages/Administration/ApplyLoanStep/ApplyLoanStepList';
import FastServiceIndex from '../pages/Administration/FastService/FastServiceList';
import FAQQuestionIndex from '../pages/Administration/FaqQuestion/FaqQuestionList';
import FAQAnswerIndex from '../pages/Administration/FaqAnswer/FaqAnswerList';
import ContactUs from '../pages/contactUs/contactUs';
// Protected Route Wrapper Component
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const token = user?.access_token;
  return token ? children : <Navigate to="/login" replace />;
};

const Home = Loadable(lazy(() => import('../pages/home/HomePageWrapper')));
const AboutUsPage = Loadable(lazy(() => import('../pages/aboutUs/AboutUsPage')));
const FaqPage = Loadable(lazy(() => import('../pages/faq/FaqPage')));
const Dashboard = Loadable(lazy(() => import('../pages/dashboard/index')));
const LoanCalculatorPage = Loadable(lazy(() => import('../pages/LoanCalculator/LoanCalculatorPage')));


const OurServiceIndex = Loadable(
  lazy(() =>
    import(
      "../pages/Administration/OurService/OurServiceList"
    )
  )
);

const CustomerVoiceIndex = Loadable(
  lazy(() =>
    import(
      "../pages/Administration/CustomerVoice/CustomerVoiceList"
    )
  )
);

const DownPaymentSchemeIndex = Loadable(
  lazy(() =>
    import(
      "../pages/Administration/DownPaymentSchemeSetup/DownPaymentSchemeSetupList"
    )
  )
);

const RegionIndex = Loadable(
  lazy(() =>
    import(
      "../pages/Administration/RegionSetup/RegionSetupList"
    )
  )
);

const DocumentAccessIndex = Loadable(
  lazy(() =>
    import(
      "../pages/Administration/DocumentAccessSetup/DocumentAccessSetupList"
    )
  )
);

const FirstDueDateSetupIndex = Loadable(
  lazy(() =>
    import("../pages/Administration/FirstDueDateSetup/FirstDueDateSetupList")
  )
);

const UsersIndex = Loadable(
  lazy(() =>
    import("../pages/Administration/Users/UsersList")
  )
);

const NRCStateIndex = Loadable(
  lazy(() =>
    import("../pages/Administration/NRCState/NRCStateList")
  )
);

const NRCTownshipIndex = Loadable(
  lazy(() =>
    import("../pages/Administration/NRCTownship/NRCTownshipList")
  )
);

const VehicleSetupIndex = Loadable(
  lazy(() =>
    import("../pages/Administration/VehicleSetup/VehicleSetupList")
  )
);

const DealersIndex = Loadable(
  lazy(() =>
    import("../pages/Administration/DealerSetup/DealerSetupList")
  )
);

const CreateApplicationInformationSetup = Loadable(
  lazy(() =>
    import(
      "../pages/ApplicationInformationSetup/CreateApplicationInformationSetup"
    )
  )
);

const ApplicationInformationSetupList = Loadable(
  lazy(() =>
    import(
      "../pages/ApplicationInformationSetupList/ApplicationInformationSetupList"
    )
  )
);

const CustomerBankList = Loadable(
  lazy(() =>
    import(
      "../pages/Administration/CustomerBank/CustomerBankList"
    )
  )
);

const ApplicationTableIndex = Loadable(
  lazy(() =>
    import(
      "../pages/Administration/ApplicationInformationList/ApplicationInformationTable"
    )
  )
);

const CreateApplicationInformationIndex = Loadable(
  lazy(() =>
    import(
      "../pages/CreateApplicationInformation/CreateApplicationInformationIndex"
    )
  )
);

const CreateApplicationInformationIndexs = Loadable(
  lazy(() =>
    import(
      "../pages/Administration/ApplicationInformationList/CreateApplicationInformation/CreateApplicationInformationIndex"
    )
  )
);

const MainRoutes = [
  {
    path: '/',
    element: <CustomerLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'about-us', element: <AboutUsPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'loan-calculator', element: <LoanCalculatorPage /> },
      { path: 'apply-now', element: <CreateApplicationInformationIndex /> },
      { path: 'contact', element: <ContactUs /> },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Dashboard /> },
      {
        path: "administration",
        children: [
          {
            path: "product-category",
            element: <ProjectCategoryIndex />,
          },
          {
            path: "apply-loan-step",
            element: <ApplyLoanStepIndex />,
          },
          {
            path: "our-services",
            element: <OurServiceIndex />,
          },
          {
            path: "fast-service",
            element: <FastServiceIndex />,
          },
          {
            path: "faq-question",
            element: <FAQQuestionIndex />,
          },
          {
            path: "faq-answer",
            element: <FAQAnswerIndex />,
          },
          // { 
          //   path: "ApplicationInfrmationSetupList",
          //   element: <ApplicationInfrmationSetupList />,
          // },
          // {
          //   path: "ApplicationInformationSetup",
          //   element: <CreateApplicationInformationSetup />,
          // },
          // {
          //   path: "ApplicationInformationSetup/:uuid",
          //   element: <CreateApplicationInformationSetup />,
          // },
          // {
          //   path: "ApplicationInformationSetup/:id/:mode",
          //   element: <CreateApplicationInformationSetup />,
          // },
          {
            path: "our-services",
            element: <OurServiceIndex />,
          },
          {
            path: "customer-voices",
            element: <CustomerVoiceIndex />,
          },
          {
            path: "downpayment-setup",
            element: <DownPaymentSchemeIndex />,
          },
          {
            path: "region-setup",
            element: <RegionIndex />,
          },
          {
            path: "document-access-setup",
            element: <DocumentAccessIndex />,
          },
          {
            path: "first-due-date-setup",
            element: <FirstDueDateSetupIndex />,
          },
          {
            path: "users",
            element: <UsersIndex />,
          },
          {
            path: "nrc-states",
            element: <NRCStateIndex />,
          },
          {
            path: "nrc-townships",
            element: <NRCTownshipIndex />,
          },
          {
            path: "vehicle-setup",
            element: <VehicleSetupIndex />,
          },
          {
            path: "dealers",
            element: <DealersIndex />,
          },
          {
            path: "application-info-setup",
            element: <CreateApplicationInformationSetup />,
          },
          {
            path: "application-info-setup/:uuid",
            element: <CreateApplicationInformationSetup />,
          },
          {
            path: "application-info-setup/:id/:mode",
            element: <CreateApplicationInformationSetup />,
          },
          {
            path: "application-info-setup-list",
            element: <ApplicationInformationSetupList />,
          },
          {
            path: "customer-banks",
            element: <CustomerBankList />,
          },
          {
            path: "applications",
            element: <ApplicationTableIndex />,
          },

          {
            path: "CreateApplicationInformation/:categoryName/:selectedProductId/:uuid/:id/:mode?",
            element: <CreateApplicationInformationIndexs />,
          },

        ],
      },
    ],
  },
  {
    path: "CreateApplicationInformation/:categoryName/:selectedProductId/:uuid/:id/:mode?",
    element: <CreateApplicationInformationIndexs />,
  },
];

export default MainRoutes;
