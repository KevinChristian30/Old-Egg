import { ENV } from "@/ENV";
import axios from "axios";

const getVisualizationData = async () => {

  try{

    const response = await axios.get(ENV.API + 'get-visualization-data');
    const result = response.data;

    return result;

  } catch(error){

    return -1

  }

}

export default getVisualizationData;