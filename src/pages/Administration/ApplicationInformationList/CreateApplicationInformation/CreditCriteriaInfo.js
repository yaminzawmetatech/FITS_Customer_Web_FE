import React, { Fragment, useEffect, useRef } from "react";
import { Grid, Typography } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCreditCriteria } from "features/creditCriteria/creditCriteriaSlice";
import { useWatch } from "react-hook-form";

const CreditCriteriaInfo = ({ control }) => {
  const { categoryId } = useParams();

  const dispatch = useDispatch();

  const { allCreditCriteria } = useSelector((state) => state.allCreditCriteria);

  const sub_category_id = useWatch({
    control,
    name: "sub_category_id",
  });

  const apiCalledRef = useRef(false); // Prevent double calls

  useEffect(() => {
    if (apiCalledRef.current) return;
    if(categoryId){
      dispatch(
        getAllCreditCriteria({
            category_id: categoryId,
            sub_category_id: sub_category_id
        })
      );
    }
    apiCalledRef.current = true;
  }, [dispatch, sub_category_id, categoryId]);

  // Group criteria by type
  const groupedCriteria = allCreditCriteria.reduce((acc, item) => {
    const { type } = item;
    if (!acc[type]) {
      acc[type] = [];
    }

    acc[type].push(item);
    return acc;
  }, {});

  return (
    <Fragment>
      {Object.entries(groupedCriteria).map(
        ([type, criteriaList]) =>
          (type === "Basic Information" ||
            type === "Finance Condition" ||
            type === "Region (Eligible)") && (
            <Accordion key={type} title={type} type="type">
              {criteriaList.map((criteria) => (
                <div key={criteria.id} style={{ marginBottom: "10px" }}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography
                        variant="subtitle1"
                        style={{ fontWeight: "bold" }}
                      >
                        {criteria.required_category}:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      {criteria.credit_criteria_values &&
                      criteria.credit_criteria_values.length > 0 ? (
                        <Typography variant="body1">
                          {criteria.credit_criteria_values.map(
                            (value, index) => (
                              <Fragment key={value.id}>
                                {index > 0 && <br />}{" "}
                                {value.value}
                              </Fragment>
                            )
                          )}
                        </Typography>
                      ) : (
                        <Typography variant="body2">-</Typography>
                      )}
                    </Grid>
                  </Grid>
                </div>
              ))}
            </Accordion>
          )
      )}
    </Fragment>
  );
};

export default React.memo(CreditCriteriaInfo);
