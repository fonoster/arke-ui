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
      const { appStore, apiStore } = this.props
      const hasData = () => apiStore.getResources().length > 0
      const getTitle = () => toTitleCase(appStore.getCurrentSection())
      const columnData = getColumnData(appStore.getCurrentSection())
      const data = apiStore.getResources()

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
