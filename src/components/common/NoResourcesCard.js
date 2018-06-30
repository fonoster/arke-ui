import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 275,
    position: 'relative',
    margin: '10% auto'
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function NoResourcesCard(props) {
  const { classes, resource, handleAddItem } = props;

  return (
    <div>
      <Card justify={'center'} className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            No resources found
          </Typography>
          <Typography variant="headline" component="h2">
              {resource}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            resource
          </Typography>
          <Typography component="p">
          Endpoints generates a Developer Portal for your APIs, giving your customers access to useful,
          never-outdated API documentation.<br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button style={{color: '#00c853'}} onClick={handleAddItem} color="secondary" size="small">Add {resource}</Button>
        </CardActions>
      </Card>
    </div>
  );
}

NoResourcesCard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NoResourcesCard);
