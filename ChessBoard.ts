import { call, put } from "redux-saga/effects";
import { getSagaSmaTableData } from "./your-saga-file";
import { apiCall } from "../api/api";
import { SMDashboardTableTypes } from "factionType";
import { getConfig } from "../../config";
import properties from "../../config/applicationProperties.json";

// Mock constants
const constants = {
  GRID_BLOCK_SIZE: 20,
  SMA_RESPONSE_FIELDS: ["field1", "field2"],
};

describe("getSagaSmaTableData Saga", () => {
  it("should fetch SMA table data and dispatch success action", () => {
    const action = {
      params: {
        endRow: 40,
        sortModel: [{ colId: "name", sort: "asc" }],
        filterModel: {},
      },
      programCode: "someCode",
      strategyStatus: "active",
    };

    const generator = getSagaSmaTableData(action);
    const expectedUrl = `${getConfig().UMA_SERVICES_URL}/${properties.smDashboardSeaDataPath}`;
    const reqParams = {
      search: "",
      searchIn: "",
      page: 2, // 40 / 20 + 1
      resultsPerPage: constants.GRID_BLOCK_SIZE,
      responseFields: constants.SMA_RESPONSE_FIELDS,
      sortBy: "name",
      sortOrder: "asc",
      programCode: "someCode",
      status: "active",
    };

    // Check that apiCall is called with correct parameters
    expect(generator.next().value).toEqual(call(apiCall, expectedUrl, reqParams));

    // Mock response data
    const modelParamData = {
      status: 200,
      data: { strategy: [] },
      headers: [],
    };

    // Check that put is called with the correct action after apiCall resolves
    expect(generator.next(modelParamData).value).toEqual(
      put({
        type: SMDashboardTableTypes.FETCH_SMA_TABLE_DATA_ASYNC,
        data: [],
        success: true,
        headers: [],
      })
    );

    // Ensure the generator is done
    expect(generator.next().done).toBe(true);
  });

  it("should handle failure response", () => {
    const action = {
      params: {
        endRow: 40,
        sortModel: [{ colId: "name", sort: "asc" }],
        filterModel: {},
      },
      programCode: "someCode",
      strategyStatus: "active",
    };

    const generator = getSagaSmaTableData(action);
    const expectedUrl = `${getConfig().UMA_SERVICES_URL}/${properties.smDashboardSeaDataPath}`;
    const reqParams = {
      search: "",
      searchIn: "",
      page: 2,
      resultsPerPage: constants.GRID_BLOCK_SIZE,
      responseFields: constants.SMA_RESPONSE_FIELDS,
      sortBy: "name",
      sortOrder: "asc",
      programCode: "someCode",
      status: "active",
    };

    // Call the API
    expect(generator.next().value).toEqual(call(apiCall, expectedUrl, reqParams));

    // Mock error response
    const modelParamData = {
      status: 500,
      data: {},
      headers: [],
    };

    // Ensure put is called with a failure action
    expect(generator.next(modelParamData).value).toEqual(
      put({
        type: SMDashboardTableTypes.FETCH_SMA_TABLE_DATA_ASYNC,
        data: [],
        success: false,
        headers: [],
      })
    );

    expect(generator.next().done).toBe(true);
  });
});
import { call, put } from "redux-saga/effects";
import { getSagaSmaTableDataUX } from "./your-saga-file";
import { apiPostCall } from "../api/api";
import { SMDashboardTableTypes } from "factionType";
import { getConfig } from "../../config";
import properties from "../../config/applicationProperties.json";

// Mock constants
const constants = {
  GRID_BLOCK_SIZE_NEW: 25,
};

describe("getSagaSmaTableDataUX Saga", () => {
  it("should fetch UX SMA table data and dispatch success action", () => {
    const action = {
      params: {
        endRow: 50,
        sortModel: [{ colId: "status", sort: "desc" }],
        filterModel: {},
        globalSearch: "",
      },
      programCode: "someCode",
      strategyStatus: "active",
    };

    const generator = getSagaSmaTableDataUX(action);
    const expectedUrl = `${getConfig().UMA_SERVICES_URL}/${properties.smDashboardSmaDataPathUX}`;
    const reqParams = {
      columnSearch: "",
      searchIn: "",
      page: 2, // 50 / 25 + 1
      resultsPerPage: constants.GRID_BLOCK_SIZE_NEW,
      sortBy: "status",
      sortOrder: "desc",
      globalSearch: "",
      programCode: "someCode",
      status: "active",
      allResults: false,
    };

    // Call API
    expect(generator.next().value).toEqual(call(apiPostCall, expectedUrl, reqParams));

    // Mock response data
    const modelParamData = {
      status: 200,
      data: { strategy: [] },
      headers: [],
    };

    // Ensure put is called with a success action
    expect(generator.next(modelParamData).value).toEqual(
      put({
        type: SMDashboardTableTypes.FETCH_SMA_TABLE_DATA_UX_ASYNC,
        data: [],
        success: true,
        headers: [],
      })
    );

    expect(generator.next().done).toBe(true);
  });
});
import { call } from "redux-saga/effects";
import { getSmaExportToExcel } from "./your-saga-file";
import { downloadApiCall } from "../api/api";
import { getConfig } from "../../config";
import properties from "../../config/applicationProperties.json";

describe("getSmaExportToExcel Saga", () => {
  it("should export SMA table data to Excel", () => {
    const action = {
      programCode: 15,
      tableSearchIn: "name",
      tableColumnSearch: "strategy",
      globalSearchText: "test",
    };

    const generator = getSmaExportToExcel(action);
    const expectedUrl = `${getConfig().UMA_SERVICES_URL}/${properties.smDashboardSmaDataExport}/export`;
    const reqParams = {
      columnSearch: "strategy",
      searchIn: "name",
      globalSearch: "test",
      programCode: 15,
    };

    // Ensure call to downloadApiCall with appropriate params
    expect(generator.next().value).toEqual(
      call(downloadApiCall, expectedUrl, reqParams, "Strategy_Access")
    );

    expect(generator.next().done).toBe(true);
  });
});
import { takeEvery } from "redux-saga/effects";
import { watcherSmDashboardSaga } from "./your-saga-file";
import { SMDashboardTableTypes } from "factionType";
import { getSagaSmaTableData, getSagaSmaTableDataUX, getSmaExportToExcel } from "./your-saga-file";

describe("watcherSmDashboardSaga", () => {
  const generator = watcherSmDashboardSaga();

  it("should watch for FETCH_SMA_TABLE_DATA", () => {
    expect(generator.next().value).toEqual(takeEvery(SMDashboardTableTypes.FETCH_SMA_TABLE_DATA, getSagaSmaTableData));
  });

  it("should watch for FETCH_SMA_TABLE_DATA_UX", () => {
    expect(generator.next().value).toEqual(takeEvery(SMDashboardTableTypes.FETCH_SMA_TABLE_DATA_UX, getSagaSmaTableDataUX));
  });

  it("should watch for SMA_EXPORT_TO_EXCEL", () => {
    expect(generator.next().value).toEqual(takeEvery(SMDashboardTableTypes.SMA_EXPORT_TO_EXCEL, getSmaExportToExcel));
  });
});


