import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from "qs";

import { FETCH_JOBS } from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
};

const buildJobsUrl = (zip) => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
    return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region) => async dispatch => {
    try {
        let zip = await reverseGeocode(region);
        const url = buildJobsUrl(zip);
        console.log(url);
        let { data } = await axios.get(url);
        dispatch({ type: FETCH_JOBS, payload: data })
        console.log(data);
    } catch (e){
        console.log(e); 
    }    
};


    Kishan Patel