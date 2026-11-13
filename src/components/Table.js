import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import {debounce} from "lodash";
import { useMediaQuery } from '@mui/material';

const Table = (
    {
        buttonRenderer,
        ChipRenderer,
        columnDefs,
        loading,
        rowData,
        agThemeStyle,
        defaultColDef,
        agGridRef,
        rowKey = "id",
        name = "Table",
        searchParams = new URLSearchParams(),
        setSearchParams = (e) => {
        },
        onScrollBottomEnd = null,
        pagination,
        paginationPageSize,
        onSelectionChanged,
        rowMultiSelectWithClickFlag,
        copyHeadersToClipboard,
        enableRangeSelection,
        suppressCopyRowsToClipboard,
        onFirstDataRendered,
        ...rest
    },
    ref
) => {

    const localStorageKey = `Table_${name}`;
    const isPhoneOrTablet = useMediaQuery('(max-width: 768px)');

    const gridRef = useRef();
    const [gridReady, setGridReady] = useState(false);
    const [selectedMIRows, setMISelectedRows] = useState([]);

    const searchParam = searchParams.get("search");

    const search = useMemo(() => searchParam, [searchParam]);

    // remove pinned in phone and tablet size
    columnDefs = useMemo(() => {
        // Check screen size and remove pinned: true if it's phone or tablet
        const isPhoneOrTablet = window.innerWidth <= 768;
        const modifiedColumnDefs = columnDefs.map((colDef) => {
        if (isPhoneOrTablet && colDef.pinned) {
            return { ...colDef, pinned: false };
        }
        return colDef;
        });
    
        return modifiedColumnDefs;
    }, [columnDefs]);

    useEffect(() => {
        if (agGridRef) {
            agGridRef.current = gridRef.current;
        }
    }, [agGridRef]);

    useEffect(() => {
        if (gridRef.current && gridRef.current.api) {
            gridRef.current.api.ensureIndexVisible(0, "top");
        }
    }, [search]);

    useEffect(() => {
        if (gridRef.current && gridRef.current.api) {
            if (loading) {
                gridRef.current.api.showLoadingOverlay();
            } else {
                gridRef.current.api.hideOverlay();
            }
        }
    }, [loading]);

    const handleSelectionChanged = useCallback(() => {
        if (onSelectionChanged && gridRef.current) {
            const selectedRows = gridRef.current.api.getSelectedRows();
            onSelectionChanged(selectedRows);
            setMISelectedRows(selectedRows);
        }
    }, [onSelectionChanged]);

    const getRowId = useCallback(
        (params) => {
            return params.data[rowKey];
        },
        [rowKey]
    );

    const onColumnResized = useCallback(
        (params) => {
            if (
                params.type === "columnResized" &&
                params.finished === true &&
                gridReady
            ) {
                window.localStorage.setItem(
                    localStorageKey,
                    JSON.stringify(params.columnApi.getColumnState())
                );
            }
        },
        [gridReady, localStorageKey]
    );

    const onSortChanged = useCallback(
        (params) => {
            const {api, type, finished} = params;
            const sortModel = api.sortController.getSortModel();
            const paramNames = searchParams.keys();

            for (const paramName of paramNames) {
                if (paramName.startsWith("order_by")) {
                    searchParams.delete(paramName);
                }
            }
            if (sortModel && sortModel.length > 0) {
                searchParams.set(
                    `order_by[${sortModel[0].colId.split(".")}]`,
                    `${sortModel[0].sort}`
                );
            }
            api.ensureIndexVisible(0, "top");
            setSearchParams(searchParams);
            if (type === "sortChanged" && finished === true && gridReady) {
                window.localStorage.setItem(
                    localStorageKey,
                    JSON.stringify(params.columnApi.getColumnState())
                );
            }
        },
        [gridReady, localStorageKey, searchParams, setSearchParams]
    );

    const onColumnVisible = useCallback(
        (params) => {
            const {type, finished} = params;

            if (type === "columnVisible" && finished === true && gridReady) {
                window.localStorage.setItem(
                    localStorageKey,
                    JSON.stringify(params.columnApi.getColumnState())
                );
            }
        },
        [gridReady, localStorageKey]
    );

    const onColumnMoved = useCallback(
        (params) => {
            if (
                params.type === "columnMoved" &&
                params.finished === true &&
                gridReady
            ) {
                window.localStorage.setItem(
                    localStorageKey,
                    JSON.stringify(params.columnApi.getColumnState())
                );
            }
        },
        [gridReady, localStorageKey]
    );

    const onColumnPinned = useCallback(
        (params) => {
            if (
                params.type === "columnPinned" &&
                params.finished === true &&
                gridReady
            ) {
                window.localStorage.setItem(
                    localStorageKey,
                    JSON.stringify(params.columnApi.getColumnState())
                );
            }
        },
        [gridReady, localStorageKey]
    );

    const onGridReady = useCallback(
        (event) => {
            const storeState = window.localStorage.getItem(localStorageKey);
            if (storeState) {
                try {
                    const state = JSON.parse(storeState);
                    event.columnApi.applyColumnState({
                        state,
                        applyOrder: true,
                    });
                } catch (e) {
                    console.log(e);
                }
            }
            if (loading) {
                event.api.showLoadingOverlay();
            } else {
                event.api.hideOverlay();
            }
            setGridReady(true);
        },
        [loading, localStorageKey]
    );

    const handleBodyScroll = useCallback(
        debounce((event) => {
            if (onScrollBottomEnd) {
                const bottom_px = event.api.getVerticalPixelRange().bottom;
                const grid_height =
                    event.api.getDisplayedRowCount() *
                    event.api.getSizesForCurrentTheme().rowHeight;

                if (Math.ceil(bottom_px) >= Math.ceil(grid_height) && !loading) {
                    onScrollBottomEnd(event);
                }
            }
        }, 100),
        [loading, onScrollBottomEnd]
    );

    return (
        <div className="ag-theme-balham" style={agThemeStyle}>
            <AgGridReact
                frameworkComponents={{
                    buttonRenderer: buttonRenderer,
                    ChipRenderer: ChipRenderer,
                }}
                ref={gridRef}
                onSortChanged={onSortChanged}
                onColumnVisible={onColumnVisible}
                onColumnMoved={onColumnMoved}
                onColumnPinned={onColumnPinned}
                onColumnResized={onColumnResized}
                rowData={rowData}
                columnDefs={columnDefs}
                //defaultColDef={defaultColDef}
                defaultColDef={{
                    ...defaultColDef,
                    cellStyle: { userSelect: "text", cursor: "text" }, // Enables text selection
                  }}
                getRowId={getRowId}
                onGridReady={onGridReady}
                animateRows={true}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationAutoPageSize={true}
                {...(onScrollBottomEnd ? {onBodyScroll: handleBodyScroll} : null)}
                overlayLoadingTemplate={
                    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
                }
                // suppressCopyRowsToClipboard={suppressCopyRowsToClipboard}
                suppressCopyRowsToClipboard={true}
                enableRangeSelection={true}
                copyHeadersToClipboard={true}
                onSelectionChanged={handleSelectionChanged}
                rowMultiSelectWithClick={rowMultiSelectWithClickFlag}
                onFirstDataRendered={onFirstDataRendered}
                {...rest}
                />
        </div>
    );
};

export default React.memo(Table);