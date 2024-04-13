import React, { useState, useEffect } from 'react';
import { Box, Stack } from "@chakra-ui/react";
import Card from './Card';
import axios from "axios";

const Home = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get("http://www.localhost:3001/api/getcars");
                setCars(response.data);
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };
        fetchCars();
    }, []);

    const checkoutHandler = async (fare) => {
        const { data: { key } } = await axios.get("http://www.localhost:3001/api/getkey");

        const { data: { order } } = await axios.post("http://localhost:3001/api/checkout", {
            amount: fare
        });

        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Your Company Name",
            description: "Description of RazorPay",
            image: "https://example.com/your-logo.png",
            order_id: order.id,
            callback_url: "http://localhost:4000/api/paymentverification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Your Company Address"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    };

    return (
        <Box>
            <Stack h={"100vh"} alignItems="center" justifyContent="center" direction={["column", "row"]} spacing={8}>
                {cars.map((car, index) => (
                    <Card key={index} carDetails={car} checkoutHandler={checkoutHandler} />
                ))}
            </Stack>
        </Box>
    );
};

export default Home;
