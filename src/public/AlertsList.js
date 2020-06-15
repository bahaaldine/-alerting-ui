import React, { Component } from "react";

import _ from 'lodash';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as alertActions from "./actions/alertActions";
import * as teamActions from "./actions/teamActions";

import {
  EuiBasicTable,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSectionItemButton, EuiBadge, EuiIcon, EuiAvatar,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiButton,
  EuiComboBox,
  EuiHealth
} from "@elastic/eui";

import "./AlertsList.css";

class AlertsList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      pageSize: 10,
      sortField: 'Remediated',
      sortDirection: 'asc',
      selectedOptions: []
    }
  }
  
  componentDidMount() {
    this.props.alertActions.getAlertsList();
    this.props.teamActions.getTeam();
  }

  render() {

    const onChange = selectedOptions => {
      this.setState({selectedOptions});
    };

    const columns = [
      {
        field: "timestamp",
        name: "Timestamp",
      },
      
      {
        field: "Incident type",
        name: "Incident type",
      },
      {
        name: "Assigned to",
        actions: [
          {        
            name: 'Assign to',
            description: 'Assign to',
            type: "button",
            width: '200px',
            render: (item) => {
              return <EuiComboBox
                placeholder="Select"
                singleSelection={{ asPlainText: true }}
                options={this.props.team}
                selectedOptions={this.state.selectedOptions}
                onChange={onChange}
                isClearable={false} />
            }
          }
        ]
      },
      {
        name: 'Actions',
        actions: [
          {
            name: 'Acknowledge',
            description: 'Acknowledge',
            type: 'button',
            icon: 'checkInCircleFilled',
            render: item => {
              if ( item["Remediated"] !== "Y" ) {
                return <EuiButton size="s" onClick={() => console.log(item)}>Acknowledge</EuiButton>
              } else {
                return <EuiBadge
                  color="secondary"
                  iconType="checkInCircleFilled"
                  iconSide="right">Acked</EuiBadge>
              }
            }
          },
        ],
      },
      
    ];

    const getRowProps = (item) => {
      const { id } = item;
      return {
        "data-test-subj": `row-${id}`,
        className: "customRowClass",
        onClick: () => console.log(`Clicked row ${id}`),
      };
    };

    const getCellProps = (item, column) => {
      const { id } = item;
      const { field } = column;
      return {
        className: "customCellClass",
        "data-test-subj": `cell-${id}-${field}`,
        textOnly: true,
      };
    };

    const onTableChange = ({ page = {}, sort = {} }) => {
      const { index: pageIndex, size: pageSize } = page;
      const { field: sortField, direction: sortDirection } = sort;
      
      this.setState({
        pageIndex,
        pageSize,
        sortField,
        sortDirection
      });
    };

    const sorting = {
      sort: {
        field: this.state.sortField,
        direction: this.state.sortDirection,
      },
    };

    return (
      <div className="alertsList">
        <EuiHeader
          theme="dark"
          sections={[
            {
              items: [
                <EuiHeaderLogo iconType="logoElastic" href="/" aria-label="Goes to home">Elastic</EuiHeaderLogo>
              ],
              borders: "right",
            },
            {
              items: [
                <EuiBadge iconType="arrowDown" iconSide="right">Production Alerts</EuiBadge>,
                <EuiHeaderSectionItemButton aria-label="Notifications" notification={"•"}>
                  <EuiIcon type="cheer" size="m" />
                </EuiHeaderSectionItemButton>,
                <EuiHeaderSectionItemButton aria-label="Account menu">
                  <EuiAvatar name="John Username" size="s" />
                </EuiHeaderSectionItemButton>,
              ],
              borders: "none",
            },
          ]}
        />
        
        <EuiPage>
          <EuiPageBody component="div">
            <EuiPageContent>
              <EuiPageContentBody> {typeof this.props.alertsList !== "undefined" && (
                <EuiBasicTable
                  items={_.orderBy( 
                    this.props.alertsList,
                    [this.state.sortField],[this.state.sortDirection]
                  ).slice( this.state.pageIndex*this.state.pageSize  , (this.state.pageIndex+1) * this.state.pageSize)}
                  rowHeader="timestamp"
                  columns={columns}
                  rowProps={getRowProps}
                  cellProps={getCellProps}
                  pagination={{
                    pageIndex: this.state.pageIndex,
                    pageSize: this.state.pageSize,
                    totalItemCount: this.props.alertsList.length,
                    pageSizeOptions: [10, 20, 100],
                    hidePerPageOptions: false,
                  }}
                  onChange={onTableChange}
                  sorting={sorting}
                />
              )}</EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    alertsList: state.alertsList,
    team: state.team
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertActions, dispatch),
    teamActions: bindActionCreators(teamActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertsList);
