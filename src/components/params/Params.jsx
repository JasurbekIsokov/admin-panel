import React, { Component } from "react";
import "./params.css";
import { Button, Modal, Table, Form, Input, Space } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";

import {
  backup,
  editParamApi,
  getParam,
  paramsReloadState,
  reco,
} from "../../server/admin/api";
import { parameterData } from "../../server/data"; // baza o'rniga
import Highlighter from "react-highlight-words";
import { onFinishFailed } from "../helpers/helper";

export default class Params extends Component {
  formRef = React.createRef();
  state = {
    params: [],
    isModalVisible: false,
    editParam: null,
    loading: true,
    loadingReloadState: false,
    loadingReco: false,
    loadingBackup: false,
  };

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
    if (this.formRef.current) {
      this.formRef.current.setFieldsValue({
        value: "",
      });
    }
  };

  handleOk = () => {
    this.setState({
      isModalVisible: false,
      editParam: null,
    });
  };

  handleCancel = () => {
    this.onReset();
    this.setState({
      isModalVisible: false,
      editParam: null,
    });
  };

  onFinish = (values) => {
    this.onLoading(true);
    const { editParam } = this.state;
    if (editParam) {
      editParamApi(editParam.id, values)
        .then((res) => {
          if (res && res.data) {
            this.handleOk();
            this.onLoading(false);
            alert("Edited successfully ");
            this.getParams();
          } else {
            this.handleCancel();
            alert("Error");
          }
        })
        .catch((err) => {
          alert(`404 Error + ${err}`);
          this.onLoading(false);
        });
    }
  };

  getParams = () => {
    this.onLoading(true);
    // getParam()
    //   .then((res) => {
    //     if (res && Array.isArray(res.data)) {
    //       this.setState({
    //         params: res.data,
    //         loading: false,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     alert(`404 Error + ${err}`);
    //     this.setState({ loading: false });
    //   });
    this.setState({
      params: parameterData,
      loading: false,
    });
  };

  editParams = (param) => {
    this.setState({
      editParam: param,
    });
    this.showModal();
    if (this.formRef.current) {
      this.formRef.current.setFieldsValue(param);
    }
  };

  onLoading = (loading_status) => {
    this.setState({
      loading: loading_status,
    });
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  reloadStateHandle = () => {
    this.setState({
      loadingReloadState: true,
    });
    paramsReloadState()
      .then((res) => {
        this.getParams();
        this.setState({
          loadingReloadState: false,
        });
      })
      .catch((err) => {
        alert(err);
        this.setState({
          loadingReloadState: false,
        });
      });
  };

  recoHandle = () => {
    this.setState({ loadingReco: true });
    reco()
      .then((res) => {
        this.setState({ loadingReco: false });
        alert(res.data);
      })
      .catch((err) => {
        this.setState({ loadingReco: false });
        alert(err);
      });
    this.getParams();
  };

  backUpHandle = () => {
    this.setState({ loadingBackup: true });
    backup()
      .then((res) => {
        this.getParams();
        this.setState({ loadingBackup: false });
        alert(res.data);
      })
      .catch((err) => {
        this.setState({ loadingBackup: false });
        alert(err);
      });
  };

  // filter search
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
    this.getParams();
  }

  render() {
    const {
      params,
      isModalVisible,
      editParam,
      loading,
      loadingReloadState,
      loadingReco,
      loadingBackup,
    } = this.state;

    const columns = [
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
        title: "value",
        dataIndex: "value",
        key: "value",
        ...this.getColumnSearchProps("value"),
      },
      {
        title: "code",
        dataIndex: "code",
        key: "code",
        ...this.getColumnSearchProps("code"),
      },
      {
        title: "updated at",
        dataIndex: "updated_at",
        key: "updated_at",
        ...this.getColumnSearchProps("updated_at"),
      },
      {
        title: "created at",
        dataIndex: "created_at",
        key: "created_at",
        ...this.getColumnSearchProps("created_at"),
      },
      {
        title: "Action",
        key: "action",
        render: (param) => (
          <div key={param.id}>
            <Button
              type="primary"
              onClick={() => this.editParams(param)}
              className="mr-25"
              icon={<EditOutlined />}
            >
              Edit
            </Button>
          </div>
        ),
      },
    ];

    return (
      <div className="container">
        <Button
          className="mr-25"
          type="primary"
          loading={loadingReloadState}
          onClick={this.reloadStateHandle}
        >
          Reload states
        </Button>
        <Button
          className="mr-25"
          type="primary"
          loading={loadingReco}
          onClick={this.recoHandle}
        >
          Reco
        </Button>
        <Button
          className="m-25 mr-25"
          type="primary"
          loading={loadingBackup}
          onClick={this.backUpHandle}
        >
          Backup
        </Button>

        <Modal
          title={"Edit Params"}
          visible={isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={false}
        >
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
            onFinishFailed={onFinishFailed}
            ref={this.formRef}
          >
            <Form.Item
              label="Value"
              name="value"
              rules={[
                {
                  required: true,
                  message: "Please input value!",
                },
              ]}
              initialValue={editParam && editParam.value}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                loading={loading}
                className="mr-25"
                type="primary"
                htmlType="submit"
              >
                Change
              </Button>
              <Button onClick={this.handleCancel} type="danger">
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Table
          loading={loading}
          dataSource={params}
          columns={columns}
          scroll={{ x: "1000px", y: "360px" }}
          pagination={{ pageSize: 20 }}
          rowKey={"id"}
          bordered
        />
      </div>
    );
  }
}
