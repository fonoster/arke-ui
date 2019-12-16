import React from 'react';
import EnhancedTable from '../common/EnhancedTable'
import ResourceViewer from '../common/ResourceViewer'
import FileUploader from './FileUploader'
import NoResourcesCard from './NoResourcesCard'
import { toTitleCase } from '../common/utils'

class Resources extends React.Component {

    constructor() {
        super()
        this.state = {
            fileUploaderOpen: false,
        }
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
              handleOpenResourceViewer = { (e, resource) => this.handleOpenResourceViewer(e, resource)}
              handleDeleteItems = { handleDeleteItems }
              handleAddItem = { e => this.setState({ fileUploaderOpen: true }) } /> }

            { data.length === 0 && <NoResourcesCard resource={toTitleCase(resource)}
              handleAddItem={ e => this.setState({ fileUploaderOpen: true }) }/> }

            <ResourceViewer />

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
