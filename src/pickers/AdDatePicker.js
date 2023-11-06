import React, { Component } from "react";
import moment from "moment";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from "react-intl";
import { FormControl } from "@material-ui/core";
import { DatePicker as MUIDatePicker } from "@material-ui/pickers";
import { formatMessage, toISODate } from "../helpers/i18n";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "moment/locale/fr";

const styles = (theme) => ({
  label: {
    color: theme.palette.text.primary,
  },
});

function fromISODate(s) {
  if (!s) return null;
  return moment(s).toDate();
}

class AdDatePicker extends Component {
  state = { value: null };

  componentDidMount() {
    this.setState((state, props) => ({ value: props.value || null }));
  }

  componentDidUpdate(prevState, prevProps, snapshot) {
    if (prevState.value !== this.props.value) {
      this.setState((state, props) => ({ value: fromISODate(props.value) }));
    }
  }

  dateChange = (d) => {
    this.setState({ value: d }, (i) => this.props.onChange(toISODate(d)));
  };

  render() {
    const {
      intl,
      classes,
      disablePast,
      module,
      label,
      readOnly = false,
      required = false,
      fullWidth = true,
      format = "YYYY-MM-DD",
      reset,
      ...otherProps
    } = this.props;
    let userlang = localStorage.getItem("userLanguage");
    let locale = userlang === "fr" ? "fr" : "en";
    moment.locale(locale);
    return (
      <FormControl fullWidth={fullWidth}>
        <MuiPickersUtilsProvider utils={MomentUtils} locale={locale} libInstance={moment}>
          <MUIDatePicker
            {...otherProps}
            format={format}
            // format="L"
            // format={customFormat}
            disabled={readOnly}
            required={required}
            clearable
            value={this.state.value}
              InputLabelProps={{
                className: classes.label,
              style: {
                color: readOnly ? '#7f7f7f' : "'#4c4c4c'",
              },
            }}
          InputProps={{
            style: {
              color: readOnly ? '#7f7f7f' : '#4c4c4c',
            },
            }}
            label={!!label ? formatMessage(intl, module, label) : null}
            onChange={this.dateChange}
            reset={reset}
            disablePast={disablePast}
            views={["year", "month", "date"]}
            okLabel={formatMessage(intl, "core", "datePicker.ok")}
            clearLabel={formatMessage(intl, "core", "datePicker.clear")}
            cancelLabel={formatMessage(intl, "core", "datePicker.cancel")}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
    );
  }
}

export default injectIntl(withTheme(withStyles(styles)(AdDatePicker)));
