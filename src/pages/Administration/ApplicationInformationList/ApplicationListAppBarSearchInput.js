import * as React from "react";
import { useCallback, useMemo } from "react";
import SearchButtonWithInput from "../../../../components/SearchButtonWithInput";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router";

const ApplicationListAppBarSearchInput = () => {
  const [params, setParams] = useSearchParams();

  const { categoryId } = useParams();

  const searchValue = useMemo(() => params.get("search"), [params]);

  const onSearch = useCallback(
    (value) => {
      params.set("search", value);
      params.set("page", "1");
      params.set("page", categoryId);
      setParams(params);
    },
    [params, setParams]
  );

  return (
    <SearchButtonWithInput onChange={onSearch} defaultValue={searchValue} />
  );
};

export default React.memo(ApplicationListAppBarSearchInput);
