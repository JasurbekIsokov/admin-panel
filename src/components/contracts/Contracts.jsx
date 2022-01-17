import React, { Component } from "react";
import {
  cardData,
  contractData,
  graphicData,
  transactData,
} from "../../server/data";
import "./contracts.css";
import { Button, Input, Modal, Space, Table, Form } from "antd";
import {
  CreditCardOutlined,
  LineChartOutlined,
  ReloadOutlined,
  SearchOutlined,
  TransactionOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons/lib/icons";
import Highlighter from "react-highlight-words";
import {
  deleteCard,
  deleteContract,
  getCard,
  getContract,
  getGraphic,
  getTransact,
  reloadGraphic,
} from "../../server/admin/api";
import Text from "antd/lib/typography/Text";
import { onFinishFailed } from "../helpers/helper";
class Contracts extends Component {
  state = {
    contracts: [],
    cards: [],
    graphics: [],
    transacts: [],
    modalTitle: "",
    isModalVisible: false,
    groups: [],
    loading: true,
    loadingDelete: false,
    deleteContractId: null,
    deleteCardId: null,
    openModalForDeleteContract: false,
  };

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  handleOk = () => {
    this.setState({
      isModalVisible: false,
      deleteContractId: null,
      modalTitle: "",
      openModalForDeleteContract: false,
    });
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false,
      deleteContractId: null,
      deleteCardId: null,
      modalTitle: "",
      secretCode: "",
      openModalForDeleteContract: false,
    });
  };

  onFinish = (secretCode) => {
    this.onLoading(true);

    let id = this.state.deleteContractId;

    if (id) {
      deleteContract(id, secretCode)
        .then((res) => {
          if (res && res.data) {
            this.handleOk();
            this.getContracts();
            this.onLoading(false);
            alert("Deleted successfully ");
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
    // alert("salom");
    // this.onLoading(false);
  };

  onLoading = (loading_status) => {
    this.setState({
      loading: loading_status,
    });
  };

  getContracts = () => {
    this.onLoading(true);
    //  getContract().then((res) => {
    //   if (res && Array.isArray(res.data)) {
    //     this.setState({
    //       contracts: res.data,
    //       loading: false,
    //     });
    //   }
    // }).catch((err) => alert(err));
    this.setState({
      contracts: contractData,
      loading: false,
    });
  };

  getCards = (id) => {
    this.onLoading(true);
    // getCard(id).then((res) => {
    //   if (res && Array.isArray(res.data)) {
    //     this.setState({
    //       cards: res.data,
    //       loading: false,
    //     });
    //   }
    // }).catch((err) => {alert(err));this.onLoading(false);};
    this.setState({
      cards: cardData.filter(function (c) {
        return c.contract_id === id;
      }),
      loading: false,
    });
  };

  deleteCardHandle = () => {
    this.setState({ loadingDelete: true });
    const { deleteCardId, secretCode } = this.state;
    if (deleteCardId && secretCode) {
      deleteCard(deleteCardId, secretCode)
        .then((data) => {
          alert(data.result_msg);
          this.setState({ loadingDelete: false });
        })
        .catch((err) => {
          alert(err);
          this.setState({ loadingDelete: false });
        });
    } else {
      alert("Card Id or Secret code does not exists!");
    }
  };

  getGraphics = (id) => {
    // this.onLoading(true);
    // getGraphic(id)
    //   .then((res) => {
    //     if (res && Array.isArray(res.data)) {
    //       this.setState({
    //         graphics: res.data,
    //         loading: false,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     alert(err);
    //     this.onLoading(false);
    //   });
    this.setState({
      graphics: graphicData.filter(function (g) {
        return g.contract_id === id;
      }),
      loading: false,
    });
  };

  getTransacts = (id) => {
    this.onLoading(true);
    // getTransact(id).then((res) => {
    //   if (res && Array.isArray(res.data)) {
    //     this.setState({
    //       transacts: res.data,
    //       loading: false,
    //     });
    //   }
    // }).catch((err) => alert(err));
    this.setState({
      transacts: transactData.filter(function (t) {
        return t.contract_id === id;
      }),
      loading: false,
    });
  };

  reloadGraphics = (id) => {
    this.onLoading(true);
    // reloadGraphic(id)
    //   .then((res) => {
    //     if (res && Array.isArray(res.data)) {
    //       this.setState({
    //         responseMessage: res.data.result_msg,
    //         loading: false,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     alert(err);
    //     this.onLoading(false);
    //   });
    alert("bajarildi!");
    this.setState({
      loading: false,
    });
  };

  onLoading = (loading_status) => {
    this.setState({
      loading: loading_status,
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
    this.getContracts();
  }

  render() {
    const {
      isModalVisible,
      loading,
      cards,
      graphics,
      transacts,
      modalTitle,
      deleteCardId,
      openModalForDeleteContract,
    } = this.state;

    const contractColumns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        ...this.getColumnSearchProps("id"),
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        ...this.getColumnSearchProps("state"),
      },
      {
        title: "close date",
        dataIndex: "close_date",
        key: "close_date",
        ...this.getColumnSearchProps("close_date"),
      },
      {
        title: "created at",
        dataIndex: "created_at",
        key: "created_at",
        ...this.getColumnSearchProps("created_at"),
      },
      {
        title: "filial code",
        dataIndex: "filial_code",
        key: "filial_code",
        ...this.getColumnSearchProps("filial_code"),
      },
      {
        title: "loan client id",
        dataIndex: "loan_client_id",
        key: "loan_client_id",
        ...this.getColumnSearchProps("loan_client_id"),
      },
      {
        title: "loan id",
        dataIndex: "loan_id",
        key: "loan_id",

        ...this.getColumnSearchProps("loan_id"),
      },
      {
        title: "repayment date",
        dataIndex: "repayment_date",
        key: "repayment_date",
        ...this.getColumnSearchProps("repayment_date"),
      },

      {
        title: "updated at",
        dataIndex: "updated_at",
        key: "updated_at",
        ...this.getColumnSearchProps("updated_at"),
      },
      {
        //fixed: "right",
        title: "Actions",
        key: "actions",
        width: "325px",
        render: (contract) => (
          <div key={contract.id}>
            <Button
              title={"cards"}
              type="primary"
              className="mr-25 mt-25"
              onClick={() => {
                this.showModal();
                this.setState({ modalTitle: "Cards" });
                this.getCards(contract.id);
              }}
            >
              <CreditCardOutlined />
            </Button>
            <Button
              type="primary"
              className="mr-25 mt-25"
              onClick={() => {
                this.showModal();
                this.setState({ modalTitle: "Graphics" });
                this.getGraphics(contract.id);
              }}
            >
              <LineChartOutlined />
            </Button>
            <Button
              type="primary"
              className="mr-25 mt-25"
              onClick={() => {
                this.showModal();
                this.setState({ modalTitle: "Transacts" });
                this.getTransacts(contract.id);
              }}
            >
              <TransactionOutlined />
            </Button>
            <Button
              type="primary"
              className="mt-25 mr-25"
              onClick={() => this.reloadGraphics(contract.loan_id)}
            >
              <ReloadOutlined />
            </Button>
            <Button
              type="danger"
              className="mt-25 "
              onClick={() => {
                this.showModal();
                this.setState({
                  modalTitle: `Delete Contract: ${contract.id}`,
                  openModalForDeleteContract: true,
                  deleteContractId: contract.id,
                });
              }}
            >
              <DeleteOutlined />
            </Button>
          </div>
        ),
      },
    ];

    const cardColumns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        ...this.getColumnSearchProps("id"),
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        ...this.getColumnSearchProps("state"),
      },
      {
        title: "card_id",
        dataIndex: "card_id",
        key: "card_id",
        ...this.getColumnSearchProps("card_id"),
      },

      {
        title: "date_expire",
        dataIndex: "date_expire",
        key: "date_expire",
        ...this.getColumnSearchProps("date_expire"),
      },
      {
        title: "ord",
        dataIndex: "ord",
        key: "ord",
        ...this.getColumnSearchProps("ord"),
      },

      {
        title: "card_number",
        dataIndex: "card_number",
        key: "card_number",
        ...this.getColumnSearchProps("card_number"),
      },
      {
        title: "created at",
        dataIndex: "created_at",
        key: "created_at",
        ...this.getColumnSearchProps("created_at"),
      },
      {
        title: "updated at",
        dataIndex: "updated_at",
        key: "updated_at",
        ...this.getColumnSearchProps("updated_at"),
      },
      {
        //fixed: "right",
        title: "Actions",
        key: "actions",
        render: (card) => (
          <div key={card.id}>
            <Button
              type="danger"
              onClick={() => {
                this.setState({ deleteCardId: card.id });
              }}
              disabled={deleteCardId}
            >
              <DeleteOutlined />
            </Button>
          </div>
        ),
      },
    ];

    const graphicColumns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        ...this.getColumnSearchProps("id"),
      },
      {
        title: "State",
        dataIndex: "state",
        key: "state",
        ...this.getColumnSearchProps("state"),
      },
      {
        title: "interest_onterm",
        dataIndex: "interest_onterm",
        key: "interest_onterm",
        ...this.getColumnSearchProps("interest_onterm"),
      },
      {
        title: "recommended_amount",
        dataIndex: "recommended_amount",
        key: "recommended_amount",
        ...this.getColumnSearchProps("recommended_amount"),
      },
      {
        title: "amount",
        dataIndex: "amount",
        key: "amount",
        ...this.getColumnSearchProps("amount"),
      },
      {
        title: "repayment_date",
        dataIndex: "repayment_date",
        key: "repayment_date",
        ...this.getColumnSearchProps("repayment_date"),
      },
      {
        title: "created at",
        dataIndex: "created_at",
        key: "created_at",
        ...this.getColumnSearchProps("created_at"),
      },
      {
        title: "updated at",
        dataIndex: "updated_at",
        key: "updated_at",
        ...this.getColumnSearchProps("updated_at"),
      },
    ];

    const transactColumns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        ...this.getColumnSearchProps("id"),
      },
      {
        title: "card_id",
        dataIndex: "card_id",
        key: "card_id",
        ...this.getColumnSearchProps("card_id"),
      },
      {
        title: "amount",
        dataIndex: "amount",
        key: "amount",
        ...this.getColumnSearchProps("amount"),
      },
      {
        title: "recommended_amount",
        dataIndex: "recommended_amount",
        key: "recommended_amount",
        ...this.getColumnSearchProps("recommended_amount"),
      },
      {
        title: "commission_amount",
        dataIndex: "commission_amount",
        key: "commission_amount",
        ...this.getColumnSearchProps("commission_amount"),
      },
      {
        title: "error_code",
        dataIndex: "error_code",
        key: "error_code",
        ...this.getColumnSearchProps("error_code"),
      },
      {
        title: "error_message",
        dataIndex: "error_message",
        key: "error_message",
        ...this.getColumnSearchProps("error_message"),
      },
      {
        title: "external_id",
        dataIndex: "external_id",
        key: "external_id",
        ...this.getColumnSearchProps("external_id"),
      },
      {
        title: "processing_id",
        dataIndex: "processing_id",
        key: "processing_id",
        ...this.getColumnSearchProps("processing_id"),
      },
      {
        title: "ps_ref_num",
        dataIndex: "ps_ref_num",
        key: "ps_ref_num",
        ...this.getColumnSearchProps("ps_ref_num"),
      },
      {
        title: "terminal_id",
        dataIndex: "terminal_id",
        key: "terminal_id",
        ...this.getColumnSearchProps("terminal_id"),
      },
      {
        title: "created at",
        dataIndex: "created_at",
        key: "created_at",
        ...this.getColumnSearchProps("created_at"),
      },
      {
        title: "updated at",
        dataIndex: "updated_at",
        key: "updated_at",
        ...this.getColumnSearchProps("updated_at"),
      },
    ];

    return (
      <div className="container">
        <Text>
          <h2 className="mt-25 mb-25">Kontraktlar</h2>
        </Text>
        <Modal
          title={modalTitle}
          visible={isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={false}
          width={openModalForDeleteContract ? "500px" : "100%"}
          scroll={{ y: "500px" }}
        >
          {deleteCardId && (
            <Modal
              title={`Delete Card ${deleteCardId}`}
              visible={deleteCardId}
              onCancel={() =>
                this.setState({ deleteCardId: null, secretCode: "" })
              }
              footer={false}
            >
              <Form
                name="basic2"
                onFinish={() => this.deleteCardHandle()}
                onFinishFailed={() => {
                  alert("Xatolik sodir bo'ldi");
                }}
              >
                <Form.Item
                  label="Secret code"
                  name="secretCode"
                  rules={[
                    {
                      required: true,
                      message: "Please input secretCode!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Secret code..."
                    required={true}
                    onChange={(e) =>
                      this.setState({ secretCode: e.target.value })
                    }
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <Button
                  className="mr-25"
                  type="danger"
                  htmlType="submit"
                  loading={this.state.loadingDelete}
                >
                  Delete
                </Button>
                <Button
                  onClick={() =>
                    this.setState({ deleteCardId: null, secretCode: "" })
                  }
                  type="primary"
                >
                  Cancel
                </Button>
              </Form>
            </Modal>
          )}
          {openModalForDeleteContract ? (
            <Form
              name="basic"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="Secret code"
                name="secretCodeContract"
                rules={[
                  {
                    required: true,
                    message: "Please input secretCode!",
                  },
                ]}
                initialValue={""}
              >
                <Input.Password
                  placeholder="Secret code..."
                  required={true}
                  onChange={(e) =>
                    this.setState({ secretCode: e.target.value })
                  }
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  allowClear
                />
              </Form.Item>

              <Form.Item>
                <Button
                  loading={loading}
                  className="mr-25"
                  type="danger"
                  htmlType="submit"
                >
                  Delete
                </Button>
                <Button onClick={this.handleCancel} type="primary">
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <>
              <Table
                loading={loading}
                dataSource={
                  modalTitle === "Cards"
                    ? cards
                    : modalTitle === "Graphics"
                    ? graphics
                    : modalTitle === "Transacts"
                    ? transacts
                    : []
                }
                columns={
                  modalTitle === "Cards"
                    ? cardColumns
                    : modalTitle === "Graphics"
                    ? graphicColumns
                    : modalTitle === "Transacts"
                    ? transactColumns
                    : []
                }
                scroll={{ x: "100%" }}
                pagination={{ pageSize: 20 }}
                rowKey={"id"}
                bordered
              />

              <Button
                onClick={() => this.setState({ isModalVisible: false })}
                className="mr-25"
                type="primary"
                htmlType="submit"
              >
                Yopish
              </Button>
            </>
          )}
        </Modal>
        <Table
          rowKey="id"
          loading={loading}
          dataSource={this.state.contracts}
          columns={contractColumns}
          scroll={{ x: "1300px", y: "360px" }}
          pagination={{ pageSize: 20 }}
          className="components-table-demo-nested"
          bordered
        />
      </div>
    );
  }
}

export default Contracts;
