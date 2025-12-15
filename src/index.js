import {
  apiHeaders,
  baseApiUrl,
  clearCurrentPaginationPage,
  coreAlert,
  coreConfirm,
  fetchMutation,
  graphql,
  graphqlMutation,
  graphqlMutationLegacy,
  graphqlWithVariables,
  journalize,
  login,
  prepareMutation,
  waitForMutation,
} from "./actions";
import App from "./components/App";
import GedAlertBanner from "./components/GedAlertBanner";
import KeepLegacyAlive from "./components/KeepLegacyAlive";
import RefreshAuthToken from "./components/RefreshAuthToken";
import ConfirmDialog from "./components/dialogs/ConfirmDialog";
import SelectDialog from "./components/dialogs/SelectDialog";
import AlertForwarder from "./components/generics/AlertForwarder";
import Block from "./components/generics/Block";
import CommonSnackbar from "./components/generics/CommonSnakbar";
import ConstantBasedPicker from "./components/generics/ConstantBasedPicker";
import Contributions from "./components/generics/Contributions";
import ControlledField from "./components/generics/ControlledField";
import Error from "./components/generics/Error";
import FatalError from "./components/generics/FatalError";
import FieldLabel from "./components/generics/FieldLabel";
import Form from "./components/generics/Form";
import FormPanel from "./components/generics/FormPanel";
import FormattedMessage from "./components/generics/FormattedMessage";
import MainMenuContribution from "./components/generics/MainMenuContribution";
import PagedDataHandler from "./components/generics/PagedDataHandler";
import Picker from "./components/generics/Picker";
import ProgressOrError from "./components/generics/ProgressOrError";
import ProxyPage from "./components/generics/ProxyPage";
import PublishedComponent from "./components/generics/PublishedComponent";
import Searcher from "./components/generics/Searcher";
import SearcherExport from "./components/generics/SearcherExport";
import SearcherPane from "./components/generics/SearcherPane";
import Table from "./components/generics/Table";
import AmountInput from "./components/inputs/AmountInput";
import AutoSuggestion from "./components/inputs/AutoSuggestion";
import Autocomplete from "./components/inputs/Autocomplete";
import FakeInput from "./components/inputs/FakeInput";
import NumberInput from "./components/inputs/NumberInput";
import SelectInput from "./components/inputs/SelectInput";
import TextAreaInput from "./components/inputs/TextAreaInput";
import TextInput from "./components/inputs/TextInput";
import ValidatedTextInput from "./components/inputs/ValidatedTextInput";
import ErrorBoundary from "./helpers/ErrorBoundary";
import Helmet from "./helpers/Helmet";
import {
  decodeId,
  dispatchMutationErr,
  dispatchMutationReq,
  dispatchMutationResp,
  encodeId,
  formatGQLString,
  formatGraphQLError,
  formatMutation,
  formatNodeQuery,
  formatPageQuery,
  formatPageQueryWithCount,
  formatQuery,
  formatServerError,
  formatSorter,
  openBlob,
  pageInfo,
  parseData,
  sort,
} from "./helpers/api";
import { downloadExport } from "./helpers/downloadExport";
import withHistory, {
  historyPush,
  Link,
  NavLink,
  Redirect,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "./helpers/history";
import {
  useAuthentication,
  useBoolean,
  useDebounceCb,
  useGraphqlMutation,
  useGraphqlQuery,
  usePrevious,
  useUserQuery,
} from "./helpers/hooks";
import {
  formatAmount,
  formatDateFromISO,
  formatMessage,
  formatMessageWithValues,
  toISODate,
  useTranslations,
  withTooltip,
} from "./helpers/i18n";
import { formatJsonField } from "./helpers/jsonExt";
import withModulesManager, { useModulesManager } from "./helpers/modules";
import { authMiddleware } from "./middlewares";
import Role from "./pages/Role";
import Roles from "./pages/Roles";
import AdDatePicker from "./pickers/AdDatePicker";
import AdTimePicker from "./pickers/AdTimePicker";
import LanguagePicker from "./pickers/LanguagePicker";
import MonthPicker from "./pickers/MonthPicker";
import NeDatePicker from "./pickers/NeDatePicker";
import YearPicker from "./pickers/YearPicker";
import reducer from "./reducer";
import messages_en from "./translations/en.json";
import messages_fr from "./translations/fr.json";
const ROUTE_ROLES = "roles";
const ROUTE_ROLE = "roles/role";

const DEFAULT_CONFIG = {
  "translations": [
    { key: "en", messages: messages_en },
    { key: "fr", messages: messages_fr },
  ],
  "reducers": [{ key: "core", reducer: reducer }],
  "middlewares": [authMiddleware],
  "refs": [
    { key: "core.JournalDrawer.pollInterval", ref: 2000 },
    { key: "core.KeepLegacyAlive.pollInterval", ref: 300000 },
    { key: "core.YearPicker", ref: YearPicker },
    { key: "core.MonthPicker", ref: MonthPicker },
    { key: "core.LanguagePicker", ref: LanguagePicker },
    { key: "core.route.role", ref: ROUTE_ROLE },
    { key: "core.AdTimePicker", ref: AdTimePicker },
  ],
  "core.Boot": [KeepLegacyAlive, RefreshAuthToken],
  "core.Router": [
    { path: ROUTE_ROLES, component: Roles },
    { path: ROUTE_ROLE + "/:role_uuid?", component: Role },
  ],
  // "admin.MainMenu": [
  //   {
  //     text: <FormattedMessage module="core" id="roleManagement.label" />,
  //     icon: <AccountBox />,
  //     route: "/" + ROUTE_ROLES,
  //     filter: (rights) => rights.includes(RIGHT_ROLE_SEARCH),
  //   },
  // ],
};

export const CoreModule = (cfg) => {
  let def = { ...DEFAULT_CONFIG };
  let DatePicker = AdDatePicker;
  if (cfg.datePicker === "ne") {
    DatePicker = NeDatePicker;
  }
  def.refs.push({ key: "core.DatePicker", ref: DatePicker });
  return { ...def, ...cfg };
};

export function combine(...hocs) {
  return function (Component) {
    return hocs.reduceRight((acc, hoc) => hoc(acc), Component);
  };
}

export * from "./helpers/utils";

export {
  AlertForwarder,
  AmountInput,
  apiHeaders,
  App,
  Autocomplete,
  AutoSuggestion,
  baseApiUrl,
  Block,
  clearCurrentPaginationPage,
  CommonSnackbar,
  ConfirmDialog,
  ConstantBasedPicker,
  Contributions,
  ControlledField,
  coreAlert,
  coreConfirm,
  decodeId,
  dispatchMutationErr,
  dispatchMutationReq,
  dispatchMutationResp,
  downloadExport,
  encodeId,
  Error,
  ErrorBoundary,
  FakeInput,
  FatalError,
  fetchMutation,
  FieldLabel,
  Form,
  formatAmount,
  formatDateFromISO,
  formatGQLString,
  formatGraphQLError,
  formatJsonField,
  formatMessage,
  formatMessageWithValues,
  formatMutation,
  formatNodeQuery,
  formatPageQuery,
  formatPageQueryWithCount,
  formatQuery,
  formatServerError,
  formatSorter,
  FormattedMessage,
  FormPanel,
  GedAlertBanner,
  graphql,
  graphqlMutation,
  graphqlMutationLegacy,
  graphqlWithVariables,
  Helmet,
  historyPush,
  journalize,
  LanguagePicker,
  Link,
  login,
  MainMenuContribution,
  MonthPicker,
  NavLink,
  NumberInput,
  openBlob,
  PagedDataHandler,
  pageInfo,
  parseData,
  Picker,
  prepareMutation,
  ProgressOrError,
  ProxyPage,
  PublishedComponent,
  Redirect,
  Searcher,
  SearcherExport,
  SearcherPane,
  SelectDialog,
  SelectInput,
  sort,
  Table,
  TextAreaInput,
  TextInput,
  toISODate,
  useAuthentication,
  useBoolean,
  useDebounceCb,
  useGraphqlMutation,
  useGraphqlQuery,
  useHistory,
  useLocation,
  useModulesManager,
  useParams,
  usePrevious,
  useRouteMatch,
  useTranslations,
  useUserQuery,
  ValidatedTextInput,
  waitForMutation,
  withHistory,
  withModulesManager,
  withTooltip,
  YearPicker,
};
