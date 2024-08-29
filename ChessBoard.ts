import { getSagaSmaTableData, getSagaSmaTableDataUX, getSmaExportToExcel } from './smaDashboardSaga';
import { SMDashboardTableTypes } from './actionType';

describe('smaDashboardSaga', () => {
  describe('getSagaSmaTableData', () => {
    it('should call apiCall with correct params', () => {
      const action = {
        params: {
          endRow: 10,
          sortModel: [{ colId: 'column1', sort: 'asc' }],
          filterModel: { column1: { type: 'equals', value: 'value1' } },
          programCode: 'programCode1',
          strategyStatus: 'strategyStatus1',
        },
      };
      const getConfig = jest.fn(() => ({ UMA_SERVICES_URL: 'https://example.com' }));
      const properties = { smDashboardSmaDataPath: 'sma-data' };
      const constants = { GRID_BLOCK_SIZE: 10 };
      const apiCall = jest.fn(() => ({ status: 200, data: { strategy: [] } }));

      getSagaSmaTableData(action);

      expect(apiCall).toHaveBeenCalledTimes(1);
      expect(apiCall).toHaveBeenCalledWith(
        'https://example.com/sma-data',
        {
          search: 'value1',
          searchIn: 'column1',
          page: 1,
          resultsPerPage: 10,
          sortBy: 'column1',
          sortOrder: 'asc',
          programCode: 'programCode1',
          status: 'strategyStatus1',
        }
      );
    });

    it('should yield put with correct data', () => {
      const action = {
        params: {
          endRow: 10,
          sortModel: [{ colId: 'column1', sort: 'asc' }],
          filterModel: { column1: { type: 'equals', value: 'value1' } },
          programCode: 'programCode1',
          strategyStatus: 'strategyStatus1',
        },
      };
      const getConfig = jest.fn(() => ({ UMA_SERVICES_URL: 'https://example.com' }));
      const properties = { smDashboardSmaDataPath: 'sma-data' };
      const constants = { GRID_BLOCK_SIZE: 10 };
      const apiCall = jest.fn(() => ({ status: 200, data: { strategy: [] } }));

      const generator = getSagaSmaTableData(action);
      const putAction = generator.next().value;

      expect(putAction).toEqual({
        type: SMDashboardTableTypes.FETCH_SMA_TABLE_DATA_ASYNC,
        data: {
          data: [],
          success: true,
          headers: {},
        },
      });
    });
  });

  describe('getSagaSmaTableDataUX', () => {
    it('should call apiPostCall with correct params', () => {
      const action = {
        params: {
          endRow: 10,
          sortModel: [{ colId: 'column1', sort: 'asc' }],
          filterModel: { column1: { type: 'equals', value: 'value1' } },
          programCode: 'programCode1',
          strategyStatus: 'strategyStatus1',
          globalSearch: 'globalSearchText',
        },
      };
      const getConfig = jest.fn(() => ({ UMA_SERVICES_URL: 'https://example.com' }));
      const properties = { smDashboardSmaDataPathUX: 'sma-data-ux' };
      const constants = { GRID_BLOCK_SIZE_NEW: 10 };
      const apiPostCall = jest.fn(() => ({ status: 200, data: { strategy: [] } }));

      getSagaSmaTableDataUX(action);

      expect(apiPostCall).toHaveBeenCalledTimes(1);
      expect(apiPostCall).toHaveBeenCalledWith(
        'https://example.com/sma-data-ux',
        {
          columnSearch: 'value1',
          searchIn: 'column1',
          page: 1,
          resultsPerPage: 10,
          sortBy: 'column1',
          sortOrder: 'asc',
          globalSearch: 'globalSearchText',
          programCode: 'programCode1',
          allResults: undefined,
          status: 'strategyStatus1',
        }
      );
    });
        it('should yield put with correct data', () => {
      const action = {
        params: {
          endRow: 10,
          sortModel: [{ colId: 'column1', sort: 'asc' }],
          filterModel: { column1: { type: 'equals', value: 'value1' } },
          programCode: 'programCode1',
          strategyStatus: 'strategyStatus1',
          globalSearch: 'globalSearchText',
        },
      };
      const getConfig = jest.fn(() => ({ UMA_SERVICES_URL: 'https://example.com' }));
      const properties = { smDashboardSmaDataPathUX: 'sma-data-ux' };
      const constants = { GRID_BLOCK_SIZE_NEW: 10 };
      const apiPostCall = jest.fn(() => ({ status: 200, data: { strategy: [] } }));

      const generator = getSagaSmaTableDataUX(action);
      const putAction = generator.next().value;

      expect(putAction).toEqual({
        type: SMDashboardTableTypes.FETCH_SMA_TABLE_DATA_UX_ASYNC,
        data: {
          data: [],
          success: true,
          headers: {},
        },
      });
    });
  });

  describe('getSmaExportToExcel', () => {
    it('should call downloadApiCall with correct params', () => {
      const action = {
        tableColumnSearch: 'columnSearch',
        tableSearchIn: 'searchIn',
        globalSearchText: 'globalSearchText',
        programCode: 'programCode1',
      };
      const getConfig = jest.fn(() => ({ UMA_SERVICES_URL: 'https://example.com' }));
      const properties = { smDashboardSmaDataExport: 'sma-data-export' };
      const downloadApiCall = jest.fn(() => ({ status: 200 }));

      getSmaExportToExcel(action);

      expect(downloadApiCall).toHaveBeenCalledTimes(1);
      expect(downloadApiCall).toHaveBeenCalledWith(
        'https://example.com/sma-data-export/export',
        {
          columnSearch: 'columnSearch',
          searchIn: 'searchIn',
          globalSearch: 'globalSearchText',
          programCode: 'programCode1',
        },
        'Strategy_' + (action.programCode ? 'programCode1' : 'All')
      );
    });
  });

  describe('watcherSmDashboardSaga', () => {
    it('should take every FETCH_SMA_TABLE_DATA action', () => {
      const saga = watcherSmDashboardSaga();
      const action = { type: SMDashboardTableTypes.FETCH_SMA_TABLE_DATA };
      saga.next();
      saga.next(action);

      expect(saga.next().value).toEqual(call(getSagaSmaTableData, action));
    });

    it('should take every FETCH_SMA_TABLE_DATA_UX action', () => {
      const saga = watcherSmDashboardSaga();
      const action = { type: SMDashboardTableTypes.FETCH_SMA_TABLE_DATA_UX };
      saga.next();
      saga.next(action);

      expect(saga.next().value).toEqual(call(getSagaSmaTableDataUX, action));
    });

    it('should take every SMA_EXPORT_TO_EXCEL action', () => {
      const saga = watcherSmDashboardSaga();
      const action = { type: SMDashboardTableTypes.SMA_EXPORT_TO_EXCEL };
      saga.next();
      saga.next(action);

      expect(saga.next().value).toEqual(call(getSmaExportToExcel, action));
    });
  });
});
