import useAuth from "@/hooks/useAuth";
import HomeLayout from "@/layouts/HomeLayout";
import style from "../../../styles/pages/admin/reports/AdminReportsPage.module.scss";
import { useEffect, useState } from "react";
import getVisualizationData from "@/pages/api-calls/visualization/getVisualizationData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const AdminReportsPage = () => {

  const user = useAuth();
  const [data, setData] = useState<any>();

  useEffect(() => {

    const getData = async () => {

      const response = await getVisualizationData();
      if (response == -1) alert('Something Went Wrong');
      else {

        setData(response);
      
      }    

    }

    getData();    
    
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  const getContent = () => {

    return (
      <div className={style.index}>
        <h1>Reports</h1>
        <br /><br /><br />
        <h2>Reviews by Rating</h2>
        <br />
        <PieChart width={200} height={300} >
          <Pie
            data={data?.ratings}
            dataKey="count"
            nameKey="rating"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data?.products.map((count: Number, rating: any) => (
              <Cell key={`cell-${count}`} fill={COLORS[rating % COLORS.length]}/>
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
        <br /><br /><br />
        <h2>Products Sold by Category</h2>
        <br />
        <BarChart width={800} height={400} data={data?.products}>
          <XAxis dataKey="product_category" stroke="#fba33c" />
          <YAxis stroke="#fba33c" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#fba33c" />
        </BarChart>
      </div>
    );

  }

  return ( <HomeLayout content={ getContent() } user={ user } /> );
}
 
export default AdminReportsPage;