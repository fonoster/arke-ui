import React from 'react';
import EnhancedTable from '../common/EnhancedTable'
import DocViewer from '../common/DocViewer'
import NotificationBar from '../common/NotificationBar'
import FileUploader from '../common/FileUploader'
import NoResourcesCard from '../common/NoResourcesCard'

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

class Resources extends React.Component {

    constructor() {
        super()
        this.state = {
            docViewerOpen: false,
            docViewerContent: '',
            notificationBarOpen: false,
            notificationBarMessage: '',
            fileUploaderOpen: false,
        }
    }

    handleOpenDocViewer = (e, doc) => {
        const docViewerContent = JSON.stringify(JSON.parse(doc), null, "\t")
        const docViewerOpen = true
        this.setState({docViewerOpen, docViewerContent})
    }

    handleCloseDocViewer = (e) => {
        const docViewerContent = ''
        const docViewerOpen = false
        this.setState({docViewerOpen, docViewerContent})
    }

    render() {
      const { endpoint, resource, columnData, data, handleChangeResource, handleDeleteItems } = this.props;

      return (
          <div>
             { data.length > 0 && <EnhancedTable
              name={toTitleCase(resource)}
              hide={true}
              columnData= {columnData}
              data={data}
              handleOpenDocViewer = { (e, doc) => this.handleOpenDocViewer(e, doc)}
              handleDeleteItems = { handleDeleteItems }
              handleAddItem = { e => this.setState({ fileUploaderOpen: true }) } /> }

            { data.length == 0 && <NoResourcesCard resource={toTitleCase(resource)}
              handleAddItem={ e => this.setState({ fileUploaderOpen: true }) }/> }

            <DocViewer
                open={this.state.docViewerOpen}
                content={this.state.docViewerContent}
                handleClose = { e => this.handleCloseDocViewer(e)} />
                
            <FileUploader open={this.state.fileUploaderOpen}
                handleClose={ e => {
                  this.setState({fileUploaderOpen: false});
                  handleChangeResource(e, resource);
                }}
                endpoint= { endpoint } />
            <NotificationBar
                message={ this.state.notificationBarMessage }
                open={ this.state.notificationBarOpen}
                handleClose = { e => this.setState({ notificationBarOpen: false })} />
          </div>
      );
    }
  }

export default Resources;
