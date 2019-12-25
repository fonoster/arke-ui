export const styles = theme => ({
  heading: {
     fontSize: theme.typography.pxToRem(15),
     flexBasis: '33.33%',
     flexShrink: 0,
  },
  secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
  },
  textField: {
     marginBottom: 10,
     width: 320,
     marginRight: 10,
  },
  bcLink: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
      display: 'flex',
  },
  link2: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
      display: 'flex',
  },
  root: {
    marginBottom: theme.spacing(2),
  },
  link: {
    display: 'flex',
    marginTop: 5
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
})
