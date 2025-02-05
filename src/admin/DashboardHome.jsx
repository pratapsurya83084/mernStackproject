import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios, { all } from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const DashboardHome = () => {
  const url="https://mernstack1stproject-1.onrender.com/api"
  const [allUsers, setAllUsers] = useState([]);
  const [allsales, setAllsales] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: allsales.orderDetails,
        backgroundColor: [
          "#FFCE56",
          "#36A2EB",
          "#FF6384",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  });

  const [salesDatas, setSalesData] = useState({
    labels: [],
    datasets: [
      {
        label: "Monthly Sales",
        data: [],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const api = await axios.get(`${url}/user/allusers`, {
        headers: { "Content-Type": "application/json" },
      });
      setAllUsers(api.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch sales data
  const totalSale = async () => {
    try {
      const api = await axios.get(
        `${url}/payment/allorder`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const salesData = api.data.orderDetails;
      // console.log(salesData);
    
      setAllsales(salesData);
      // console.log(salesData);

      const salesByCategory = salesData.reduce((acc, item) => {
        const sales = item.amount || 0; // Default sales to 0 if undefined

        // Check if item has orderItems and iterate through each to extract titles and amounts
        if (item.orderItems && Array.isArray(item.orderItems)) {
          item.orderItems.forEach((orderItem, orderIndex) => {
            const itemTitle = orderItem.title || "No Title"; // Default to "No Title" if missing
            const itemAmount = item.amount || 0; // Default to 0 if missing

            // console.log(`OrderItem ${orderIndex}: Title - ${itemTitle}, Amount - ${itemAmount}`); // Log each item's title and amount

            // Group sales by title (or whatever unique field you want, if title is not unique)
            acc[itemTitle] = (acc[itemTitle] || 0) + itemAmount; // Sum sales by title
          });
        }

        return acc;
      }, {});

      // Prepare data for Pie Chart
      const labels = Object.keys(salesByCategory); // Extract titles as labels
      const data = Object.values(salesByCategory); // Extract corresponding sales totals

      // console.log("Labels:", labels); // Log all labels
      // console.log("Data:", data); // L/ Log all amounts

      setChartData({
        labels: labels,
        datasets: [
          {
            data: data,

            backgroundColor: [
              "#FFCE56",
              "#36A2EB",
              "#FF6384",
              "#4BC0C0",
              "#9966FF",
            ],
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };


  // Calculate monthly sales for the bar chart
  useEffect(() => {
    const monthlySales = {};
    allsales.forEach((order) => {
      const orderMonth = new Date(order.orderDate).toLocaleString("default", {
        month: "long",
      });
      monthlySales[orderMonth] = (monthlySales[orderMonth] || 0) + order.amount;
    });

    const labels = Object.keys(monthlySales);
    const data = Object.values(monthlySales);
    setSalesData((prevState) => ({
      ...prevState,
      labels,
      datasets: [
        {
          ...prevState.datasets[0],
          data,
        },
      ],
    }));
  }, [allsales]);

  useEffect(() => {
    getAllUsers();
    totalSale();
  }, []);

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <h2 className="text-center">Admin Dashboard</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4} xs={12} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>{allUsers.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} xs={12} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Sales</Card.Title>
              <Card.Text>
                {allsales.reduce((sum, sale) => sum + sale.amount, 0)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} xs={12} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>{allsales.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6} xs={12} className="mb-3">
          <h4>Monthly Sales Overview</h4>
          <div
            className="chart-container mx-auto"
            style={{ width: "100%", maxWidth: "400px", height: "400px" }}
          >
            <Bar
              data={salesDatas}
              options={{ maintainAspectRatio: false, responsive: true }}
            />
          </div>
        </Col>

        <Col md={6} xs={12} className="mb-3">
          <h4>Category-wise Sales</h4>
          <div
            className="chart-container"
            style={{ maxWidth: "100%", height: "400px" }}
          >
            <Pie
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardHome;
