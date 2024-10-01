import React, { Component } from "react";
import moment from "moment";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from "react-intl";
import { FormControl, TextField } from "@material-ui/core";
import { TimePicker as MUITimePicker } from "@material-ui/pickers";
import { formatMessage } from "../helpers/i18n";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import "moment/locale/fr";

const styles = (theme) => ({
    label: {
        color: theme.palette.text.primary,
    },
});

function fromISODate(timeStr) {
    if (!timeStr) return null;
  
    // Log what is being passed to moment
    console.log("Converting time string:", timeStr);
    
    // Ensure the time string is in "HH:mm:ss" format
    const time = moment(timeStr, "HH:mm:ss");
    
    // Check if the date is valid
    if (!time.isValid()) {
      console.error("Invalid time format:", timeStr);
      return null;
    }
  
    return time.toDate();  // Convert the moment object to a JavaScript Date object
  }
  

class AdTimePicker extends Component {
    state = { value: null };
  
    componentDidMount() {
      if (this.props.value) {
        console.log("Initial value:", this.props.value);
        this.setState({ value: fromISODate(this.props.value) });
      }
    }
  
    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
          console.log("Previous value:", prevProps.value);
          console.log("Current value received:", this.props.value);
      
          if (this.props.value) {
            const parsedDate = fromISODate(this.props.value);
            if (parsedDate) {
              this.setState({ value: parsedDate });
            } else {
              console.error("Failed to parse time:", this.props.value);
            }
          }
        }
      }
      
  
      dateChange = (d) => {
        if (!d) {
          this.setState({ value: null }, () => this.props.onChange(null));
          return;
        }
        
        // Format the date as "HH:mm:ss" and update state
        const formattedTime = moment(d).format('HH:mm:ss');
        this.setState({ value: d }, () => this.props.onChange(formattedTime));
      };
      
  
    render() {
      const {
        intl,
        classes,
        readOnly = false,
        required = false,
        fullWidth = true,
        label,
        ...otherProps
      } = this.props;
  
      let userlang = localStorage.getItem("userLanguage");
      let locale = userlang === "fr" ? "fr" : "en";
      moment.locale(locale);
  console.log("value",this.state.value)
      return (
        <FormControl fullWidth={fullWidth}>
          <MuiPickersUtilsProvider utils={MomentUtils} locale={locale} libInstance={moment}>
            <MUITimePicker
              {...otherProps}
              format="HH:mm:ss" // Format for time picker
              disabled={readOnly}
              required={required}
              clearable
              value={this.state.value}
              InputLabelProps={{
                className: classes.label,
                style: {
                  color: readOnly ? '#7f7f7f' : '#4c4c4c',
                },
              }}
              InputProps={{
                style: {
                  color: readOnly ? '#7f7f7f' : '#4c4c4c',
                },
              }}
              label={!!label ? formatMessage(intl, module, label) : null}
              onChange={this.dateChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={this.state.value ? moment(this.state.value).format("HH:mm:ss") : ''}
                  helperText={null}
                />
              )}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
      );
    }
  }
  

export default injectIntl(withTheme(withStyles(styles)(AdTimePicker)));
