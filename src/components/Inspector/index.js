import React, { Component} from 'react';
import CSSModules from 'react-css-modules';
import { inject, observer } from 'mobx-react';

import styles from './styles/index.css';

@inject('view_store', 'torrents_store')
@observer
@CSSModules(styles)
class Inspector extends Component {
  constructor(props) {
    super(props);

    this.renderInspector = this.renderInspector.bind(this);
    this.renderActivity = this.renderActivity.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
  }

  renderActivity(torrent) {
    const activity = [
      {value: torrent.totalSize, label: 'Have'},
      {value: 12, label: 'Availability'},
      {value: 13, label: 'Uploaded'},
      {value: 14, label: 'Downloaded'},
      {value: 55, label: 'State'},
      {value: 55, label: 'Running Time'},
      {value: 55, label: 'Remaining Time'},
      {value: 55, label: 'Last Activity'},
      {value: 55, label: 'Error'},
    ];

    return (
      <div>
        <h2>Activity</h2>
        {activity.map((activity) => (
          <div styleName='row'>
            <div styleName='key'>{activity.label}:</div>
            <div styleName='value'>{activity.value}</div>
          </div>
        ))}
      </div>
    );
  }

  renderDetails(torrent) {
    const detail = [
      {value: 11, label: 'Size'},
      {value: torrent.downloadDir, label: 'Location'},
      {value: 13, label: 'Hash'},
      {value: 14, label: 'Privacy'},
      {value: 55, label: 'Origin'},
      {value: 55, label: 'Comment'},
    ];

    return (
      <div>
        <h2>Details</h2>
        {detail.map((detail) => (
          <div styleName='row'>
            <div styleName='key'>{detail.label}:</div>
            <div styleName='value'>{detail.value}</div>
          </div>
        ))}
      </div>
    );
  }

  renderInspector() {
    const torrentId = this.props.view_store.selectedTorrents[0]; //TODO: Fix no selection
    const torrent = this.props.torrents_store.torrents.find((torrent) => torrent.id === torrentId);

    return (
      <div styleName='inspector'>
        <h1>{torrent.name}</h1>
        {this.renderActivity(torrent)}
        {this.renderDetails(torrent)}
      </div>
    );
  }

  render() {
    const isInspectorShown = this.props.view_store.isInspectorShown;
    return (
      <div styleName='inspectorContainer'>
        {isInspectorShown && this.renderInspector()}
      </div>
    );
  }
}

export default Inspector;