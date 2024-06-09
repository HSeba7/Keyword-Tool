import { Box } from "@mui/system";
import DashboardTextCard from "../dashboard/components/DashboardTextCard";
import BasicTable from "./components/BasicTable";
import GoogleSearchVolume from "./components/GoogleSearchVolume";
import MetricComponent from "./components/MetricComponent";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchKeywordSuggestions } from "../../helper_functions/axios";
import { isValumeDataSubmit, setValumeData } from "../../actions/actions";

export default function PageTwo() {
    const keywordValumeData = useSelector((state) => state?.valumeReducerData?.keywordValumeData);

    const isValumeDataSubmitData = useSelector((state) => state?.valumeReducerData?.isSubmit);
    const valumeOtherData = useSelector((state) => state?.valumeReducerData?.valumeOtherData);




    const dispatch = useDispatch();

    const [payload, setPayload ] = useState({keywords: keywordValumeData});

   const getSearchVolume = (data) =>{
    alert("Request has been sent")
    console.log("outerbody",data)
    if(data && data.keywords.length){
        console.log("function is called",data)
        fetchKeywordSuggestions(
            "/v3/keywords_data/google_ads/search_volume/live",
            [data]
          )
            .then((response) => {
            dispatch(setValumeData(response));
            dispatch(isValumeDataSubmit(false))
    
            })
            .catch((error) => {
                dispatch(isValumeDataSubmit(false))
              console.error(error); // Handle errors
            });
    }
   
    }

    // useEffect(()=> {
    //     if (keywordValumeData?.length && !isValumeDataSubmitData) {
    //         getSearchVolume(payload);
    //     }
    // }, [keywordValumeData]);


    useEffect(()=> {
        if (isValumeDataSubmitData) {
            console.log("keywordValumeData", keywordValumeData);
            setPayload({...payload, keywords: keywordValumeData, ...valumeOtherData})
            getSearchVolume({...payload, keywords: keywordValumeData, ...valumeOtherData});
        }
    }, [isValumeDataSubmitData]);
    

    return (<>
    <DashboardTextCard></DashboardTextCard>
    <GoogleSearchVolume></GoogleSearchVolume>
    <MetricComponent></MetricComponent>
   

    <BasicTable></BasicTable>

    </>)
}