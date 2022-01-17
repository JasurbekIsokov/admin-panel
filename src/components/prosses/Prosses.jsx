import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Form from "antd/lib/form/Form";
import Search from "antd/lib/input/Search";
import Modal from "antd/lib/modal/Modal";
import "./process.css";
import Text from "antd/lib/typography/Text";
import React, { Component } from "react";
import Highlighter from "react-highlight-words";
import { prossesData } from "../../server/data"; // baza o'rniga
import {
  processSearchByDate,
  processSearchByStatus,
  processStart,
  processStop,
} from "../../server/admin/api";
import { onFinishFailed, openNotificationSuccess } from "../helpers/helper";

export default class Prosses extends Component {
  state = {
    process: [],
    filialCode: "",
    loading: false,
    isModalVisible: false,
    loadingStart: false,
    loadingStop: false,
  };

  startProcess = () => {
    this.setState({
      loading: true,
    });
  };

  searchByDate = (value) => {
    this.setState({
      loading: true,
    });
    // processSearchByDate(value)
    //   .then((res) => {
    //     if (res && Array.isArray(res.data)) {
    //       this.setState({
    //         process: res.data,
    //         loading: false,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     this.setState({
    //       loading: false,
    //     });
    //     alert(err);
    //   });

    this.setState({
      process: prossesData.filter(function (p) {
        return p.data_begin === value || p.date_end === value;
      }),
      loading: false,
    });
  };

  searchByStatus = (value) => {
    this.setState({
      loading: true,
    });
    // processSearchByStatus(value)
    //   .then((res) => {
    //     if (res && Array.isArray(res.data)) {
    //       this.setState({
    //         process: res.data,
    //         loading: false,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     this.setState({
    //       loading: false,
    //     });
    //     alert(err);
    //   });
    this.setState({
      process: prossesData.filter(function (p) {
        return p.status === value;
      }),
      loading: false,
    });
  };

  handleOkStart = () => {
    this.setState({ loadingStart: true });
    if (this.state.filialCode)
      processStart(this.state.filialCode)
        .then((res) => {
          if (res) {
            alert(res.data.result_msg);
            this.setState({
              isModalVisible: false,
              loadingStart: false,
            });
          }
        })
        .catch((err) => {
          this.setState({ loadingStart: false });
          alert(err);
        });
  };

  handleCancelStart = () => {
    this.setState({
      isModalVisible: false,
      filialCode: "",
      loadingStart: false,
    });
  };

  handleCancelStop = () => {
    this.setState({ loading: true });
    processStop(this.filialCode)
      .then((res) => {
        if (res) {
          alert(res.data.result_msg);
          this.setState({
            isModalVisible: false,
            loadingStop: false,
          });
        }
      })
      .catch((err) => {
        alert(err);
        this.setState({ loading: false });
      });
  };

  // fillter
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const prossesColumn = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        ...this.getColumnSearchProps("id"),
      },
      {
        title: "data_begin",
        dataIndex: "data_begin",
        key: "data_begin",
        ...this.getColumnSearchProps("data_begin"),
      },
      {
        title: "date_end",
        dataIndex: "date_end",
        key: "date_end",
        ...this.getColumnSearchProps("date_end"),
      },
      {
        title: "error_count",
        dataIndex: "error_count",
        key: "error_count",
        ...this.getColumnSearchProps("error_count"),
      },
      {
        title: "fact_count",
        dataIndex: "fact_count",
        key: "fact_count",
        ...this.getColumnSearchProps("fact_count"),
      },
      {
        title: "status",
        dataIndex: "status",
        key: "status",
        ...this.getColumnSearchProps("status"),
      },
      {
        title: "success_count",
        dataIndex: "success_count",
        key: "success_count",

        ...this.getColumnSearchProps("success_count"),
      },
      {
        //fixed: "right",
        title: "Actions",
        key: "action",
        width: "190px",
        render: (process) => (
          <div key={process.id}>
            <Button
              loading={this.state.loadingStop}
              type="danger"
              className="mr-25 mt-25"
              onClick={this.handleCancelStop}
            >
              Stop
            </Button>
          </div>
        ),
      },
    ];
    return (
      <div className="container">
        <Text>
          <h2 className="mt-25 mb-25">Prosseslar</h2>
          <Space direction="gorizontal" className="mb-25">
            <Search
              allowClear
              enterButton
              type={"date"}
              onSearch={this.searchByDate}
            />
            <Search
              allowClear
              enterButton
              placeholder="Prosses statusi bo'yicha"
              onSearch={this.searchByStatus}
            />
            <Button
              type="primary"
              onClick={() => this.setState({ isModalVisible: true })}
            >
              Start
            </Button>
          </Space>

          <Modal
            visible={this.state.isModalVisible}
            title={"Start process"}
            onCancel={this.handleCancelStart}
            footer={false}
          >
            <Form
              onFinish={this.handleOkStart}
              onFinishFailed={() => {
                alert("Xatolik sodir bo'ldi");
              }}
            >
              <Input
                required={true}
                allowClear
                placeholder="filial code..."
                onChange={(e) => this.setState({ filialCode: e.target.value })}
              ></Input>
              <Button
                type="primary"
                htmlType="submit"
                className="mt-25 mr-25"
                loading={this.state.loadingStart}
              >
                Start
              </Button>
              <Button
                type="danger"
                className="mt-25"
                onClick={this.handleCancelStart}
                disabled={this.state.loadingStart}
              >
                Cancel
              </Button>
            </Form>
          </Modal>

          <Table
            loading={this.state.loading}
            dataSource={this.state.process}
            columns={prossesColumn}
            scroll={{ x: "1000px", y: "360px" }}
            pagination={{ pageSize: 20 }}
            className="components-table-demo-nested"
            rowKey={"id"}
            bordered
          />
        </Text>
      </div>
    );
  }
}
