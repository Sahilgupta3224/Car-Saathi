import { Button, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Card = ({ carDetails, checkoutHandler }) => {
    const { name, fare, image } = carDetails;

    return (
        <VStack spacing={4}>
            <Image src={image} alt={name} boxSize={"200px"} objectFit="cover" />
            <Text fontSize="lg">{name}</Text>
            <Text fontSize="lg">₹{fare}</Text>
            <Button onClick={() => checkoutHandler(fare)} colorScheme="blue">Book Now</Button>
        </VStack>
    );
};

export default Card;
