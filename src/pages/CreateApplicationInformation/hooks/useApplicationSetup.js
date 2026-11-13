import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getApplicationSetUpList } from "../../../features/customerUser/applicationInformationSetup/applicationInformationSetupSlice";


const useApplicationSetup = (selectedProductId) => {
    const { applicationSetup, isLoading: applicationSetupsLoading } =
        useSelector((state) => state.userApplicationInformationSetup.applicationInformationSetUp);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedProductId) {
            dispatch(getApplicationSetUpList({
                category_id: selectedProductId
            }));
        }
    }, [dispatch, selectedProductId]);

    const applicationSetups = useMemo(() => {
        if (!selectedProductId || !applicationSetup?.length) return null;

        // Fall back to only category match
        return applicationSetup.find(
            (item) => +item.category_id === +selectedProductId
        );
    }, [selectedProductId, applicationSetup]);


    const application_fields = useMemo(
        () => applicationSetups?.application_fields || {},
        [applicationSetups]
    );

    return useMemo(
        () => ({
            applicationSetupsLoading,
            application_fields,
        }),
        [applicationSetupsLoading, application_fields]
    );
};

export default useApplicationSetup;
