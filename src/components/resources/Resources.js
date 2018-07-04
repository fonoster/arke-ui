import React from 'react';
import EnhancedTable from '../common/EnhancedTable'
import DocViewer from '../common/DocViewer'
import FileUploader from './FileUploader'
import NoResourcesCard from './NoResourcesCard'
import { toTitleCase } from '../common/utils'

class Resources extends React.Component {

    constructor() {
        super()
        this.state = {
            docViewerOpen: false,
            docViewerContent: '',
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
      const { endpoint, resource, columnData, data, handleNotify, handleChangeSection, handleDeleteItems } = this.props;

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

            { data.length === 0 && <NoResourcesCard resource={toTitleCase(resource)}
              handleAddItem={ e => this.setState({ fileUploaderOpen: true }) }/> }

            <DocViewer
                open={this.state.docViewerOpen}
                content={this.state.docViewerContent}
                handleClose = { e => this.handleCloseDocViewer(e)} />

            <FileUploader open={this.state.fileUploaderOpen}
                endpoint= { endpoint }
                handleClose = { e => {
                    this.setState({fileUploaderOpen: false});
                }}
                handleOnSuccess={ (e, res) => {
                    handleNotify(res);
                    this.setState({fileUploaderOpen: false});
                    handleChangeSection(e, resource);
                }} />
          </div>
      );
    }
  }

export default Resources;
