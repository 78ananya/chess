import { testSaga } from 'redux-saga-test-plan';
import { getSagaSmaTableData, getSagaSmaTableDataUX, getSmaExportToExcel, watcherSmDashboardSaga } from './smDashboardSaga';
import { SMDashboardTableTypes } from './actionTypes';
import { apiCall, apiPostCall, downloadApiCall } from '../api/api';
import { getConfig } from '../../config/index';
import { properties } from '../../config/applicationProperties.json';

jest.mock('../api/api', () => ({
  apiCall: jest.fn(),
  apiPostCall: jest.fn(),
  downloadApiCall: jest.fn(),
}));

jest.mock('../../config/index', () => ({
  getConfig: jest.fn(),
}));

jest.mock('../../config/applicationProperties.json', () => ({
  properties: {
    smDashboardSmaDataPath: 'sma-data-path',
    smDashboardSmaDataPathUX: 'sma-data-path-ux',
    smDashboardSmaDataExport: 'sma-data-export',
  },
}));

describe('smDashboardSaga', () => {
  describe('getSagaSmaTableData', () => {
    it('should call apiCall with correct request parameters', () => {
      const action = {
        params: {
          endRow: 20,
          sortModel: [{ colId: 'column1', sort: 'asc' }],
          filterModel: { column1: { type: 'equals', value: 'filterValue' } },
          programCode: 'programCode1',
          strategyStatus: 'active',
        },
      };

      testSaga(getSagaSmaTableData, action)
        .next()
        .call(apiCall, 'sma-data-path', {
          search: 'filterValue',
          filterText: 'filterValue',
          searchIn: 'column1',
          page: 1,
          resultsPerPage: 20,
          sortBy: 'column1',
          sortOrder: 'asc',
          programCode: 'programCode1',
          status: 'active',
        })
        .next()
        .put({
          type: SMDashboardTableTypes.FETCH_SMA_TABLE_DATA_ASYNC,
          data: {
            data: [],
            success: true,
            headers: {},
          },
        })
        .next()
        .isDone();
    });

    it('should handle error response from apiCall', () => {
      const action = {
        params: {
          endRow: 20,
          sortModel: [{ colId: 'column1', sort: 'asc' }],
          filterModel: { column1: { type: 'equals', value: 'filterValue' } },
          programCode: 'programCode1',
          strategyStatus: 'active',
        },
      };

      apiCall.mockImplementation(() => {
        throw new Error('API error');
      });

      testSaga(getSagaSmaTableData, action)
        .next()
        .call(apiCall, 'sma-data-path', {
          search: 'filterValue',
          filterText: 'filterValue',
          searchIn: 'column1',
          page: 1,
          resultsPerPage: 20,
          sortBy: 'column1',
          sortOrder: 'asc',
          programCode: 'programCode1',
          status: 'active',
        })
        .next()
        .put({
          type: SMDashboardTableTypes.FETCH_SMA_TABLE_DATA_ASYNC,
          data: {
            data: [],
            success: false,
            headers: {},
          },
        })
        .next()
        .isDone();
    });
  });

  describe('getSagaSmaTableDataUX', () => {
    it('should call apiPostCall with correct request parameters', () => {
      const action = {
        params: {
          endRow: 20,
          sortModel: [{ colId: 'column1', sort: 'asc' }],
          filterModel: { column1: { type: 'equals', value: 'filterValue' } },
          programCode: 'programCode1',
          strategyStatus: 'active',
          globalSearch: 'globalSearchText',
        },
      };

      testSaga(getSagaSmaTableDataUX, action)
        .next()
        .call(apiPostCall, 'sma-data-path-ux', {
          columnSearch: 'filterValue',
          searchIn: 'column1',
          globalSearch: 'globalSearchText',
          page: 1,
          resultsPerPage: 20,
          sortBy: 'column1',
          sortOrder: 'asc',
          programCode: 'programCode1',
          status: 'active',
        })
        .next()
        .put({
          type: SMDashboardTableTypes.FETCH_SMA_TABLE_DATA_UX_ASYNC,
          data: {
            data: [],
            success: true,
            headers: {},
          },
        })
        .next()
        .isDone();
    });
    it('should handle error response from apiPostCall', () => {
  const action = {
    params: {
      endRow: 20,
      sortModel: [{ colId: 'column1', sort: 'asc' }],
      filterModel: { column1: { type: 'equals', value: 'filterValue' } },
      programCode: 'programCode1',
      strategyStatus: 'active',
      globalSearch: 'globalSearchText',
    },
  };

  apiPostCall.mockImplementation(() => {
    throw new Error('API error');
  });

  testSaga(getSagaSmaTableDataUX, action)
    .next()
    .call(apiPostCall, 'sma-data-path-ux', {
      columnSearch: 'filterValue',
      searchIn: 'column1',
      globalSearch: 'globalSearchText',
      page: 1,
      resultsPerPage: 20,
      sortBy: 'column1',
      sortOrder: 'asc',
      programCode: 'programCode1',
      status: 'active',
    })
    .next()
    .put({
      type: SMDashboardTableTypes.FETCH_SMA_TABLE_DATA_UX_ASYNC,
      data: {
        data: [],
        success: false,
        headers: {},
      },
    })
    .next()
    .isDone();
});
    
