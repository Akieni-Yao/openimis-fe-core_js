import React, { Component } from "react";
import { withTheme, withStyles } from "@material-ui/core/styles";
import { injectIntl } from "react-intl";
import { TextField, InputAdornment } from "@material-ui/core";
import { formatMessage } from "../../helpers/i18n";
import { AttachMoney } from "@material-ui/icons";
const styles = (theme) => ({
  label: {
    color: theme.palette.text.primary,
  },
  // NOTE: This is used to hide the increment/decrement arrows from the number input
  numberInput: {
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
});

class TextInput extends Component {
  state = {
    value: "",
  };
  componentDidMount() {
    let value = this.props.value;
    if (!!this.props.formatInput) {
      value = this.props.formatInput(value);
    }
    if (value !== this.state.value) {
      this.setState({ value });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.reset !== this.props.reset || prevProps.value !== this.props.value) {
      let value = this.props.value;
      if (!!this.props.formatInput) {
        value = this.props.formatInput(value);
      }
      if (value !== this.state.value) {
        this.setState({ value });
      }
    }
  }
  _onChange = (e) => {
    let { value } = e.target;
    if (this.props.formatInput) {
      value = this.props.formatInput(value);
    }
    if (this.props.CapitalThreeLetterLimit) {
      value = value.slice(0, 3).toUpperCase(); // Restrict to 3 letters and capitalize them
    }
    if (value !== this.state.value) {
      this.setState({ value }, () => this.props.onChange && this.props.onChange(this.state.value));
    }
  };
  render() {
    const {
      intl,
      classes,
      module,
      label,
      readOnly = false,
      error = null,
      startAdornment = null,
      endAdornment = null,
      inputProps = {},
      formatInput = null,
      helperText,
      type,
      capitalize,
      isNumber,
      ...others
    } = this.props;
    const inputClass = readOnly ? classes.disabledInput : "";
    let transformedValue = this.state.value;

    // Capitalize the value if the capitalize prop is true
    // if (capitalize && transformedValue) {
    //   transformedValue = transformedValue.toUpperCase();
    // }
    return (
      <TextField
        {...others}
        // className={classes.numberInput}
        className={`${classes.numberInput} ${inputClass}`}
        fullWidth
        disabled={readOnly}
        label={!!label && formatMessage(intl, module, label)}
        InputLabelProps={{
          className: classes.label,
          style: {
            color: !!readOnly && "#7f7f7f",
          },
        }}
        InputProps={{
          style: {
            color: !!readOnly && "#7f7f7f",
          },
          startAdornment: (
            <InputAdornment position="start">
              {isNumber && <span style={{ fontWeight: "bold" }}>XAF</span>}
            </InputAdornment>
          ),
          inputProps: {
            style: {
              textTransform: !!capitalize && "capitalize",
            },
          },
        }}
        onChange={this._onChange}
        // value={transformedValue}
        value={this.state.value}
        error={Boolean(error)}
        helperText={error ?? helperText}
        type={type}
      />
    );
  }
}

export default injectIntl(withTheme(withStyles(styles)(TextInput)));
