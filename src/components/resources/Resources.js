import React from 'react';
import EnhancedTable from '../common/EnhancedTable'
import ResourceViewer from '../common/ResourceViewer'
import FileUploader from './FileUploader'
import NoResourcesCard from './NoResourcesCard'
import { toTitleCase } from '../common/utils'
import { getColumnData } from '../common/dataStruct'
import { observer, inject } from 'mobx-react'

class Resources extends React.Component {

    render() {
      const hasData = () => this.props.apiStore.getResources().length > 0
      const getTitle = () => toTitleCase(this.props.appStore.getCurrentSection())
      const columnData = getColumnData(this.props.appStore.getCurrentSection())
      const data = this.props.apiStore.getResources()

      return (
          <div>
            { hasData() &&
               <EnhancedTable  hide={ true } name={ getTitle() }
                columnData= { columnData }
                data={ data } />
            }

            { !hasData() &&
                <NoResourcesCard resource={getTitle()}
                handleAddItem={ e => this.setState({ fileUploaderOpen: true }) }/>
            }

            <ResourceViewer />
            <FileUploader/>
          </div>
      );
    }
  }

export default inject('apiStore')(inject('appStore')(observer(Resources)))
