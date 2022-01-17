import { host, httpRequest } from "../host";

// for contract page
export let getContract = () => {
  let config = {
    url: `${host}/api/loan/contracts`,
    method: "get",
  };
  return httpRequest(config);
};

export let deleteContract = (id, secretCode) => {
  let config = {
    url: `${host}/api/loan/contract/delete`,
    method: "delete",
    date: {
      contract_id: id,
      secret_code: secretCode,
    },
  };
  return httpRequest(config);
};

export let getCard = (contract_id) => {
  let config = {
    url: `${host}/api/loan/cards/${contract_id}`,
    method: "get",
  };
  return httpRequest(config);
};

export let deleteCard = (id, secretCode) => {
  let config = {
    url: `${host}/api/loan/contract/card/delete`,
    method: "delete",
    data: {
      card_id: id,
      secret_code: secretCode,
    },
  };
  return httpRequest(config);
};

export let getGraphic = (contract_id) => {
  let config = {
    url: `${host}/api/loan/graphics/${contract_id}`,
    method: "get",
  };
  return httpRequest(config);
};

export let getTransact = (contract_id) => {
  let config = {
    url: `${host}/api/loan/transacts/${contract_id}`,
    method: "get",
  };
  return httpRequest(config);
};

export let reloadGraphic = (loan_id) => {
  let config = {
    url: `${host}/api/loan/reload-graphics`,
    method: "post",
    data: {
      loan_id: loan_id,
    },
  };
  return httpRequest(config);
};

// for process page

export const processSearchByDate = (date) => {
  let config = {
    url: `${host}/api/loan/transacts/${date}`,
    method: "get",
  };
  return httpRequest(config);
};

export const processSearchByStatus = (date) => {
  let config = {
    url: `${host}/api/loan/transacts/${date}`,
    method: "get",
  };
  return httpRequest(config);
};

export const processStart = (filial_code) => {
  let config = {
    url: `${host}/api/loan/process/start`,
    method: "post",
    data: {
      filial_code: filial_code,
    },
  };
  return httpRequest(config);
};

export const processStop = (filial_code) => {
  let config = {
    url: `${host}/api/loan/process/starts`,
    method: "post",
    data: {
      filial_code: filial_code,
    },
  };
  return httpRequest(config);
};

// for params page
export const getParam = () => {
  let config = {
    url: `${host}/api/loan/params`,
    method: "get",
  };
  return httpRequest(config);
};

export const editParamApi = (id, object) => {
  let config = {
    url: `${host}/api/loan/params/${id}`,
    method: "put",
    data: object,
  };
  return httpRequest(config);
};

export const paramsReloadState = (object) => {
  let config = {
    url: `${host}/api/loan/reload-states`,
    method: "post",
    data: object,
  };
  return httpRequest(config);
};

export const reco = (id, object) => {
  let config = {
    url: `${host}/api/loan/reco`,
    method: "put",
    data: object,
  };
  return httpRequest(config);
};

export const backup = (id, object) => {
  let config = {
    url: `${host}/api/loan/reco`,
    method: "put",
    data: object,
  };
  return httpRequest(config);
};

// Schedulers
export const getScheduler = () => {
  let config = {
    url: `${host}/api/loan/schedulers`,
    method: "get",
  };
  return httpRequest(config);
};

export const updateSchedulerAPI = (id, expression) => {
  let config = {
    url: `${host}/api/loan/scheduler`,
    method: "put",
    data: {
      id: id,
      expression: expression,
    },
  };
  return httpRequest(config);
};

export const startSchedulerAPI = (id, expression) => {
  let config = {
    url: `${host}/api/loan/scheduler`,
    method: "put",
    data: {
      id: id,
      expression: expression,
    },
  };
  return httpRequest(config);
};

export const stopSchedulerAPI = (id, expression) => {
  let config = {
    url: `${host}/api/loan/scheduler`,
    method: "put",
    data: {
      id: id,
      expression: expression,
    },
  };
  return httpRequest(config);
};
