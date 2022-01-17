import {
  EditOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Form from "antd/lib/form/Form";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React, { Component } from "react";
import Highlighter from "react-highlight-words";
import {
  getScheduler,
  startSchedulerAPI,
  stopSchedulerAPI,
  updateSchedulerAPI,
} from "../../server/admin/api";
import { schedulerData } from "../../server/data";

export default class Schedulers extends Component {
  state = {
    schedulers: [],
    loading: false,
    isModalVisible: false,
    expression: "",
    schedulerId: "",
  };

  onLoading = (loading_status) => {
    this.setState({
      loading: loading_status,
    });
  };

  getSchedulers = () => {
    this.onLoading(true);
    //getScheduler();
    //   .then((res) => {
    //     if (res && Array.isArray(res.data)) {
    //       this.setState({
    //         schedulers: res.data,
    //         loading: false,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     alert(err);
    //     this.onLoading(false);
    //   });
    this.setState({
      contracts: schedulerData,
      loading: false,
    });
  };

  updateScheduler = () => {
    this.onLoading(true);
    const { expression, schedulerId } = this.state;
    if (schedulerId && expression) {
      updateSchedulerAPI(schedulerId, expression)
        .then((data) => {
          alert(data.result_msg);
          this.getSchedulers();
          this.setState({
            expression: "",
            schedulerId: "",
          });
        })
        .catch((err) => {
          alert(err);
          this.setState({
            expression: "",
            schedulerId: "",
            loading: false,
          });
        });
    }
  };

  startScheduler = (id) => {
    this.onLoading(true);
    startSchedulerAPI(id)
      .then((data) => {
        alert(data.result_msg);
        this.getSchedulers();
      })
      .catch((err) => {
        alert(err);
        this.onLoading(false);
      });
  };

  stopScheduler = (id) => {
    this.onLoading(true);
    stopSchedulerAPI(id)
      .then((data) => {
        alert(data.result_msg);
        this.getSchedulers();
      })
      .catch((err) => {
        alert(err);
        this.onLoading(false);
      });
  };

  handleCancelEdit = () => {
    this.setState({
      isModalVisible: false,
      expression: "",
      loading: false,
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

  componentDidMount() {
    this.getSchedulers();
  }
  render() {
    const { loading } = this.state;
    const schedulersColumn = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        ...this.getColumnSearchProps("id"),
      },
      {
        title: "name",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "expression",
        dataIndex: "expression",
        key: "expression",
        ...this.getColumnSearchProps("expression"),
      },
      {
        title: "code",
        dataIndex: "code",
        key: "code",
        ...this.getColumnSearchProps("code"),
      },
      {
        title: "exec_func",
        dataIndex: "exec_func",
        key: "exec_func",
        ...this.getColumnSearchProps("exec_func"),
      },
      {
        title: "is_active",
        dataIndex: "is_active",
        key: "is_active",
        ...this.getColumnSearchProps("is_active"),
      },
      {
        title: "status",
        dataIndex: "status",
        key: "status",
        ...this.getColumnSearchProps("status"),
      },
      {
        title: "updated_at",
        dataIndex: "updated_at",
        key: "updated_at",
        ...this.getColumnSearchProps("updated_at"),
      },
      {
        title: "created_at",
        dataIndex: "created_at",
        key: "created_at",
        ...this.getColumnSearchProps("created_at"),
      },
      {
        //fixed: "right",
        width: "205px",
        title: "Actions",
        key: "actions",
        render: (scheduler) => (
          <div key={scheduler.id}>
            <Button
              type="primary"
              className="mr-25"
              onClick={() =>
                this.setState({
                  isModalVisible: true,
                  schedulerId: scheduler.id,
                  expression: scheduler.expression,
                })
              }
            >
              <EditOutlined />
            </Button>
            <Button
              type="primary"
              className="mr-25"
              onClick={() => this.startScheduler(scheduler.id)}
            >
              <PlayCircleOutlined />
            </Button>
            <Button
              type="danger"
              onClick={() => this.stopScheduler(scheduler.id)}
            >
              <PauseCircleOutlined />
            </Button>
          </div>
        ),
      },
    ];
    return (
      <div className="container">
        <Text>
          <h2 className="mt-25 mb-25">Schedulerlar</h2>
        </Text>
        <Modal
          visible={this.state.isModalVisible}
          title={"Edit scheduler"}
          onCancel={this.handleCancelEdit}
          footer={false}
        >
          <Form
            onFinish={this.updateScheduler}
            onFinishFailed={() => {
              alert("Xatolik sodir bo'ldi");
            }}
          >
            <Input
              required={true}
              allowClear
              placeholder="expression..."
              value={this.state.expression}
              onChange={(e) => this.setState({ expression: e.target.value })}
            ></Input>
            <Button
              type="primary"
              htmlType="submit"
              className="mt-25 mr-25"
              loading={this.state.loading}
            >
              Edit
            </Button>
            <Button
              type="danger"
              className="mt-25"
              onClick={this.handleCancelEdit}
              disabled={this.state.loading}
            >
              Cancel
            </Button>
          </Form>
        </Modal>
        <Table
          rowKey="id"
          loading={loading}
          dataSource={this.state.contracts || schedulerData}
          columns={schedulersColumn}
          scroll={{ x: "1300px", y: "360px" }}
          pagination={{ pageSize: 20 }}
          className="components-table-demo-nested"
          bordered
        />
      </div>
    );
  }
}
