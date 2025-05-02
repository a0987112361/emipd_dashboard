import React from 'react';
import PropTypes from 'prop-types';
// import { Typography, Button } from '@material-ui/core';
// import { withStyles } from '@material-ui/core/styles';

import { FormInput } from 'src/Components';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#e6e6e6',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
  },
  wrapper: {
    width: '550px',
    height: '700px',
    backgroundColor: 'white',
    margin: 'auto',
    marginTop: `${(window.innerHeight - 700) / 2}px`,
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  header: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '60px',
  },
  btnStyle: {
    width: '100%',
    height: '50px',
  },
  btnBox: {
    margin: '32px',
    marginTop: '60px',
  },
  iconImg: {
    width: '240px',
    height: '160px',
  },
  iconBox: {
    marginTop: '60px',
    width: '100%',
    textAlign: 'center',
  },
});

class FormView extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
  };

  static defaultProps = {};

  state = {
    text: '',
    password: '',
  };

  render() {
    const { classes } = this.props;
    const { text, password } = this.state;

    return (
      <div className={styles.root}>
        {/* <div className={classes.wrapper}>
          <Typography variant="h3" className={classes.header}>
            This is Project Name
          </Typography>
          <FormInput
            title="Account"
            required
            placeholder="Enter Account"
            value={text}
            onChange={(value) =>
              this.setState({
                text: value,
              })
            }
          />
          <FormInput
            title="Password"
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(value) =>
              this.setState({
                password: value,
              })
            }
          />
          <div className={classes.btnBox}>
            <Button className={classes.btnStyle} variant="contained" color="primary">
              Login
            </Button>
          </div>
          <div className={classes.iconBox}>
            <img src="https://fakeimg.pl/240x160/" className={classes.iconImg} />
          </div>
        </div> */}
      </div>
    );
  }
}

export default FormView;
